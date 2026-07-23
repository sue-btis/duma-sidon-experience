"use client";

import { useEffect, useRef } from "react";

import styles from "./letter-worlds-canvas.module.css";

type World = {
  color: string;
  opacity: number;
  points: readonly Point[];
  rotation: number;
  scale: number;
  tilt: number;
  x: number;
  y: number;
};

type Point = {
  char: string;
  color: string;
  phase: number;
  size: number;
  x: number;
  y: number;
  z: number;
};

const palettes = {
  core: ["#00adef", "#69c9f0", "#2b328c", "#8bdaef"],
  digital: ["#00a887", "#63c8aa", "#0d553f", "#8bd8bd"],
  physical: ["#765ca4", "#a18bc8", "#3b2b50", "#c2b3dc"],
};

function sphere(count: number, characters: string, colors: readonly string[], seed: number): Point[] {
  const points: Point[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index + seed;
    points.push({
      char: characters[(index * 7 + seed * 13) % characters.length] ?? "·",
      color: colors[(index * 5 + seed) % colors.length] ?? colors[0]!,
      phase: (index * 0.37 + seed) % (Math.PI * 2),
      size: 0.72 + ((index * 17) % 100) / 180,
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }

  return points;
}

export function LetterWorldsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const worlds: readonly World[] = [
      { color: "96, 175, 232", opacity: 0.93, points: sphere(1050, "ECOSAT0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", palettes.core, 3), rotation: 0.065, scale: 1.12, tilt: -0.12, x: 0.5, y: 0.43 },
      { color: "126, 92, 221", opacity: 0.68, points: sphere(560, "CCTVAVBMSRFIDHVACFIREACCESSDATA", palettes.physical, 7), rotation: -0.04, scale: 0.62, tilt: 0.18, x: 0.05, y: 0.76 },
      { color: "47, 173, 132", opacity: 0.68, points: sphere(560, "01<>/{}[]APIJSONSQLAIOTDATAFLOW", palettes.digital, 11), rotation: 0.046, scale: 0.62, tilt: -0.2, x: 0.95, y: 0.76 },
    ];
    let animationFrame: number | undefined;
    let height = 0;
    let isIntersecting = true;
    let isVisible = document.visibilityState === "visible";
    let lastFrame = 0;
    let width = 0;

    const shouldAnimate = () => !media.matches && isIntersecting && isVisible;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawOrbit = (x: number, y: number, radius: number, rotation: number, color: string, alpha: number, nodeAngle: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.strokeStyle = `rgba(${color}, ${alpha})`;
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(0, 0, radius * 1.17, radius * 0.34, 0, 0, Math.PI * 2);
      context.stroke();
      const nodeX = Math.cos(nodeAngle) * radius * 1.17;
      const nodeY = Math.sin(nodeAngle) * radius * 0.34;
      context.fillStyle = `rgba(${color}, ${Math.min(alpha * 4, 0.95)})`;
      context.shadowColor = `rgba(${color}, .55)`;
      context.shadowBlur = 8;
      context.beginPath();
      context.arc(nodeX, nodeY, Math.max(2.2, radius * 0.013), 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawWorld = (world: World, time: number) => {
      const radius = Math.min(width, height) * (width < 700 ? 0.33 : 0.34) * world.scale;
      const centerX = width * world.x;
      const centerY = height * world.y;
      const rotationY = time * world.rotation;
      const rotationX = world.tilt;
      const cosineX = Math.cos(rotationX);
      const sineX = Math.sin(rotationX);
      const glow = context.createRadialGradient(centerX - radius * 0.25, centerY - radius * 0.28, 0, centerX, centerY, radius * 1.05);
      glow.addColorStop(0, `rgba(${world.color}, .10)`);
      glow.addColorStop(0.72, `rgba(${world.color}, .035)`);
      glow.addColorStop(1, `rgba(${world.color}, 0)`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.06, 0, Math.PI * 2);
      context.fill();
      drawOrbit(centerX, centerY, radius, -0.22, world.color, world.opacity * 0.28, time * world.rotation * 2.2);
      drawOrbit(centerX, centerY, radius * 1.05, 0.56, world.color, world.opacity * 0.18, -time * world.rotation * 1.6 + 2.3);

      const pointCount = width < 1000 && world.scale < 1 ? 320 : world.points.length;
      const projected = [] as { alpha: number; char: string; color: string; size: number; x: number; y: number; z: number }[];
      for (let index = 0; index < pointCount; index += 1) {
        const point = world.points[index]!;
        const yAngle = rotationY + Math.sin(time * 0.12 + point.phase) * 0.006;
        const cosineY = Math.cos(yAngle);
        const sineY = Math.sin(yAngle);
        const x = point.x * cosineY - point.z * sineY;
        const z = point.x * sineY + point.z * cosineY;
        const y = point.y * cosineX - z * sineX;
        const rotatedZ = point.y * sineX + z * cosineX;
        const perspective = 1 / (1.55 - rotatedZ * 0.48);
        projected.push({ alpha: Math.min(1, Math.max(0.12, 0.38 + (rotatedZ + 1) * 0.32)), char: point.char, color: point.color, size: point.size * radius * 0.032 * perspective, x: centerX + x * radius * perspective, y: centerY + y * radius * perspective, z: rotatedZ });
      }
      projected.sort((first, second) => first.z - second.z);
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (const point of projected) {
        context.globalAlpha = world.opacity * point.alpha;
        context.fillStyle = point.color;
        context.font = `${Math.max(5.5, point.size)}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        context.fillText(point.char, point.x, point.y);
      }
      context.globalAlpha = world.opacity * 0.48;
      context.strokeStyle = `rgba(${world.color}, .32)`;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();
      context.globalAlpha = 1;
    };

    const render = (now: number) => {
      context.clearRect(0, 0, width, height);
      const time = media.matches ? 0 : now / 1000;
      if (width >= 700) {
        drawWorld(worlds[1]!, time);
        drawWorld(worlds[2]!, time);
      }
      drawWorld(worlds[0]!, time);
    };
    const frame = (now: number) => {
      if (!shouldAnimate()) {
        animationFrame = undefined;
        return;
      }
      if (now - lastFrame >= 1000 / 60) {
        lastFrame = now;
        render(now);
      }
      animationFrame = window.requestAnimationFrame(frame);
    };
    const updateAnimation = () => {
      if (shouldAnimate()) {
        if (animationFrame === undefined) animationFrame = window.requestAnimationFrame(frame);
      } else {
        if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
        render(0);
      }
    };
    const motionChange = () => { lastFrame = 0; updateAnimation(); };
    const visibilityChange = () => { isVisible = document.visibilityState === "visible"; updateAnimation(); };
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry?.isIntersecting ?? false;
      updateAnimation();
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      render(0);
    });

    resize();
    render(0);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    updateAnimation();
    window.addEventListener("resize", resize, { passive: true });
    media.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      media.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, []);

  return <canvas aria-hidden="true" className={styles.canvas} ref={canvasRef} />;
}
