"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  type CSSProperties,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { getNearestFrontIndex, getOrbitCardLayout, getSnapRotation } from "./orbitCarouselMath";
import styles from "./orbit-carousel.module.css";

export type OrbitCarouselItem = Readonly<{
  action: string;
  description: string;
  href: string;
  icon: string;
  id: string;
  title: string;
}>;

type Props = Readonly<{
  accentColor: string;
  ariaLabel: string;
  deepColor: string;
  id: string;
  instructions: string;
  items: readonly OrbitCarouselItem[];
  nextLabel: string;
  previousLabel: string;
}>;

const AUTOPLAY_DELAY = 1100;

export function OrbitCarousel({ accentColor, ariaLabel, deepColor, id, instructions, items, nextLabel, previousLabel }: Props) {
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
    targetRotationRef.current = getSnapRotation(index, items.length, currentRotationRef.current);
  }

  function rotateBy(amount: number) {
    rotateTo((activeIndexRef.current + amount + items.length) % items.length);
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
    if (pointerRef.current.moved) lastInteractionRef.current = 0;
    else noteInteraction();
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
      dimensions = width < 640
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

      if (!paused && !pointerRef.current.dragging && time - lastInteractionRef.current > AUTOPLAY_DELAY) targetRotationRef.current -= deltaTime * 0.0001;
      if (!paused && !pointerRef.current.dragging) {
        targetRotationRef.current += velocityRef.current;
        velocityRef.current *= Math.pow(0.91, deltaTime / 16.67);
      }

      const smoothing = 1 - Math.pow(0.925, deltaTime / 16.67);
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * smoothing;

      for (let index = 0; index < items.length; index += 1) {
        const card = cardRefs.current[index];
        if (!card) continue;

        const layout = getOrbitCardLayout(index, items.length, currentRotationRef.current, dimensions);
        card.style.opacity = layout.opacity.toFixed(3);
        card.style.zIndex = String(layout.zIndex);
        card.style.filter = `blur(${layout.blur.toFixed(2)}px)`;
        card.style.transform = `translate3d(${layout.x.toFixed(2)}px, ${layout.y}px, ${layout.z.toFixed(2)}px) rotateY(${layout.rotateY.toFixed(2)}deg) scale(${layout.scale.toFixed(3)}) translate(-50%, -50%)`;
      }

      const nextActiveIndex = getNearestFrontIndex(currentRotationRef.current, items.length);
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
  }, [items.length]);

  const activeItem = items[activeIndex];

  return (
    <section
      aria-describedby={`${id}-instructions`}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={styles.carousel}
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
      style={{ "--orbit-accent": accentColor, "--orbit-deep": deepColor } as CSSProperties}
      tabIndex={0}
    >
      <p className={styles.srOnly} id={`${id}-instructions`}>{instructions}</p>
      <div className={styles.track}>
        {items.map((item, index) => (
          <Link
            aria-current={index === activeIndex ? "true" : undefined}
            className={styles.card}
            href={item.href}
            key={item.id}
            onClick={(event) => {
              if (pointerRef.current.moved) {
                event.preventDefault();
                pointerRef.current.moved = false;
                lastInteractionRef.current = 0;
              } else if (index !== activeIndexRef.current) {
                event.preventDefault();
                rotateTo(index);
              }
            }}
            ref={(element) => { cardRefs.current[index] = element; }}
            tabIndex={index === 0 ? 0 : -1}
          >
            <span className={styles.cardTop}><span>{String(index + 1).padStart(2, "0")}</span><Image alt="" height={84} src={item.icon} unoptimized width={84} /></span>
            <span><strong>{item.title}</strong><span className={styles.description}>{item.description}</span><span className={styles.action}>{item.action}<ArrowRight aria-hidden="true" size={16} /></span></span>
          </Link>
        ))}
      </div>
      <nav aria-label={ariaLabel} className={styles.navigator}>
        <ol>{items.map((item, index) => <li key={item.id}><button aria-current={index === activeIndex ? "true" : undefined} data-distance={Math.min(3, Math.abs(index - activeIndex))} onClick={() => rotateTo(index)} type="button">{item.title}</button></li>)}</ol>
      </nav>
      <div className={styles.hud}>
        <button aria-label={previousLabel} onClick={() => rotateBy(-1)} type="button"><ArrowLeft aria-hidden="true" size={18} /></button>
        <p aria-atomic="true" aria-live="polite"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>{activeItem.title}</p>
        <button aria-label={nextLabel} onClick={() => rotateBy(1)} type="button"><ArrowRight aria-hidden="true" size={18} /></button>
      </div>
      <ul className={styles.reducedList}>{items.map((item) => <li key={item.id}><Link href={item.href}><Image alt="" height={48} src={item.icon} unoptimized width={48} /><span><strong>{item.title}</strong><span>{item.description}</span></span><ArrowRight aria-hidden="true" size={16} /></Link></li>)}</ul>
    </section>
  );
}
