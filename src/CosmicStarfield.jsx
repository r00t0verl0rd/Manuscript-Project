import { memo, useEffect, useRef } from 'react';
import { createStars, starBudget, createConstellations, constellationPoints } from './starfield-model.js';

// Exactly one Canvas 2D and one requestAnimationFrame loop; no React state
// updates per frame, no particle package, no WebGL or third-party resources.
const CosmicStarfield = memo(function CosmicStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let context;
    try {
      context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    } catch {
      return undefined; // Browser still shows the CSS nebula fallback.
    }
    if (!context) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lowPower = Boolean(navigator.connection?.saveData) ||
      (Number(navigator.hardwareConcurrency) > 0 && navigator.hardwareConcurrency <= 4);

    let width = 1;
    let height = 1;
    let stars = [];
    let constellations = [];
    let elapsedMs = 0;
    let frame = 0;
    let previousFrame = 0;
    let running = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameInterval = 1000 / 24;

    const paint = (time, delta) => {
      context.clearRect(0, 0, width, height);
      pointerX += (targetX - pointerX) * 0.055;
      pointerY += (targetY - pointerY) * 0.055;

      // Constellations travel as small, coherent star maps behind the sun.
      // Only 2 on mobile / 4 on desktop, with 7 direct edges per group.
      const seconds = time / 1000;
      for (const group of constellations) {
        const points = constellationPoints(group, width, height, seconds);
        const offsetX = pointerX * 0.35;
        const offsetY = pointerY * 0.35;

        context.strokeStyle = group.color;
        context.lineWidth = 0.9;
        context.globalAlpha = 0.32;
        context.beginPath();
        for (const [start, end] of group.edges) {
          context.moveTo(points[start].x + offsetX, points[start].y + offsetY);
          context.lineTo(points[end].x + offsetX, points[end].y + offsetY);
        }
        context.stroke();

        for (let i = 0; i < points.length; i += 1) {
          const { x, y } = points[i];
          context.globalAlpha = (i === 2 ? 0.96 : 0.76) *
            (0.88 + 0.12 * Math.sin(seconds * 1.15 + group.phase + i));
          context.fillStyle = group.color;
          if (i === 2) {
            context.shadowBlur = 10;
            context.shadowColor = group.color;
          }
          context.beginPath();
          context.arc(x + offsetX, y + offsetY, i === 2 ? 2.25 : 1.55, 0, Math.PI * 2);
          context.fill();
          context.shadowBlur = 0;
        }
      }
      context.globalAlpha = 1;

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        if (delta) {
          star.x += star.drift * (delta / 1000);
          if (star.x < 0) star.x += 1;
          else if (star.x > 1) star.x -= 1;
        }

        const x = star.x * width + pointerX * star.depth;
        const y = star.y * height + pointerY * star.depth;
        const twinkle = 0.78 + 0.22 * Math.sin(time * 0.001 * star.pulse + star.phase);
        const radius = star.radius * (0.96 + 0.04 * twinkle);

        context.globalAlpha = star.opacity * twinkle;
        context.fillStyle = star.color;

        // A small subset has a soft aura; most stars are a single cheap arc.
        if (i % 13 === 0) {
          context.shadowBlur = 8;
          context.shadowColor = star.color;
        }
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        // Rare distant cross-shaped glints enrich the depth without sprites.
        if (i % 29 === 0) {
          context.globalAlpha *= 0.38;
          context.fillRect(x - radius * 3.6, y - 0.35, radius * 7.2, 0.7);
          context.fillRect(x - 0.35, y - radius * 3.6, 0.7, radius * 7.2);
        }
      }
      context.globalAlpha = 1;
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      previousFrame = 0;
    };

    const tick = (time) => {
      if (!running) return;
      if (!previousFrame || time - previousFrame >= frameInterval) {
        const delta = previousFrame ? Math.min(70, time - previousFrame) : 0;
        elapsedMs += delta;
        paint(elapsedMs, delta);
        previousFrame = time;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden || motion.matches) return;
      running = true;
      previousFrame = 0;
      frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      const mobile = width <= 640;
      // High-DPI phones can otherwise allocate millions of needless pixels.
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameInterval = 1000 / (mobile || lowPower ? 20 : 24);
      stars = createStars(starBudget(width, height, lowPower));
      constellations = createConstellations(width);
      paint(elapsedMs, 0); // Static stars visible even with reduced motion.
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMotion = () => {
      if (motion.matches) {
        stop();
        paint(elapsedMs, 0);
      } else start();
    };
    const onPointer = (event) => {
      if (event.pointerType === 'touch' || motion.matches) return;
      targetX = (event.clientX / width - 0.5) * 22;
      targetY = (event.clientY / height - 0.5) * 14;
    };

    resize();
    start();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (motion.addEventListener) motion.addEventListener('change', onMotion);
    else motion.addListener?.(onMotion);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      if (motion.removeEventListener) motion.removeEventListener('change', onMotion);
      else motion.removeListener?.(onMotion);
    };
  }, []);

  return <canvas className="cosmic-starfield" ref={canvasRef} aria-hidden="true" />;
});

export default CosmicStarfield;
