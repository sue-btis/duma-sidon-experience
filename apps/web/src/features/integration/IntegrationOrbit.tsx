"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { getNearestFrontIndex, getOrbitCardLayout, getSnapRotation } from "./orbitMath";
import { OrbitLink } from "./OrbitLink";
import styles from "./integration.module.css";

export type OrbitSolution = Readonly<{
  action: string;
  href: string;
  icon: string;
  slug: string;
  summary: string;
  title: string;
}>;

type Props = Readonly<{
  ariaLabel: string;
  instructions: string;
  nextLabel: string;
  previousLabel: string;
  solutions: readonly OrbitSolution[];
}>;

const AUTOPLAY_DELAY = 1100;

export function IntegrationOrbit({ ariaLabel, instructions, nextLabel, previousLabel, solutions }: Props) {
  const sceneRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const clockRef = useRef(0);
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const pointerRef = useRef({ dragging: false, moved: false, startRotation: 0, startX: 0, previousX: 0 });
  const pauseRef = useRef({ documentHidden: false, focus: false, hover: false, offscreen: false });
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  function noteInteraction() {
    lastInteractionRef.current = clockRef.current;
  }

  function rotateTo(index: number) {
    noteInteraction();
    velocityRef.current = 0;
    targetRotationRef.current = getSnapRotation(index, solutions.length, currentRotationRef.current);
  }

  function rotateBy(amount: number) {
    const nextIndex = (activeIndexRef.current + amount + solutions.length) % solutions.length;
    rotateTo(nextIndex);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if ((event.target as Element).closest("button")) return;

    pointerRef.current = {
      dragging: true,
      moved: false,
      previousX: event.clientX,
      startRotation: targetRotationRef.current,
      startX: event.clientX,
    };
    velocityRef.current = 0;
    noteInteraction();
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const pointer = pointerRef.current;
    if (!pointer.dragging) return;

    const deltaX = event.clientX - pointer.startX;
    const frameDelta = event.clientX - pointer.previousX;
    pointer.moved ||= Math.abs(deltaX) > 8;
    if (pointer.moved && !event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
    pointer.previousX = event.clientX;
    targetRotationRef.current = pointer.startRotation + deltaX * 0.0042;
    velocityRef.current = Math.max(-0.065, Math.min(0.065, frameDelta * 0.0014));
    noteInteraction();
  }

  function handlePointerEnd(event: ReactPointerEvent<HTMLElement>) {
    pointerRef.current.dragging = false;
    noteInteraction();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleWheel(event: ReactWheelEvent<HTMLElement>) {
    const direction = Math.sign(event.deltaY || event.deltaX);
    if (!direction) return;

    noteInteraction();
    targetRotationRef.current += direction * 0.035;
    velocityRef.current = Math.max(-0.08, Math.min(0.08, velocityRef.current + direction * 0.012));
  }

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dimensions = { radiusX: 0, radiusZ: 0 };
    let frameId = 0;
    let previousTime = 0;

    function measure() {
      const width = scene?.clientWidth ?? 0;
      const compact = width < 640;
      dimensions = compact
        ? { radiusX: Math.min(width * 0.48, 215), radiusZ: Math.min(width * 0.34, 155) }
        : { radiusX: Math.min(width * 0.42, 520), radiusZ: Math.min(width * 0.29, 360) };
    }

    function render(time: number) {
      if (reducedMotion.matches) return;

      if (previousTime === 0) {
        previousTime = time;
        lastInteractionRef.current = time;
      }
      const deltaTime = Math.min(32, time - previousTime);
      previousTime = time;
      clockRef.current = time;
      const pause = pauseRef.current;
      const paused = pause.documentHidden || pause.focus || pause.hover || pause.offscreen;

      if (!paused && !pointerRef.current.dragging && time - lastInteractionRef.current > AUTOPLAY_DELAY) {
        targetRotationRef.current += deltaTime * 0.000100;
      }

      if (!paused && !pointerRef.current.dragging) {
        targetRotationRef.current += velocityRef.current;
        velocityRef.current *= Math.pow(0.91, deltaTime / 16.67);
      }

      const smoothing = 1 - Math.pow(0.925, deltaTime / 16.67);
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * smoothing;

      for (let index = 0; index < solutions.length; index += 1) {
        const card = cardRefs.current[index];
        if (!card) continue;

        const layout = getOrbitCardLayout(index, solutions.length, currentRotationRef.current, dimensions);
        card.style.opacity = layout.opacity.toFixed(3);
        card.style.zIndex = String(layout.zIndex);
        card.style.filter = `blur(${layout.blur.toFixed(2)}px)`;
        card.style.transform = `translate3d(${layout.x.toFixed(2)}px, ${layout.y}px, ${layout.z.toFixed(2)}px) rotateY(${layout.rotateY.toFixed(2)}deg) scale(${layout.scale.toFixed(3)}) translate(-50%, -50%)`;
      }

      const nextActiveIndex = getNearestFrontIndex(currentRotationRef.current, solutions.length);
      if (nextActiveIndex !== activeIndexRef.current) {
        const previousCard = cardRefs.current[activeIndexRef.current];
        const activeCard = cardRefs.current[nextActiveIndex];
        previousCard?.setAttribute("tabindex", "-1");
        previousCard?.removeAttribute("data-active");
        activeCard?.setAttribute("tabindex", "0");
        activeCard?.setAttribute("data-active", "true");
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }

      frameId = requestAnimationFrame(render);
    }

    function handleMotionPreference() {
      cancelAnimationFrame(frameId);
      if (!reducedMotion.matches) {
        previousTime = 0;
        frameId = requestAnimationFrame(render);
      }
    }

    function handleVisibilityChange() {
      pauseRef.current.documentHidden = document.hidden;
      if (!document.hidden) previousTime = 0;
    }

    measure();
    cardRefs.current[0]?.setAttribute("data-active", "true");
    const resizeObserver = new ResizeObserver(measure);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      pauseRef.current.offscreen = !entry.isIntersecting;
      if (entry.isIntersecting) previousTime = 0;
    });
    resizeObserver.observe(scene);
    intersectionObserver.observe(scene);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreference);
    handleMotionPreference();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, [solutions.length]);

  const activeSolution = solutions[activeIndex];

  return (
    <section
      aria-describedby="integration-orbit-instructions"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={styles.integrationOrbit}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pauseRef.current.focus = false;
          noteInteraction();
        }
      }}
      onFocus={() => { pauseRef.current.focus = true; }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          rotateBy(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          rotateBy(1);
        } else if (event.key === "Enter" && event.target === event.currentTarget) {
          cardRefs.current[activeIndexRef.current]?.click();
        }
      }}
      onMouseEnter={() => { pauseRef.current.hover = true; }}
      onMouseLeave={() => {
        pauseRef.current.hover = false;
        lastInteractionRef.current = 0;
      }}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onWheel={handleWheel}
      ref={sceneRef}
      role="region"
      tabIndex={0}
    >
      <p className={styles.srOnly} id="integration-orbit-instructions">{instructions}</p>
      <div className={styles.orbitTrack}>
        {solutions.map((solution, index) => (
          <OrbitLink
            className={styles.orbitCard}
            href={solution.href}
            key={solution.slug}
            node={solution.slug}
            onClick={(event) => {
              if (pointerRef.current.moved || index !== activeIndexRef.current) {
                event.preventDefault();
                pointerRef.current.moved = false;
                rotateTo(index);
              }
            }}
            ref={(element) => { cardRefs.current[index] = element; }}
            tabIndex={index === 0 ? 0 : -1}
          >
            <span className={styles.orbitCardTop}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Image alt="" height={84} src={solution.icon} unoptimized width={84} />
            </span>
            <span>
              <strong>{solution.title}</strong>
              <span className={styles.orbitSummary}>{solution.summary}</span>
              <span className={styles.orbitAction}>{solution.action}<ArrowRight aria-hidden="true" size={16} /></span>
            </span>
          </OrbitLink>
        ))}
      </div>

      <div className={styles.orbitHud}>
        <button aria-label={previousLabel} onClick={() => rotateBy(-1)} type="button"><ArrowLeft aria-hidden="true" size={18} /></button>
        <p aria-atomic="true" aria-live="polite"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(solutions.length).padStart(2, "0")}</span>{activeSolution.title}</p>
        <button aria-label={nextLabel} onClick={() => rotateBy(1)} type="button"><ArrowRight aria-hidden="true" size={18} /></button>
      </div>

      <ul className={styles.reducedOrbitList}>
        {solutions.map((solution) => (
          <li key={solution.slug}>
            <OrbitLink href={solution.href} node={solution.slug}>
              <Image alt="" height={48} src={solution.icon} unoptimized width={48} />
              <span><strong>{solution.title}</strong><span>{solution.summary}</span></span>
              <ArrowRight aria-hidden="true" size={16} />
            </OrbitLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
