import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Slider,
  CircularProgress,
  LinearProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import BrushIcon from '@mui/icons-material/Brush';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import { runPatchInpaint } from '@/utils/runPatchInpaint';

type Tool = 'rect' | 'brush';
type Status = 'idle' | 'processing' | 'done' | 'error';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ImageItem {
  id: string;
  name: string;
  url: string; // 原圖 object URL（縮圖用）
  base: HTMLCanvasElement; // 原圖（自然解析度）
  mask: HTMLCanvasElement; // 筆刷遮罩（自然解析度）
  rects: Rect[];
  hasBrush: boolean;
  resultUrl: string | null;
  resultName: string;
  status: Status;
  error?: string;
}

const ACCENT = '#D98C8C';

export default function WatermarkRemoverPage() {
  const { t } = useTranslation();

  const [items, setItems] = useState<ImageItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('rect');
  const [brushSize, setBrushSize] = useState<number>(30);
  const [processing, setProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState('');
  const [previewId, setPreviewId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const itemsRef = useRef<ImageItem[]>([]);
  const activeIdRef = useRef<string | null>(null);
  const drawingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const previewRectRef = useRef<Rect | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    itemsRef.current = items;
    activeIdRef.current = activeId;
    renderDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, activeId]);

  // 卸載時清理所有 URL
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        URL.revokeObjectURL(it.url);
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      });
    };
  }, []);

  const getActive = (): ImageItem | undefined =>
    itemsRef.current.find((it) => it.id === activeIdRef.current);

  const updateItem = (id: string, patch: Partial<ImageItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  // ---- 載入圖片 ----
  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (arr.length === 0) {
      setError(t('watermarkRemover.error.notImage', '請選擇圖片檔案'));
      return;
    }
    setError('');

    arr.forEach((f) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const url = URL.createObjectURL(f);
      const img = new Image();
      img.onload = () => {
        const base = document.createElement('canvas');
        base.width = img.naturalWidth;
        base.height = img.naturalHeight;
        base.getContext('2d')!.drawImage(img, 0, 0);
        const mask = document.createElement('canvas');
        mask.width = img.naturalWidth;
        mask.height = img.naturalHeight;

        const item: ImageItem = {
          id,
          name: f.name,
          url,
          base,
          mask,
          rects: [],
          hasBrush: false,
          resultUrl: null,
          resultName: `no-watermark-${f.name.replace(/\.[^/.]+$/, '')}.png`,
          status: 'idle',
        };
        setItems((prev) => [...prev, item]);
        setActiveId((cur) => cur ?? id);
      };
      img.onerror = () => setError(t('watermarkRemover.error.loadFailed', '載入失敗'));
      img.src = url;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) {
        URL.revokeObjectURL(it.url);
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      }
      const next = prev.filter((x) => x.id !== id);
      setActiveId((cur) => (cur === id ? next[0]?.id ?? null : cur));
      return next;
    });
  };

  const clearAll = () => {
    itemsRef.current.forEach((it) => {
      URL.revokeObjectURL(it.url);
      if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
    });
    setItems([]);
    setActiveId(null);
    setError('');
    setProgressText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetMarksActive = useCallback(() => {
    const active = getActive();
    if (!active) return;
    active.mask.getContext('2d')!.clearRect(0, 0, active.mask.width, active.mask.height);
    updateItem(active.id, { rects: [], hasBrush: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- 畫面渲染（active 圖）----
  const renderDisplay = useCallback(() => {
    const canvas = displayCanvasRef.current;
    const active = getActive();
    if (!canvas || !active) return;
    const base = active.base;
    if (canvas.width !== base.width || canvas.height !== base.height) {
      canvas.width = base.width;
      canvas.height = base.height;
    }
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(base, 0, 0);

    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.drawImage(active.mask, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'rgba(217, 60, 60, 0.35)';
    ctx.strokeStyle = 'rgba(217, 60, 60, 0.95)';
    ctx.lineWidth = Math.max(2, base.width / 400);
    for (const r of active.rects) {
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
    const pr = previewRectRef.current;
    if (pr) {
      ctx.setLineDash([6, 4]);
      ctx.fillRect(pr.x, pr.y, pr.w, pr.h);
      ctx.strokeRect(pr.x, pr.y, pr.w, pr.h);
    }
    ctx.restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNaturalPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = displayCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const paintBrush = (x: number, y: number) => {
    const active = getActive();
    if (!active) return;
    const ctx = active.mask.getContext('2d')!;
    ctx.fillStyle = 'rgba(217, 60, 60, 1)';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!getActive() || processing) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = getNaturalPoint(e);
    if (tool === 'rect') {
      dragStartRef.current = p;
      previewRectRef.current = { x: p.x, y: p.y, w: 0, h: 0 };
    } else {
      paintBrush(p.x, p.y);
      renderDisplay();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const p = getNaturalPoint(e);
    if (tool === 'rect') {
      const s = dragStartRef.current!;
      previewRectRef.current = {
        x: Math.min(s.x, p.x),
        y: Math.min(s.y, p.y),
        w: Math.abs(p.x - s.x),
        h: Math.abs(p.y - s.y),
      };
      renderDisplay();
    } else {
      paintBrush(p.x, p.y);
      renderDisplay();
    }
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const active = getActive();
    if (!active) return;
    if (tool === 'rect') {
      const pr = previewRectRef.current;
      previewRectRef.current = null;
      dragStartRef.current = null;
      if (pr && pr.w > 3 && pr.h > 3) {
        updateItem(active.id, { rects: [...active.rects, pr] });
      } else {
        renderDisplay();
      }
    } else {
      // 提交筆刷標記狀態（供縮圖徽章與處理判斷）
      if (!active.hasBrush) updateItem(active.id, { hasBrush: true });
    }
  };

  const itemHasMarks = (it: ImageItem): boolean => it.rects.length > 0 || it.hasBrush;

  // 把目前這張的標記（以相對座標等比縮放）套用到其他所有圖片
  const applyMarksToAll = () => {
    const src = getActive();
    if (!src || !itemHasMarks(src)) return;
    const aw = src.base.width;
    const ah = src.base.height;
    const normRects = src.rects.map((r) => ({
      x: r.x / aw,
      y: r.y / ah,
      w: r.w / aw,
      h: r.h / ah,
    }));
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === src.id) return it;
        const tw = it.base.width;
        const th = it.base.height;
        // 重建筆刷遮罩（等比縮放來源遮罩）
        const ctx = it.mask.getContext('2d')!;
        ctx.clearRect(0, 0, tw, th);
        if (src.hasBrush) ctx.drawImage(src.mask, 0, 0, aw, ah, 0, 0, tw, th);
        return {
          ...it,
          rects: normRects.map((n) => ({ x: n.x * tw, y: n.y * th, w: n.w * tw, h: n.h * th })),
          hasBrush: src.hasBrush,
        };
      })
    );
  };

  // 把某張圖的標記轉成遮罩並做 inpainting
  const processOne = async (item: ImageItem): Promise<void> => {
    const w = item.base.width;
    const h = item.base.height;
    const imageData = item.base.getContext('2d')!.getImageData(0, 0, w, h);

    const mask = new Uint8Array(w * h);
    for (const r of item.rects) {
      const x0 = Math.max(0, Math.floor(r.x));
      const y0 = Math.max(0, Math.floor(r.y));
      const x1 = Math.min(w, Math.ceil(r.x + r.w));
      const y1 = Math.min(h, Math.ceil(r.y + r.h));
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) mask[y * w + x] = 1;
      }
    }
    const md = item.mask.getContext('2d')!.getImageData(0, 0, w, h).data;
    for (let i = 0; i < w * h; i++) {
      if (md[i * 4 + 3] > 0) mask[i] = 1;
    }

    const result = await runPatchInpaint(imageData, mask);
    const outCanvas = document.createElement('canvas');
    outCanvas.width = w;
    outCanvas.height = h;
    outCanvas.getContext('2d')!.putImageData(result, 0, 0);
    const blob: Blob = await new Promise((resolve) =>
      outCanvas.toBlob((b) => resolve(b!), 'image/png')
    );
    const url = URL.createObjectURL(blob);
    // 釋放舊結果
    if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
    updateItem(item.id, { resultUrl: url, status: 'done', error: undefined });
  };

  const processAll = async () => {
    const targets = itemsRef.current.filter(itemHasMarks);
    if (targets.length === 0) {
      setError(t('watermarkRemover.error.noMarkAny', '請至少標記一張圖片的浮水印區域'));
      return;
    }
    setError('');
    setProcessing(true);
    try {
      for (let i = 0; i < targets.length; i++) {
        const item = targets[i];
        setProgressText(
          t('watermarkRemover.status.processingN', '正在處理第 {{n}}/{{total}} 張…', {
            n: i + 1,
            total: targets.length,
          })
        );
        updateItem(item.id, { status: 'processing' });
        await new Promise((r) => setTimeout(r, 30));
        try {
          await processOne(item);
        } catch (err) {
          console.error(err);
          updateItem(item.id, { status: 'error', error: String(err) });
        }
      }
    } finally {
      setProcessing(false);
      setProgressText('');
    }
  };

  const downloadItem = (item: ImageItem) => {
    if (!item.resultUrl) return;
    const a = document.createElement('a');
    a.href = item.resultUrl;
    a.download = item.resultName;
    a.click();
  };

  const downloadAll = async () => {
    const done = itemsRef.current.filter((it) => it.resultUrl);
    if (done.length === 0) return;
    if (done.length === 1) {
      downloadItem(done[0]);
      return;
    }
    const zip = new JSZip();
    for (const it of done) {
      const blob = await (await fetch(it.resultUrl!)).blob();
      zip.file(`${it.name.replace(/\.[^/.]+$/, '')}.png`, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `no-watermark-images-${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const markedCount = items.filter(itemHasMarks).length;
  const doneCount = items.filter((it) => it.resultUrl).length;
  const active = items.find((it) => it.id === activeId);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2,
            backgroundColor: ACCENT + '20',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ACCENT,
            flexShrink: 0,
          }}
        >
          <AutoFixHighIcon sx={{ fontSize: '2rem' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            {t('watermarkRemover.title', '浮水印移除工具')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('watermarkRemover.description', '在瀏覽器本機移除圖片上的浮水印，框選或塗抹要移除的區域即可，圖片不會上傳。')}
          </Typography>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        {t(
          'watermarkRemover.legalNotice',
          '請僅對你擁有版權或已獲授權的內容使用本工具（例如移除自己的浮水印、時間戳或 logo）。'
        )}
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* 上傳區（無圖時） */}
      {items.length === 0 && (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            backgroundColor: 'grey.50',
            cursor: 'pointer',
            transition: 'all 0.3s',
            mb: 3,
            '&:hover': { borderColor: ACCENT, backgroundColor: ACCENT + '0d' },
          }}
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <CloudUploadIcon sx={{ fontSize: 64, color: ACCENT, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {t('watermarkRemover.upload.title', '點擊或拖曳圖片到此處')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('watermarkRemover.upload.imageHintMulti', '支援 JPG、PNG、WebP，可一次選擇多張圖片')}
          </Typography>
        </Paper>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {items.length > 0 && (
        <>
          {/* 縮圖列 */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {t('watermarkRemover.summary.count', '{{count}} 張圖片', { count: items.length })}
                {markedCount > 0 && (
                  <Chip label={t('watermarkRemover.summary.marked', '已標記 {{n}}', { n: markedCount })} size="small" color="warning" sx={{ ml: 1 }} />
                )}
                {doneCount > 0 && (
                  <Chip label={t('watermarkRemover.summary.done', '已完成 {{n}}', { n: doneCount })} size="small" color="success" sx={{ ml: 1 }} />
                )}
              </Typography>
              <Button size="small" variant="outlined" startIcon={<AddPhotoAlternateIcon />} onClick={() => fileInputRef.current?.click()} disabled={processing}>
                {t('watermarkRemover.buttons.addImages', '新增圖片')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
              {items.map((it) => (
                <Box
                  key={it.id}
                  onClick={() => setActiveId(it.id)}
                  sx={{
                    position: 'relative',
                    flexShrink: 0,
                    width: 84,
                    height: 84,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: it.id === activeId ? ACCENT : 'transparent',
                    boxShadow: it.id === activeId ? `0 0 0 1px ${ACCENT}` : 'none',
                  }}
                >
                  <Box component="img" src={it.resultUrl || it.url} alt={it.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'grey.200' }} />
                  {it.status === 'processing' && (
                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress size={22} sx={{ color: '#fff' }} />
                    </Box>
                  )}
                  {it.status === 'done' && (
                    <CheckCircleIcon sx={{ position: 'absolute', bottom: 2, left: 2, fontSize: 18, color: 'success.main', bgcolor: '#fff', borderRadius: '50%' }} />
                  )}
                  {itemHasMarks(it) && it.status !== 'done' && (
                    <Box sx={{ position: 'absolute', bottom: 2, left: 2, width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main', border: '1px solid #fff' }} />
                  )}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(it.id);
                    }}
                    sx={{ position: 'absolute', top: 0, right: 0, p: '2px', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* 標記區（active 圖） */}
          {active && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {t('watermarkRemover.mark.title', '標記浮水印區域')}
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {active.name}
                </Typography>
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                <ToggleButtonGroup value={tool} exclusive onChange={(_, v) => v && setTool(v)} size="small" sx={{ '& .MuiToggleButton-root': { textTransform: 'none' } }}>
                  <ToggleButton value="rect">
                    <CropSquareIcon sx={{ mr: 0.5 }} fontSize="small" />
                    {t('watermarkRemover.tools.rect', '矩形框選')}
                  </ToggleButton>
                  <ToggleButton value="brush">
                    <BrushIcon sx={{ mr: 0.5 }} fontSize="small" />
                    {t('watermarkRemover.tools.brush', '筆刷塗抹')}
                  </ToggleButton>
                </ToggleButtonGroup>

                {tool === 'brush' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 200, flex: 1 }}>
                    <BrushIcon fontSize="small" color="action" />
                    <Slider value={brushSize} onChange={(_, v) => setBrushSize(v as number)} min={5} max={120} size="small" valueLabelDisplay="auto" sx={{ color: ACCENT }} />
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1, ml: 'auto', flexWrap: 'wrap' }}>
                  {items.length > 1 && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ContentCopyIcon />}
                      onClick={applyMarksToAll}
                      disabled={!itemHasMarks(active)}
                    >
                      {t('watermarkRemover.buttons.applyAll', '套用標記到全部')}
                    </Button>
                  )}
                  <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={resetMarksActive}>
                    {t('watermarkRemover.buttons.clearMarks', '清除標記')}
                  </Button>
                </Box>
              </Box>

              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'grey.100', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                <canvas
                  ref={displayCanvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  style={{ maxWidth: '100%', maxHeight: 520, touchAction: 'none', cursor: 'crosshair', display: 'block' }}
                />
              </Box>
            </Paper>
          )}

          {/* 動作列 */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            <Button
              variant="contained"
              startIcon={processing ? <CircularProgress size={18} color="inherit" /> : <AutoFixHighIcon />}
              onClick={processAll}
              disabled={processing || markedCount === 0}
              sx={{ bgcolor: ACCENT }}
            >
              {processing
                ? t('watermarkRemover.buttons.processing', '處理中…')
                : t('watermarkRemover.buttons.processAll', '移除浮水印（全部已標記）')}
            </Button>
            {doneCount > 0 && (
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadAll} disabled={processing}>
                {doneCount > 1
                  ? t('watermarkRemover.buttons.downloadAll', '下載全部 (ZIP)')
                  : t('watermarkRemover.buttons.download', '下載')}
              </Button>
            )}
            <Button variant="outlined" color="inherit" startIcon={<DeleteIcon />} onClick={clearAll} disabled={processing}>
              {t('watermarkRemover.buttons.clearAll', '清空全部')}
            </Button>
          </Box>

          {processing && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {progressText}
              </Typography>
              <LinearProgress />
            </Box>
          )}

          {/* 結果格 */}
          {doneCount > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {t('watermarkRemover.result.title', '處理結果')}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                {items.filter((it) => it.resultUrl).map((it) => (
                  <Box key={it.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={it.resultUrl!}
                      alt={it.name}
                      onClick={() => setPreviewId(it.id)}
                      sx={{ width: '100%', height: 120, objectFit: 'cover', backgroundColor: 'grey.100', cursor: 'zoom-in', display: 'block' }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="caption" noWrap title={it.name} sx={{ display: 'block', mb: 0.5 }}>
                        {it.name}
                      </Typography>
                      <Button fullWidth size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={() => downloadItem(it)}>
                        {t('watermarkRemover.buttons.download', '下載')}
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
        </>
      )}

      {/* 結果對照預覽 */}
      <Dialog open={previewId !== null} onClose={() => setPreviewId(null)} maxWidth="lg" fullWidth>
        {(() => {
          const it = items.find((x) => x.id === previewId);
          if (!it || !it.resultUrl) return null;
          return (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" noWrap title={it.name}>
                    {it.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                    <Button variant="contained" size="small" startIcon={<DownloadIcon />} onClick={() => downloadItem(it)} sx={{ bgcolor: ACCENT }}>
                      {t('watermarkRemover.buttons.download', '下載')}
                    </Button>
                    <IconButton size="small" onClick={() => setPreviewId(null)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {t('watermarkRemover.preview.original', '原圖')}
                    </Typography>
                    <Box
                      component="img"
                      src={it.url}
                      alt="original"
                      sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 1, backgroundColor: 'grey.100' }}
                    />
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {t('watermarkRemover.preview.result', '處理後')}
                    </Typography>
                    <Box
                      component="img"
                      src={it.resultUrl}
                      alt="result"
                      sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 1, backgroundColor: 'grey.100' }}
                    />
                  </Box>
                </Box>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>

      {/* 使用提示 */}
      <Paper sx={{ mt: 4, p: 3, backgroundColor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          💡 {t('watermarkRemover.tips.title', '使用提示')}
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            {t('watermarkRemover.tips.tipMulti', '可一次上傳多張圖片，逐張在縮圖切換並標記，最後按「移除浮水印（全部已標記）」批次處理。')}
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            {t('watermarkRemover.tips.tip1', '用「矩形框選」或「筆刷塗抹」精準標記浮水印，貼合邊緣效果最佳。')}
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            {t('watermarkRemover.tips.tip2', '浮水印周圍有相似紋理可參考時還原效果最好；背景非常獨特時可能留下痕跡。')}
          </Typography>
          <Typography component="li" variant="body2">
            {t('watermarkRemover.tips.tip4', '所有處理都在瀏覽器本機完成，不會上傳你的圖片到伺服器。')}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
