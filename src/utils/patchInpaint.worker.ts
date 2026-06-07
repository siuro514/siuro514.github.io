// Web Worker：在背景執行緒跑 PatchMatch inpainting，避免凍結 UI
import { patchInpaint } from './patchInpaint';

const ctx = self as unknown as {
  postMessage: (msg: unknown, transfer?: Transferable[]) => void;
  addEventListener: (type: string, handler: (e: MessageEvent) => void) => void;
};

ctx.addEventListener('message', (e: MessageEvent) => {
  const { data, width, height, mask } = e.data as {
    data: ArrayBuffer;
    width: number;
    height: number;
    mask: ArrayBuffer;
  };
  const img = new ImageData(new Uint8ClampedArray(data), width, height);
  const result = patchInpaint(img, new Uint8Array(mask));
  ctx.postMessage(
    { data: result.data.buffer, width: result.width, height: result.height },
    [result.data.buffer]
  );
});
