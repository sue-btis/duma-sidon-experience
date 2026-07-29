"use client";

import { useEffect, useRef } from "react";

import { advanceFinalJourney, getFinalJourneyProgress, initializeJourney, type FinalJourneyState } from "./homeParticleJourneyState";
import styles from "./home-experience.module.css";

type Particle = {
  color: string;
  fromX: number;
  fromY: number;
  phase: number;
  x: number;
  y: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const easeOut = (value: number) => 1 - (1 - value) ** 3;
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export function HomeParticleJourney() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !context || reducedMotion.matches || navigator.hardwareConcurrency <= 4) return;

    const logo = new Image();
    let animationFrame: number | undefined;
    let finalState: FinalJourneyState = { completed: false, startedAt: null };
    let startedAt: number | null = null;
    let width = 0;
    let height = 0;
    let logoHeight = 0;
    let logoWidth = 0;
    let particles: Particle[] = [];

    const isFinalInView = (rect?: DOMRect) => Boolean(rect && rect.top < height * 0.78 && rect.bottom > height * 0.12);

    const createParticles = () => {
      const pixelRatio = Math.min(devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);

      const openingLogo = document.querySelector<HTMLElement>("img[data-home-particle-logo]");
      logoWidth = openingLogo?.getBoundingClientRect().width ?? Math.min(280, width * 0.574);
      logoHeight = logoWidth * (1261 / 1504);
      const sample = 1;
      const target = document.createElement("canvas");
      target.width = Math.ceil(logoWidth);
      target.height = Math.ceil(logoHeight);
      const pen = target.getContext("2d");
      if (!pen) return;
      pen.drawImage(logo, 0, 0, logoWidth, logoHeight);

      const pixels = pen.getImageData(0, 0, target.width, target.height).data;
      particles = [];
      for (let y = 0; y < target.height; y += sample) {
        for (let x = 0; x < target.width; x += sample) {
          const index = (y * target.width + x) * 4;
          if (pixels[index + 3] <= 120) continue;
          particles.push({
            color: `rgb(${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]})`,
            fromX: Math.random() * width,
            fromY: Math.random() * height,
            phase: Math.random() * Math.PI * 2,
            x: x - logoWidth / 2,
            y: y - logoHeight / 2,
          });
        }
      }
    };

    const draw = (now: number) => {
      animationFrame = undefined;
      context.clearRect(0, 0, width, height);
      const opening = document.querySelector<HTMLElement>("#portada");
      const industries = document.querySelector<HTMLElement>("#industrias");
      const finalNode = document.querySelector<HTMLElement>("[data-home-particle-final]");
      const openingRect = opening?.getBoundingClientRect();
      const industriesRect = industries?.getBoundingClientRect();
      const finalRect = finalNode?.getBoundingClientRect();
      const finalCenter = finalRect
        ? { x: finalRect.left + finalRect.width / 2, y: finalRect.top + finalRect.height / 2 }
        : { x: width / 2, y: height / 2 };
      const intro = easeOut(clamp((now - (startedAt ?? now)) / 1300));
      const dissolve = openingRect ? easeOut(clamp(-openingRect.top / (height * 0.35))) : 1;
      const industryPresence = industriesRect
        ? clamp((height * 0.92 - industriesRect.top) / (height * 0.35)) * clamp((industriesRect.bottom - height * 0.08) / (height * 0.35))
        : 0;
      const finalInView = isFinalInView(finalRect);
      finalState = advanceFinalJourney(finalState, finalInView, now);
      const finalProgress = getFinalJourneyProgress(finalState, now);
      const time = now * 0.001;
      const mode = finalState.startedAt !== null ? "final" : industryPresence > 0 ? "industry" : dissolve < 1 ? "opening" : "hidden";
      const staticLogo = (mode === "opening" && intro === 1 && dissolve === 0) || finalState.completed;
      if (mode === "hidden" || staticLogo) {
        delete document.documentElement.dataset.homeParticles;
        return;
      }
      document.documentElement.dataset.homeParticles = "active";
      const particleStep = mode === "final" ? 1 : mode === "industry" || dissolve > 0 ? 4 : intro < 0.7 ? 20 : 4;
      for (let index = 0; index < particles.length; index += particleStep) {
        const particle = particles[index];
        const heroX = width / 2 + particle.x;
        const heroY = height * 0.43 + particle.y;
        const formedX = lerp(particle.fromX, heroX, intro);
        const formedY = lerp(particle.fromY, heroY, intro);
        const flowX = particle.fromX + Math.cos(time * 0.7 + particle.phase) * 20;
        const flowY = particle.fromY + Math.sin(time + particle.phase) * 20;
        const toX = finalCenter.x + particle.x;
        const toY = finalCenter.y + particle.y;
        const dissolveX = heroX + Math.cos(particle.phase) * width * 0.42;
        const dissolveY = heroY + Math.sin(particle.phase * 1.7) * height * 0.36;
        const x = mode === "final" ? lerp(flowX, toX, finalProgress)
          : mode === "industry" ? flowX
            : lerp(formedX, dissolveX, dissolve);
        const y = mode === "final" ? lerp(flowY, toY, finalProgress)
          : mode === "industry" ? flowY
            : lerp(formedY, dissolveY, dissolve);
        context.globalAlpha = mode === "final" ? 1 : mode === "industry" ? 0.12 * industryPresence : 1 - dissolve;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(x, y, mode === "industry" ? 0.75 : 1.25, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      if (intro < 1 || mode === "industry" || (mode === "final" && !finalState.completed)) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const scheduleDraw = () => {
      if (animationFrame === undefined) animationFrame = requestAnimationFrame(draw);
    };

    const finalNode = document.querySelector<HTMLElement>("[data-home-particle-final]");
    const finalObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting || finalState.startedAt === null || finalState.completed) return;
      finalState = advanceFinalJourney(finalState, false, performance.now());
      delete document.documentElement.dataset.homeParticles;
      scheduleDraw();
    });
    if (finalNode) finalObserver.observe(finalNode);

    const start = () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
      createParticles();
      const initialization = initializeJourney(startedAt, performance.now());
      startedAt = initialization.startedAt;
      if (initialization.shouldActivate) document.documentElement.dataset.homeParticles = "active";
      scheduleDraw();
    };

    logo.addEventListener("load", start, { once: true });
    logo.src = "/home/worlds/ecosat-horizontal.png";
    addEventListener("resize", start);
    addEventListener("scroll", scheduleDraw, { passive: true });

    return () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      finalObserver.disconnect();
      delete document.documentElement.dataset.homeParticles;
      removeEventListener("resize", start);
      removeEventListener("scroll", scheduleDraw);
    };
  }, []);

  return <canvas aria-hidden="true" className={styles.particleJourney} ref={canvasRef} />;
}
