import { memo, useEffect, useRef } from 'react';
import {
  createStars, starBudget, moveStars, proximityLinks, reconcileStarPool, shouldReseedSky,
} from './starfield-model.js';

// A single Canvas 2D with gently evolving proximity links, inspired by the
// original main-branch particle system. No third-party renderers or frame state.
const CosmicStarfield = memo(function CosmicStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let context;
    try {
      context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    } catch {
      return undefined;
    }
    if (!context) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lowPower = Boolean(navigator.connection?.saveData) ||
      (Number(navigator.hardwareConcurrency) > 0 && navigator.hardwareConcurrency <= 4);

    let width = 1;
    let height = 1;
    let stars = [];
    let elapsedMs = 0;
    let frame = 0;
    let previousFrame = 0;
    let running = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameInterval = 1000 / 24;
    let lastDpr = 0;
    let resizeTimer = 0;
    let resizeObserver;
    let seededWidth = 0;

    const paint = (time, delta) => {
      context.clearRect(0, 0, width, height);
      const seconds = time / 1000;
      moveStars(stars, seconds, width, height, delta / 1000);

      pointerX += (targetX - pointerX) * 0.055;
      pointerY += (targetY - pointerY) * 0.055;

      const points = stars.map(star => ({
        x: star.x * width + pointerX * star.depth,
        y: star.y * height + pointerY * star.depth,
      }));

      // Rebuild only nearby neighbours. Links weave together and gently fade
      // as distances and pair-specific random phases change.
      const mobile = width <= 640;
      const distance = mobile ? 132 : 158;
      const links = proximityLinks(points, distance, seconds, mobile ? 90 : lowPower ? 140 : 260);
      context.lineWidth = mobile ? 0.8 : 0.95;
      for (const link of links) {
        const start = points[link.a];
        const end = points[link.b];
        context.globalAlpha = Math.min(0.58, link.strength * 0.57);
        context.strokeStyle = stars[link.a].color;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
      }

      // Stars stay crisp; only a few have a glow to avoid costly shadows.
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const { x, y } = points[i];
        const twinkle = 0.81 + 0.19 * Math.sin(seconds * star.pulse + star.phase);
        const radius = star.radius * (0.96 + 0.04 * twinkle);

        context.globalAlpha = star.opacity * twinkle;
        context.fillStyle = star.color;
        if (i % 13 === 0) {
          context.shadowBlur = 8;
          context.shadowColor = star.color;
        }
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

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
      // The visual viewport changes while mobile browser chrome hides.
      // Use our CSS-stabilized canvas box, not window.innerHeight.
      const box = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(box.width));
      const nextHeight = Math.max(1, Math.round(box.height));
      const mobile = nextWidth <= 640;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);

      // Do not re-render on height-only mobile browser chrome changes.
      // Reseed when the measured canvas width changes by even 1 CSS pixel.
      // Height-only changes do not reshuffle the stars.
      if (nextWidth === width && nextHeight === height && dpr === lastDpr) return;
      const reshuffle = shouldReseedSky(seededWidth, nextWidth);
      if (reshuffle) seededWidth = nextWidth;
      width = nextWidth;
      height = nextHeight;
      lastDpr = dpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameInterval = 1000 / (mobile || lowPower ? 20 : 24);
      const budget = starBudget(width, height, lowPower);
      stars = reshuffle ? createStars(budget) : reconcileStarPool(stars, budget);
      paint(elapsedMs, 0);
    };

    const scheduleResize = () => {
      // Coalesce rapid resize events rather than debounce until mouse release:
      // visible star reshuffles happen WHILE dragging, at most ~16/sec.
      // Mobile height-only toolbar changes never satisfy the 1px width rule.
      if (resizeTimer) return;
      resizeTimer = setTimeout(() => {
        resizeTimer = 0;
        resize();
      }, 60);
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
    resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(scheduleResize) : null;
    resizeObserver?.observe(canvas);
    window.addEventListener('resize', scheduleResize, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (motion.addEventListener) motion.addEventListener('change', onMotion);
    else motion.addListener?.(onMotion);

    return () => {
      stop();
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      if (motion.removeEventListener) motion.removeEventListener('change', onMotion);
      else motion.removeListener?.(onMotion);
    };
  }, []);

  return <canvas className="cosmic-starfield" ref={canvasRef} aria-hidden="true" />;
});

export default CosmicStarfield;
