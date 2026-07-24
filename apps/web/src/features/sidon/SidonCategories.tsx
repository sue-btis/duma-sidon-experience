"use client";

import { OrbitCarousel, type OrbitCarouselItem } from "@/components/ui/OrbitCarousel";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SidonCategoryPanel, type SidonCategoryContent } from "./SidonCategoryPanel";
import { sidonCategories, type SidonCategorySlug } from "./sidonCategoryData";
import styles from "./sidon.module.css";

type Props = Readonly<{
  categories: Record<SidonCategorySlug, SidonCategoryContent>;
  closeLabel: string;
  initialCategory?: SidonCategorySlug;
  instructions: string;
  locale: "es" | "en";
  modulesLabel: string;
  nextLabel: string;
  previousLabel: string;
  solvesLabel: string;
}>;

export function SidonCategories({ categories, closeLabel, initialCategory, instructions, locale, modulesLabel, nextLabel, previousLabel, solvesLabel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const openedFromLandingRef = useRef(!initialCategory);
  const [selectedSlug, setSelectedSlug] = useState<SidonCategorySlug | null>(initialCategory ?? null);
  const selectedCategory = sidonCategories.find((category) => category.slug === selectedSlug);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedSlug) dialog.showModal();
    else if (dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [selectedSlug]);

  useEffect(() => {
    if (initialCategory) document.getElementById("sidon-categories")?.scrollIntoView({ block: "center" });
  }, [initialCategory]);

  useEffect(() => {
    function handlePopState() {
      const slug = window.location.pathname.split("/").filter(Boolean).at(-1);
      setSelectedSlug(sidonCategories.some((category) => category.slug === slug) ? slug as SidonCategorySlug : null);
    }

    window.addEventListener("popstate", handlePopState);
    return () => { window.removeEventListener("popstate", handlePopState); };
  }, []);

  function closeCategory() {
    if (openedFromLandingRef.current) window.history.back();
    else window.location.assign(`/${locale}/sidon/`);
  }

  const items: readonly OrbitCarouselItem[] = sidonCategories.map((category) => ({ href: `/${locale}/sidon/${category.slug}/`, id: category.slug, image: category.carouselImage, title: categories[category.slug].name }));

  return <><OrbitCarousel accentColor="var(--sidon)" ariaLabel={instructions} deepColor="var(--sidon-deep)" id="sidon-categories" instructions={instructions} items={items} locale={locale} nextLabel={nextLabel} onItemActivate={(item, trigger) => { triggerRef.current = trigger; window.history.pushState(null, "", item.href); setSelectedSlug(item.id as SidonCategorySlug); }} previousLabel={previousLabel} />
    <dialog aria-label={selectedCategory ? categories[selectedCategory.slug].name : undefined} className={styles.categoryDialog} onCancel={(event) => { event.preventDefault(); closeCategory(); }} onClick={(event) => { if (event.target === event.currentTarget) closeCategory(); }} ref={dialogRef}>
      <button aria-label={closeLabel} className={styles.categoryClose} onClick={closeCategory} type="button"><X aria-hidden="true" size={20} /></button>
      {selectedCategory ? <SidonCategoryPanel category={selectedCategory} content={categories[selectedCategory.slug]} key={selectedCategory.slug} locale={locale} modulesLabel={modulesLabel} solvesLabel={solvesLabel} /> : null}
    </dialog></>;
}
