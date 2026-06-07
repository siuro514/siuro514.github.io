// 純前端圖片浮水印移除（inpainting）
//
// 採用 push-pull（金字塔）填補 + Jacobi 擴散平滑的組合：
//   1. push-pull 先用多解析度金字塔對遮罩區域產生一個平滑的初始填補
//   2. Jacobi 迭代（求解 Laplace 方程）讓填補與邊界自然銜接
//
// 對「浮水印疊在相對平順背景上」的常見情境效果良好，且完全在瀏覽器本機執行，
// 不依賴任何外部函式庫或網路。

interface Pyramid {
  w: number;
  h: number;
  color: Float32Array; // RGB, 長度 w*h*3
  weight: Float32Array; // 長度 w*h，0 = 未知（待填補），>0 = 已知
}

function clampByte(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

// 下採樣：以權重加權平均合併 2x2 區塊
function pull(fine: Pyramid): Pyramid {
  const w = Math.max(1, fine.w >> 1);
  const h = Math.max(1, fine.h >> 1);
  const color = new Float32Array(w * h * 3);
  const weight = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let wt = 0;
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const fx = Math.min(fine.w - 1, x * 2 + dx);
          const fy = Math.min(fine.h - 1, y * 2 + dy);
          const fi = fy * fine.w + fx;
          const fw = fine.weight[fi];
          r += fine.color[fi * 3] * fw;
          g += fine.color[fi * 3 + 1] * fw;
          b += fine.color[fi * 3 + 2] * fw;
          wt += fw;
        }
      }
      const ci = y * w + x;
      if (wt > 0) {
        color[ci * 3] = r / wt;
        color[ci * 3 + 1] = g / wt;
        color[ci * 3 + 2] = b / wt;
      }
      // 權重上限為 1，代表「此處有足夠資訊」
      weight[ci] = Math.min(1, wt);
    }
  }
  return { w, h, color, weight };
}

// 對 coarse 層做雙線性取樣
function sampleBilinear(p: Pyramid, fx: number, fy: number, out: number[]): void {
  const x = Math.max(0, Math.min(p.w - 1, fx));
  const y = Math.max(0, Math.min(p.h - 1, fy));
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(p.w - 1, x0 + 1);
  const y1 = Math.min(p.h - 1, y0 + 1);
  const tx = x - x0;
  const ty = y - y0;

  for (let c = 0; c < 3; c++) {
    const c00 = p.color[(y0 * p.w + x0) * 3 + c];
    const c10 = p.color[(y0 * p.w + x1) * 3 + c];
    const c01 = p.color[(y1 * p.w + x0) * 3 + c];
    const c11 = p.color[(y1 * p.w + x1) * 3 + c];
    const top = c00 * (1 - tx) + c10 * tx;
    const bot = c01 * (1 - tx) + c11 * tx;
    out[c] = top * (1 - ty) + bot * ty;
  }
}

// 上採樣：用 coarse 層補上 fine 層中未知的像素
function push(coarse: Pyramid, fine: Pyramid): void {
  const sample: number[] = [0, 0, 0];
  for (let y = 0; y < fine.h; y++) {
    for (let x = 0; x < fine.w; x++) {
      const fi = y * fine.w + x;
      const wf = fine.weight[fi];
      if (wf >= 1) continue; // 已知像素，保留原值

      sampleBilinear(coarse, (x - 0.5) / 2, (y - 0.5) / 2, sample);
      fine.color[fi * 3] = fine.color[fi * 3] * wf + sample[0] * (1 - wf);
      fine.color[fi * 3 + 1] = fine.color[fi * 3 + 1] * wf + sample[1] * (1 - wf);
      fine.color[fi * 3 + 2] = fine.color[fi * 3 + 2] * wf + sample[2] * (1 - wf);
      fine.weight[fi] = 1; // 標記為已填補
    }
  }
}

// Jacobi 迭代：對遮罩區域反覆取四鄰平均，使填補與邊界平順銜接
function jacobi(p: Pyramid, mask: Uint8Array, iterations: number): void {
  const { w, h, color } = p;
  const tmp = color.slice();
  for (let it = 0; it < iterations; it++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (mask[i] !== 1) continue;
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        if (x > 0) {
          const j = (i - 1) * 3;
          r += color[j];
          g += color[j + 1];
          b += color[j + 2];
          n++;
        }
        if (x < w - 1) {
          const j = (i + 1) * 3;
          r += color[j];
          g += color[j + 1];
          b += color[j + 2];
          n++;
        }
        if (y > 0) {
          const j = (i - w) * 3;
          r += color[j];
          g += color[j + 1];
          b += color[j + 2];
          n++;
        }
        if (y < h - 1) {
          const j = (i + w) * 3;
          r += color[j];
          g += color[j + 1];
          b += color[j + 2];
          n++;
        }
        if (n > 0) {
          tmp[i * 3] = r / n;
          tmp[i * 3 + 1] = g / n;
          tmp[i * 3 + 2] = b / n;
        }
      }
    }
    color.set(tmp);
  }
}

/**
 * 對 ImageData 中遮罩標記的區域進行 inpainting。
 * @param src 原始影像資料
 * @param mask 長度為 width*height 的陣列，值為 1 表示需要填補的像素
 * @param smoothing Jacobi 迭代次數（越大越平滑，預設 60）
 */
export function inpaint(src: ImageData, mask: Uint8Array, smoothing = 60): ImageData {
  const w = src.width;
  const h = src.height;
  const n = w * h;

  const color = new Float32Array(n * 3);
  const weight = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const hole = mask[i] === 1;
    weight[i] = hole ? 0 : 1;
    color[i * 3] = src.data[i * 4];
    color[i * 3 + 1] = src.data[i * 4 + 1];
    color[i * 3 + 2] = src.data[i * 4 + 2];
  }

  // 建立金字塔（pull）
  const levels: Pyramid[] = [{ w, h, color, weight }];
  let cur = levels[0];
  while (cur.w > 1 && cur.h > 1) {
    cur = pull(cur);
    levels.push(cur);
  }

  // 由粗到細填補（push）
  for (let l = levels.length - 1; l > 0; l--) {
    push(levels[l], levels[l - 1]);
  }

  // 對最高解析度層做 Jacobi 平滑（僅處理遮罩區域）
  jacobi(levels[0], mask, smoothing);

  const out = new ImageData(w, h);
  const result = levels[0].color;
  for (let i = 0; i < n; i++) {
    out.data[i * 4] = clampByte(result[i * 3]);
    out.data[i * 4 + 1] = clampByte(result[i * 3 + 1]);
    out.data[i * 4 + 2] = clampByte(result[i * 3 + 2]);
    out.data[i * 4 + 3] = mask[i] === 1 ? 255 : src.data[i * 4 + 3];
  }
  return out;
}
