"use client";

import { OrbitCarousel } from "@/components/ui/OrbitCarousel";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { sidonCategories, type SidonCategorySlug } from "./sidonCategoryData";
import { SidonCategoryPanel, type SidonCategoryContent } from "./SidonCategoryPanel";
import styles from "./sidon.module.css";

type Props = Readonly<{
  categories: Record<SidonCategorySlug, SidonCategoryContent>;
  closeLabel: string;
  exploreLabel: string;
  instructions: string;
  locale: "es" | "en";
  modulesLabel: string;
  nextLabel: string;
  previousLabel: string;
  solvesLabel: string;
}>;

export function SidonCategories({ categories, closeLabel, exploreLabel, instructions, locale, modulesLabel, nextLabel, previousLabel, solvesLabel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<SidonCategorySlug | null>(null);
  const selectedCategory = sidonCategories.find((category) => category.slug === selectedSlug);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedSlug) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [selectedSlug]);

  useEffect(() => {
    function handlePopState() {
      const slug = window.location.pathname.split("/").filter(Boolean).at(-1);
      setSelectedSlug(sidonCategories.some((category) => category.slug === slug) ? slug as SidonCategorySlug : null);
    }

    window.addEventListener("popstate", handlePopState);
    return () => { window.removeEventListener("popstate", handlePopState); };
  }, []);

  function closeCategory() {
    window.history.back();
  }

  return (
    <><OrbitCarousel
      accentColor="var(--sidon)"
      ariaLabel={instructions}
      brandIcon="/home/worlds/sidon.png"
      deepColor="var(--sidon-deep)"
      id="sidon-categories"
      instructions={instructions}
      items={sidonCategories.map((category) => {
        const content = categories[category.slug];
        return {
          action: exploreLabel,
          decorativeColor: category.decorativeColor,
          href: `/${locale}/sidon/${category.slug}/`,
          icon: category.icon,
          id: category.slug,
          modules: category.modules.map((module) => ({ icon: module.icon, name: content.modules[module.key].name })),
          modulesLabel,
          title: content.name,
        };
      })}
      nextLabel={nextLabel}
      onItemActivate={(item, trigger) => {
        triggerRef.current = trigger;
        window.history.pushState(null, "", item.href);
        setSelectedSlug(item.id as SidonCategorySlug);
      }}
      previousLabel={previousLabel}
    />
    <dialog aria-label={selectedCategory ? categories[selectedCategory.slug].name : undefined} className={styles.categoryDialog} onCancel={(event) => { event.preventDefault(); closeCategory(); }} onClick={(event) => { if (event.target === event.currentTarget) closeCategory(); }} ref={dialogRef}>
      <button aria-label={closeLabel} className={styles.categoryClose} onClick={closeCategory} type="button"><X aria-hidden="true" size={20} /></button>
      {selectedCategory ? <SidonCategoryPanel category={selectedCategory} content={categories[selectedCategory.slug]} modulesLabel={modulesLabel} solvesLabel={solvesLabel} /> : null}
    </dialog></>
  );
}
