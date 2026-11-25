import { useEffect, useRef } from "react";

export default function WeatherOverlay({ mode = "off", accentRgb = [37, 137, 255] }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (mode === "off") return;
        const cvs = canvasRef.current;
        if (!cvs) return;
        const ctx = cvs.getContext("2d");
        if (!ctx) return;

        let W = 0, H = 0, raf = 0, running = true;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            cvs.width = W * dpr;
            cvs.height = H * dpr;
            cvs.style.width = `${W}px`;
            cvs.style.height = `${H}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        const count = mode === "rain" ? 110 : 75;
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: mode === "rain" ? 1.2 : 1.5 + Math.random() * 2.8,
            len: 12 + Math.random() * 14,
            vy: mode === "rain" ? 9 + Math.random() * 7 : 0.8 + Math.random() * 1.6,
            vx: mode === "rain" ? -1.2 : (Math.random() - 0.5) * 0.8,
            alpha: 0.25 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
        }));

        let t = 0;
        const draw = () => {
            if (!running) return;
            ctx.clearRect(0, 0, W, H);
            t += 0.02;

            for (const p of particles) {
                p.y += p.vy;
                p.x += mode === "snow" ? p.vx + Math.sin(t + p.phase) * 0.4 : p.vx;

                if (p.y > H + 20) {
                    p.y = -20;
                    p.x = Math.random() * W;
                }
                if (p.x > W + 20) p.x = -20;
                if (p.x < -20) p.x = W + 20;

                if (mode === "rain") {
                    ctx.strokeStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${p.alpha})`;
                    ctx.lineWidth = p.r;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + p.vx * 1.5, p.y + p.len);
                    ctx.stroke();
                } else {
                    ctx.fillStyle = `rgba(220, 238, 255, ${p.alpha + 0.15})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, [mode, accentRgb]);

    if (mode === "off") return null;

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9990,
                pointerEvents: "none",
            }}
        />
    );
}