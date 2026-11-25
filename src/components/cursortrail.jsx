import { useEffect, useRef } from "react";

// Wavy ribbon + glowing sparks + ripples cursor effect.
// Adapted from the reference site's mouse trail, recoloured to GradeView yellow.
function startCursorTrail(cvs, opts = {}) {
 // Change lines 6-8 from:
// const C = opts.color || [255, 204, 31];
// const rgba = (a, rgb = C) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
// const HOT = [255, 247, 214];

// To this:
const C = opts.color || [37, 137, 255];
const rgba = (a, rgb = C) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
const HOT = [255, 255, 255];                     // icy blue-white spark core
  const ctx = cvs.getContext('2d');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};                     // respect reduced motion (matches the paper's NFR 1.4)

  let W = 0, H = 0, raf = 0, running = true;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    cvs.width = W * dpr; cvs.height = H * dpr;
    cvs.style.width = W + 'px'; cvs.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  let mx = -200, my = -200, smx = -200, smy = -200, seen = false;
  const onMove = e => {
    mx = e.clientX; my = e.clientY;
    if (!seen) { smx = mx; smy = my; seen = true; }  // no streak from the corner on first move
  };
  document.addEventListener('mousemove', onMove);

  const trail = [], sparks = [], ripples = [];
  const MAX_TRAIL = 40, MAX_SPARKS = 100;
  let t = 0, lastSpawn = 0, lastRipple = 0;

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    t += 0.03;
    smx += (mx - smx) * 0.12; smy += (my - smy) * 0.12;
    const dx = mx - smx, dy = my - smy;
    const speed = Math.hypot(dx, dy);

    if (seen) { trail.push({ x: smx, y: smy, t }); if (trail.length > MAX_TRAIL) trail.shift(); }
    // fade the trail out when the mouse is still
    if (speed < 0.3 && trail.length) trail.shift();

    const now = performance.now();
    if (now - lastSpawn > 30 && speed > 0.3) {
      lastSpawn = now;
      const count = Math.min(3, 1 + speed * 0.15);
      for (let i = 0; i < count; i++) sparks.push({
        x: smx + (Math.random() - .5) * 6, y: smy + (Math.random() - .5) * 6,
        vx: (Math.random() - .5) + dx * .02, vy: (Math.random() - .5) + dy * .02 - .5,
        life: 1, decay: .008 + Math.random() * .012, size: 1 + Math.random() * 2.5, phase: Math.random() * 6.283,
      });
    }
    if (sparks.length > MAX_SPARKS) sparks.splice(0, sparks.length - MAX_SPARKS);
    if (now - lastRipple > 180 && speed > 1) {
      lastRipple = now;
      ripples.push({ x: smx, y: smy, r: 3, maxR: 25 + speed * 2, life: 1 });
    }
    if (ripples.length > 5) ripples.shift();

    // wavy ribbon (3 layered strokes)
    if (trail.length > 3) {
      ctx.save();
      for (let w = 0; w < 3; w++) {
        const amp = [4, 7, 2][w], freq = [.15, .08, .22][w], alpha = [.35, .16, .12][w];
        ctx.beginPath();
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i], prog = i / trail.length;
          const wave = Math.sin(p.t * 3 + i * freq) * amp * prog;
          let nx = 0, ny = 1;
          if (i < trail.length - 1) {
            const n = trail[i + 1], tx = n.x - p.x, ty = n.y - p.y, len = Math.hypot(tx, ty) || 1;
            nx = -ty / len; ny = tx / len;
          }
          const x = p.x + nx * wave, y = p.y + ny * wave;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = rgba(alpha); ctx.lineWidth = [3, 6, 1.5][w];
        ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
      }
      const R = 45 + speed * 2;
      const g = ctx.createRadialGradient(smx, smy, 0, smx, smy, R);
      g.addColorStop(0, rgba(.18)); g.addColorStop(.4, rgba(.07)); g.addColorStop(1, rgba(0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(smx, smy, R, 0, 6.283); ctx.fill();
      ctx.restore();
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += (rp.maxR - rp.r) * .08; rp.life -= .025;
      if (rp.life <= 0) { ripples.splice(i, 1); continue; }
      ctx.save(); ctx.globalAlpha = rp.life * rp.life * .4;
      ctx.strokeStyle = rgba(.6); ctx.lineWidth = 1.5 * rp.life;
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, 6.283); ctx.stroke(); ctx.restore();
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx + Math.sin(t * 4 + p.phase) * .3;
      p.y += p.vy + Math.cos(t * 3 + p.phase) * .2;
      p.vy += .008; p.vx *= .985; p.life -= p.decay;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      const a = p.life * p.life, r = p.size * (.5 + p.life * .5), pulse = 1 + Math.sin(t * 6 + p.phase) * .15;
      ctx.save(); ctx.globalAlpha = a * .3;                       // glow
      ctx.fillStyle = rgba(.5); ctx.beginPath(); ctx.arc(p.x, p.y, r * 2.5 * pulse, 0, 6.283); ctx.fill();
      ctx.globalAlpha = a * .85; ctx.fillStyle = rgba(1);          // core
      ctx.beginPath(); ctx.arc(p.x, p.y, r * pulse, 0, 6.283); ctx.fill();
      ctx.globalAlpha = a; ctx.fillStyle = rgba(.7, HOT);          // hot centre
      ctx.beginPath(); ctx.arc(p.x, p.y, r * .3 * pulse, 0, 6.283); ctx.fill();
      ctx.restore();
    }
    raf = requestAnimationFrame(draw);
  }
  const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); } else { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } };
  document.addEventListener('visibilitychange', onVis);
  raf = requestAnimationFrame(draw);

  return function stop() {                         // cleanup for React
    running = false; cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('visibilitychange', onVis);
    ctx.clearRect(0, 0, W, H);
  };
}

/* Add <CursorTrail /> once inside GradePage. It draws on one fixed canvas
   that ignores the mouse, so it never blocks clicks. */
export default function CursorTrail({ color = [37, 137, 255] }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return;
        return startCursorTrail(ref.current, { color });
    }, [color]);
    return (
        <canvas
            ref={ref}
            aria-hidden="true"
            style={{ position: "fixed", inset: 0, zIndex: 9995, pointerEvents: "none" }}
        />
    );
}