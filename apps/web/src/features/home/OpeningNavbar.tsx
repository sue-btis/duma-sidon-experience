"use client";

import { Menu } from "lucide-react";
import { type FocusEvent, type ReactNode, useEffect, useState } from "react";

type Props = Readonly<{
  children: ReactNode;
  openLabel: string;
}>;

export function OpeningNavbar({ children, openLabel }: Props) {
  const [isOpening, setIsOpening] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const isVisible = !isOpening || isExpanded;

  useEffect(() => {
    const cover = document.querySelector<HTMLElement>("#portada");
    if (!cover) return;

    const update = () => {
      const nextIsOpening = window.scrollY < cover.offsetTop + cover.offsetHeight - 1;
      setIsOpening(nextIsOpening);
      if (!nextIsOpening) setIsExpanded(false);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsExpanded(false);
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"
      onBlur={handleBlur}
      onFocus={() => setIsExpanded(true)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isOpening && (
        <button
          aria-controls="ecosat-navbar"
          aria-expanded={isExpanded}
          aria-label={openLabel}
          className="absolute right-4 top-5 inline-flex size-11 items-center justify-center rounded-full border bg-card text-ecosat-deep shadow-sm sm:right-6"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          type="button"
        >
          <Menu aria-hidden="true" />
        </button>
      )}
      <div
        aria-hidden={!isVisible}
        className={`transition-all duration-200 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"}`}
        id="ecosat-navbar"
        inert={!isVisible}
      >
        {children}
      </div>
    </div>
  );
}
