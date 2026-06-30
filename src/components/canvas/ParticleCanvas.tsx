import { useEffect, useRef, useCallback } from 'react';

/* ---------------------------------------------------------------
   Lightweight 2D Canvas background — a subtle parallax grid.
   (The animated colour dots were removed; only the grid remains.)
   --------------------------------------------------------------- */

/* Subtle grid drawn directly onto the canvas. */
function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scrollY: number,
) {
  const spacing = 80;
  const offsetY = -(scrollY * 0.15) % spacing;

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.045)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();

  for (let x = 0; x < w; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = offsetY; y < h; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }

  ctx.stroke();
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    init();

    const onResize = () => init();
    window.addEventListener('resize', onResize);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- Animation loop with frame-skipping ---- */
    const TARGET_INTERVAL = 1000 / 30; // cap at 30fps for CPU savings
    let lastFrame = 0;

    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);

      const delta = time - lastFrame;
      if (delta < TARGET_INTERVAL) return; // skip frame
      lastFrame = time - (delta % TARGET_INTERVAL);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      /* Grid only — particle dots removed */
      drawGrid(ctx, w, h, scrollRef.current);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
