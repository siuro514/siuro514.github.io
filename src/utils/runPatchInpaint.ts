// 在 Web Worker 中執行 PatchMatch inpainting；若 Worker 不可用則退回主執行緒
let worker: Worker | null = null;

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./patchInpaint.worker.ts', import.meta.url), {
      type: 'module',
    });
  }
  return worker;
}

export function runPatchInpaint(imageData: ImageData, mask: Uint8Array): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    let w: Worker;
    try {
      w = getWorker();
    } catch (err) {
      // 環境不支援 module worker → 退回主執行緒
      fallback(imageData, mask).then(resolve).catch(reject);
      return;
    }

    const cleanup = () => {
      w.removeEventListener('message', onMsg);
      w.removeEventListener('error', onErr);
    };
    const onMsg = (e: MessageEvent) => {
      cleanup();
      const { data, width, height } = e.data as { data: ArrayBuffer; width: number; height: number };
      resolve(new ImageData(new Uint8ClampedArray(data), width, height));
    };
    const onErr = (err: ErrorEvent) => {
      cleanup();
      worker = null; // 重置以便下次重建
      // Worker 執行失敗 → 退回主執行緒
      fallback(imageData, mask).then(resolve).catch(() => reject(err.message || 'inpaint worker error'));
    };
    w.addEventListener('message', onMsg);
    w.addEventListener('error', onErr);

    const dataCopy = imageData.data.slice();
    const maskCopy = mask.slice();
    w.postMessage(
      {
        data: dataCopy.buffer,
        width: imageData.width,
        height: imageData.height,
        mask: maskCopy.buffer,
      },
      [dataCopy.buffer, maskCopy.buffer]
    );
  });
}

async function fallback(imageData: ImageData, mask: Uint8Array): Promise<ImageData> {
  const { patchInpaint } = await import('./patchInpaint');
  return patchInpaint(imageData, mask);
}
