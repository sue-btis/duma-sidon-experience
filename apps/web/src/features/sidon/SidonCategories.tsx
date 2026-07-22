"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type PointerEvent, useRef, useState } from "react";

import { getOrbitCardLayout } from "@/features/integration/orbitMath";

import { sidonCategories, type SidonCategorySlug } from "./sidonCategoryData";
import styles from "./sidon.module.css";

type CategoryContent = Readonly<{ modules: Record<string, Readonly<{ name: string }>>; name: string }>;

type Props = Readonly<{
  categories: Record<SidonCategorySlug, CategoryContent>;
  instructions: string;
  locale: "es" | "en";
  modulesLabel: string;
  nextLabel: string;
  previousLabel: string;
}>;

export function SidonCategories({ categories, instructions, locale, modulesLabel, nextLabel, previousLabel }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const active = sidonCategories[activeIndex];

  function select(index: number) {
    setActiveIndex((index + sidonCategories.length) % sidonCategories.length);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    pointerStart.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 32) select(activeIndex + (distance < 0 ? 1 : -1));
  }

  return (
    <section aria-describedby="sidon-category-instructions" className={styles.categoryCarousel} onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); select(activeIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); select(activeIndex + 1); }
    }} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onWheel={(event) => { const direction = Math.sign(event.deltaY || event.deltaX); if (direction) select(activeIndex + direction); }} tabIndex={0}>
      <p className={styles.srOnly} id="sidon-category-instructions">{instructions}</p>
      <div className={styles.categoryOrbit}>
        {sidonCategories.map((category, index) => {
          const content = categories[category.slug];
          const layout = getOrbitCardLayout(index, sidonCategories.length, -activeIndex * ((Math.PI * 2) / sidonCategories.length), { radiusX: 310, radiusZ: 210 });
          const isActive = category.slug === active.slug;

          return <Link aria-current={isActive ? "true" : undefined} className={styles.categoryCard} data-active={isActive || undefined} href={`/${locale}/${category.slug}/`} key={category.slug} onClick={(event) => { if (!isActive) { event.preventDefault(); select(index); } }} style={{ filter: `blur(${layout.blur}px)`, opacity: layout.opacity, transform: `translate3d(calc(-50% + ${layout.x}px), -50%, ${layout.z}px) rotateY(${layout.rotateY}deg) scale(${layout.scale})`, zIndex: layout.zIndex }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Image alt="" height={120} src={category.icon} unoptimized width={120} />
            <strong>{content.name}</strong>
            <small>{modulesLabel}</small>
            <em>{category.modules.map((module) => content.modules[module].name).join(" · ")}</em>
          </Link>;
        })}
      </div>
      <nav aria-label={instructions} className={styles.categoryNavigator}><ol>{sidonCategories.map((category, index) => <li key={category.slug}><button aria-current={index === activeIndex ? "true" : undefined} data-distance={Math.min(2, Math.abs(index - activeIndex))} onClick={() => select(index)} type="button">{categories[category.slug].name}</button></li>)}</ol></nav>
      <div className={styles.categoryControls}>
        <button aria-label={previousLabel} onClick={() => select(activeIndex - 1)} type="button"><ArrowLeft aria-hidden="true" size={18} /></button>
        <p>{String(activeIndex + 1).padStart(2, "0")} / {String(sidonCategories.length).padStart(2, "0")}<strong>{categories[active.slug].name}</strong></p>
        <button aria-label={nextLabel} onClick={() => select(activeIndex + 1)} type="button"><ArrowRight aria-hidden="true" size={18} /></button>
      </div>
      <div className={styles.mobileCategories}>{sidonCategories.map((category, index) => <Link href={`/${locale}/${category.slug}/`} key={category.slug}><span>{String(index + 1).padStart(2, "0")}</span><Image alt="" height={72} src={category.icon} unoptimized width={72} /><strong>{categories[category.slug].name}</strong><ArrowRight aria-hidden="true" size={16} /></Link>)}</div>
    </section>
  );
}
