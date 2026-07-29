"use client";

import Link from "next/link";
import { useState } from "react";

type Item = Readonly<{
  children: readonly Readonly<{ href: string; label: string }>[];
  href: string;
  label: string;
}>;

type Props = Readonly<{
  hoverClass: string;
  items: readonly Item[];
  locale: "es" | "en";
}>;

export function NavbarCategoryList({ hoverClass, items, locale }: Props) {
  const [expandedHref, setExpandedHref] = useState<string | null>(null);

  return items.map((item) => {
    const isExpanded = expandedHref === item.href;
    const panelId = `navbar-category-${item.href.replaceAll("/", "-")}`;
    const action = locale === "es" ? (isExpanded ? "Contraer" : "Expandir") : (isExpanded ? "Collapse" : "Expand");

    return (
      <div className="border-t border-border py-1 first:border-t-0" key={item.href}>
        <div className="flex items-center">
          <Link className={`flex min-h-11 min-w-0 flex-1 items-center rounded-md px-3 text-sm ${hoverClass}`} href={`/${locale}${item.href}`}>
            {item.label}
          </Link>
          {item.children.length > 0 ? (
            <button
              aria-controls={panelId}
              aria-label={`${action} ${item.label}`}
              aria-expanded={isExpanded}
              className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md ${hoverClass}`}
              onClick={() => setExpandedHref(isExpanded ? null : item.href)}
              type="button"
            >
              <svg aria-hidden="true" className={`size-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          ) : null}
        </div>
        {isExpanded ? (
          <div className="border-t border-border py-1" id={panelId}>
            {item.children.map((child) => (
              <Link className={`flex min-h-11 items-center rounded-md px-3 pl-9 text-sm ${hoverClass}`} href={`/${locale}${child.href}`} key={child.href}>
                {child.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  });
}
