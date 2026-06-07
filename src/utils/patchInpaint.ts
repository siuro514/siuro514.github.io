// 純前端 Exemplar-based（Criminisi）圖片 inpainting
//
// 相較於擴散法（會糊）與 PatchMatch+EM（投票平均也會糊），本方法沿著填補邊界，
// 依「結構優先」順序，每次從已知區域找出最相似的一個區塊（patch），整片直接複製
// 過來——完全不做平均，因此結果銳利、保留紋理，並能沿著邊緣延續線條結構。
//
// 參考：Criminisi, Pérez, Toyama, "Region Filling and Object Removal by
// Exemplar-Based Image Inpainting" (2004)。
//
// 完全在瀏覽器本機執行，不需任何外部函式庫或網路。

import { inpaint as diffusionInpaint } from './inpaint';

interface Level {
  w: number;
  h: number;
  rgb: Float32Array; // 長度 w*h*3
  hole: Uint8Array; // 長度 w*h，1 = 待填補
}

const PATCH_RADIUS = 4; // 9x9 patch
const MAX_SOURCE_CANDIDATES = 24000; // source 取樣上限（過多時以等距抽樣）

function clampByte(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

// 合法 source patch 中心：patch 完整位於影像內、且不含任何原始 hole 像素。
// 使用 hole 積分圖加速。
function computeValidSources(l: Level): Int32Array {
  const { w, h, hole } = l;
  const W = w + 1;
  const integ = new Float64Array(W * (h + 1));
  for (let y = 0; y < h; y++) {
    let rowSum = 0;
    for (let x = 0; x < w; x++) {
      rowSum += hole[y * w + x];
      integ[(y + 1) * W + (x + 1)] = integ[y * W + (x + 1)] + rowSum;
    }
  }
  const sumRect = (x0: number, y0: number, x1: number, y1: number): number =>
    integ[(y1 + 1) * W + (x1 + 1)] -
    integ[y0 * W + (x1 + 1)] -
    integ[(y1 + 1) * W + x0] +
    integ[y0 * W + x0];

  const r = PATCH_RADIUS;
  const list: number[] = [];
  for (let y = r; y < h - r; y++) {
    for (let x = r; x < w - r; x++) {
      if (sumRect(x - r, y - r, x + r, y + r) === 0) list.push(y * w + x);
    }
  }
  let arr = Int32Array.from(list);
  // source 過多時等距抽樣，控制運算量
  if (arr.length > MAX_SOURCE_CANDIDATES) {
    const stride = Math.ceil(arr.length / MAX_SOURCE_CANDIDATES);
    const sampled: number[] = [];
    for (let i = 0; i < arr.length; i += stride) sampled.push(arr[i]);
    arr = Int32Array.from(sampled);
  }
  return arr;
}

// Criminisi 主迴圈（就地填補 level.rgb）
function exemplarFill(l: Level, sources: Int32Array): void {
  const { w, h } = l;
  const r = PATCH_RADIUS;
  const rgb = l.rgb;

  // filled：1 = 已知/已填，0 = 待填
  const filled = new Uint8Array(w * h);
  const confidence = new Float32Array(w * h);
  const gray = new Float32Array(w * h);
  let remaining = 0;
  for (let i = 0; i < w * h; i++) {
    const known = l.hole[i] ? 0 : 1;
    filled[i] = known;
    confidence[i] = known;
    gray[i] = (rgb[i * 3] + rgb[i * 3 + 1] + rgb[i * 3 + 2]) / 3;
    if (!known) remaining++;
  }

  const targetOffR: number[] = [];
  const targetOffC: number[] = []; // r,g,b 連續存放
  const maxIter = remaining + 16;

  for (let iter = 0; iter < maxIter && remaining > 0; iter++) {
    // 1) 找填補邊界（front）並計算優先度，挑出最高者
    let bestP = -1;
    let bestPriority = -1;
    for (let y = r; y < h - r; y++) {
      for (let x = r; x < w - r; x++) {
        const i = y * w + x;
        if (filled[i]) continue;
        // 是否在 front（至少一個 4-鄰居已填）
        if (
          !filled[i - 1] &&
          !filled[i + 1] &&
          !filled[i - w] &&
          !filled[i + w]
        )
          continue;

        // 信心項 C(p)：patch 內已填像素的平均信心
        let confSum = 0;
        let confCount = 0;
        for (let dy = -r; dy <= r; dy++) {
          const yy = y + dy;
          for (let dx = -r; dx <= r; dx++) {
            const j = yy * w + (x + dx);
            if (filled[j]) {
              confSum += confidence[j];
              confCount++;
            }
          }
        }
        const c = confCount > 0 ? confSum / ((2 * r + 1) * (2 * r + 1)) : 0;

        // 資料項 D(p)：等照度線（isophote）與邊界法向的對齊程度
        // 影像梯度（僅用兩側皆已填的鄰居做中央差分）
        let gx = 0;
        let gy = 0;
        if (filled[i - 1] && filled[i + 1]) gx = (gray[i + 1] - gray[i - 1]) * 0.5;
        if (filled[i - w] && filled[i + w]) gy = (gray[i + w] - gray[i - w]) * 0.5;
        // 等照度線方向（梯度旋轉 90°）
        const ix = -gy;
        const iy = gx;
        // 邊界法向：filled 遮罩的梯度
        let nx = filled[i + 1] - filled[i - 1];
        let ny = filled[i + w] - filled[i - w];
        const nlen = Math.hypot(nx, ny);
        if (nlen > 0) {
          nx /= nlen;
          ny /= nlen;
        }
        const d = Math.abs(ix * nx + iy * ny) / 255 + 0.001;

        const priority = c * d;
        if (priority > bestPriority) {
          bestPriority = priority;
          bestP = i;
        }
      }
    }

    if (bestP < 0) break; // 找不到 front（理論上不會發生）

    const px = bestP % w;
    const py = (bestP / w) | 0;

    // 2) 收集目標 patch 中「已填」像素的相對位置與顏色
    targetOffR.length = 0;
    targetOffC.length = 0;
    for (let dy = -r; dy <= r; dy++) {
      const yy = py + dy;
      for (let dx = -r; dx <= r; dx++) {
        const j = yy * w + (px + dx);
        if (filled[j]) {
          targetOffR.push(dy * w + dx); // source 端相對位移
          targetOffC.push(rgb[j * 3], rgb[j * 3 + 1], rgb[j * 3 + 2]);
        }
      }
    }
    const offCount = targetOffR.length;

    // 3) 在 source 候選中找 SSD 最小的 patch（帶 early-out）
    let bestQ = -1;
    let bestDist = Infinity;
    for (let s = 0; s < sources.length; s++) {
      const q = sources[s];
      let sum = 0;
      let ok = true;
      for (let k = 0; k < offCount; k++) {
        const sj = (q + targetOffR[k]) * 3;
        const d0 = rgb[sj] - targetOffC[k * 3];
        const d1 = rgb[sj + 1] - targetOffC[k * 3 + 1];
        const d2 = rgb[sj + 2] - targetOffC[k * 3 + 2];
        sum += d0 * d0 + d1 * d1 + d2 * d2;
        if (sum >= bestDist) {
          ok = false;
          break;
        }
      }
      if (ok && sum < bestDist) {
        bestDist = sum;
        bestQ = q;
      }
    }
    if (bestQ < 0) bestQ = sources[0];

    // 4) 把目標 patch 中尚未填的像素，從最佳 source patch 整片複製過來
    const cAssign = confCountConfidence(confidence, filled, px, py, w, r);
    for (let dy = -r; dy <= r; dy++) {
      const yy = py + dy;
      for (let dx = -r; dx <= r; dx++) {
        const ti = yy * w + (px + dx);
        if (filled[ti]) continue;
        const si = bestQ + dy * w + dx;
        rgb[ti * 3] = rgb[si * 3];
        rgb[ti * 3 + 1] = rgb[si * 3 + 1];
        rgb[ti * 3 + 2] = rgb[si * 3 + 2];
        gray[ti] = (rgb[ti * 3] + rgb[ti * 3 + 1] + rgb[ti * 3 + 2]) / 3;
        filled[ti] = 1;
        confidence[ti] = cAssign;
        remaining--;
      }
    }
  }

  // 若仍有殘留（極端情況），用擴散補完
  if (remaining > 0) {
    const img = new ImageData(w, h);
    const leftover = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      img.data[i * 4] = clampByte(rgb[i * 3]);
      img.data[i * 4 + 1] = clampByte(rgb[i * 3 + 1]);
      img.data[i * 4 + 2] = clampByte(rgb[i * 3 + 2]);
      img.data[i * 4 + 3] = 255;
      leftover[i] = filled[i] ? 0 : 1;
    }
    const fixed = diffusionInpaint(img, leftover, 30);
    for (let i = 0; i < w * h; i++) {
      if (!filled[i]) {
        rgb[i * 3] = fixed.data[i * 4];
        rgb[i * 3 + 1] = fixed.data[i * 4 + 1];
        rgb[i * 3 + 2] = fixed.data[i * 4 + 2];
      }
    }
  }
}

// patch 內已填像素的平均信心（作為新填像素的信心值）
function confCountConfidence(
  confidence: Float32Array,
  filled: Uint8Array,
  px: number,
  py: number,
  w: number,
  r: number
): number {
  let sum = 0;
  for (let dy = -r; dy <= r; dy++) {
    const yy = py + dy;
    for (let dx = -r; dx <= r; dx++) {
      const j = yy * w + (px + dx);
      if (filled[j]) sum += confidence[j];
    }
  }
  return sum / ((2 * r + 1) * (2 * r + 1));
}

/**
 * 對 ImageData 中遮罩標記的區域以 exemplar-based inpainting 填補（保留紋理、銳利）。
 * @param src 原始影像
 * @param mask 長度 width*height，值為 1 表示待填補
 */
export function patchInpaint(src: ImageData, mask: Uint8Array): ImageData {
  const W = src.width;
  const H = src.height;

  // hole bounding box
  let minX = W;
  let minY = H;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (mask[y * W + x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return src;

  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  // 周邊取樣範圍（提供足夠的相似紋理來源）
  const margin = Math.min(Math.max(Math.max(bw, bh), 64), 220) + PATCH_RADIUS;
  const x0 = Math.max(0, minX - margin);
  const y0 = Math.max(0, minY - margin);
  const x1 = Math.min(W - 1, maxX + margin);
  const y1 = Math.min(H - 1, maxY + margin);
  const rw = x1 - x0 + 1;
  const rh = y1 - y0 + 1;

  // 裁切工作區
  const rgb = new Float32Array(rw * rh * 3);
  const hole = new Uint8Array(rw * rh);
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const si = ((y0 + y) * W + (x0 + x)) * 4;
      const di = (y * rw + x) * 3;
      rgb[di] = src.data[si];
      rgb[di + 1] = src.data[si + 1];
      rgb[di + 2] = src.data[si + 2];
      hole[y * rw + x] = mask[(y0 + y) * W + (x0 + x)] ? 1 : 0;
    }
  }
  const roi: Level = { w: rw, h: rh, rgb, hole };

  const sources = computeValidSources(roi);
  if (sources.length === 0) {
    // 幾乎沒有可用 source → 退回擴散法
    return diffusionInpaint(src, mask);
  }

  exemplarFill(roi, sources);

  // 寫回原圖（只覆蓋 hole 像素）
  const out = new ImageData(W, H);
  out.data.set(src.data);
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      if (!hole[y * rw + x]) continue;
      const di = ((y0 + y) * W + (x0 + x)) * 4;
      const si = (y * rw + x) * 3;
      out.data[di] = clampByte(roi.rgb[si]);
      out.data[di + 1] = clampByte(roi.rgb[si + 1]);
      out.data[di + 2] = clampByte(roi.rgb[si + 2]);
      out.data[di + 3] = 255;
    }
  }
  return out;
}
