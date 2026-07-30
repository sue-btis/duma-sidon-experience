"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Item = Readonly<{
  children: readonly Readonly<{ href: string; icon?: string; label: string }>[];
  href: string;
  icon?: string;
  label: string;
}>;

type Props = Readonly<{
  hoverClass: string;
  items: readonly Item[];
  locale: "es" | "en";
  supplement?: Readonly<{ href: string; icon: string; label: string }>;
}>;

export function NavbarCategoryList({ hoverClass, items, locale, supplement }: Props) {
  const hasModuleExplorer = items.some((item) => item.children.some((child) => child.icon));
  const hasLogoList = items.some((item) => item.icon);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");

  if (hasModuleExplorer) {
    const activeItem = items.find((item) => item.href === activeHref) ?? items[0];

    return (
      <div className="navbar-module-explorer grid md:grid-cols-[minmax(12rem,.7fr)_minmax(0,1.3fr)]">
        <div className="border-b border-border p-1 md:border-b-0 md:border-r">
          {items.map((item) => (
            <button
              aria-current={item.href === activeItem?.href ? "true" : undefined}
              className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm font-semibold transition-colors ${item.href === activeItem?.href ? "bg-[color-mix(in_srgb,var(--sidon)_12%,var(--surface))] text-sidon-deep" : hoverClass}`}
              key={item.href}
              onClick={() => setActiveHref(item.href)}
              type="button"
            >
              {item.label}
              <svg aria-hidden="true" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
        {activeItem ? (
          <section aria-label={activeItem.label} className="p-3">
            <Link
              className="flex min-h-10 items-center justify-between rounded-md px-2 text-sm font-semibold text-sidon-deep hover:bg-[color-mix(in_srgb,var(--sidon)_8%,var(--surface))]"
              href={`/${locale}${activeItem.href}`}
            >
              {activeItem.label}
              <span className="text-xs font-medium">{locale === "es" ? "Ver categoría" : "View category"}</span>
            </Link>
            <div className="mt-2 grid gap-1 sm:grid-cols-2">
              {activeItem.children.map((child) => (
                <Link
                  className="flex min-h-16 items-center gap-3 rounded-md p-2 text-sm text-foreground hover:bg-[color-mix(in_srgb,var(--sidon)_8%,var(--surface))]"
                  href={`/${locale}${child.href}`}
                  key={child.href}
                >
                  {child.icon ? <Image alt="" className="size-10 shrink-0 object-contain" height={40} src={child.icon} unoptimized width={40} /> : null}
                  <span className="font-semibold">{child.label}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        {supplement ? (
          <Link
            className="col-span-full mt-1 flex min-h-16 items-center gap-3 rounded-md bg-[color-mix(in_srgb,var(--sidon)_8%,var(--surface))] p-3 text-foreground transition-colors hover:bg-[color-mix(in_srgb,var(--sidon)_14%,var(--surface))]"
            href={`/${locale}${supplement.href}`}
          >
            <Image alt="" className="size-10 shrink-0 object-contain" height={40} src={supplement.icon} unoptimized width={40} />
            <span className="text-sm font-semibold text-sidon-deep">{supplement.label}</span>
          </Link>
        ) : null}
      </div>
    );
  }

  if (hasLogoList) {
    return (
      <div className="navbar-logo-list grid gap-1 p-1 sm:grid-cols-2">
        {items.map((item) => (
          <Link className={`flex min-h-16 items-center gap-3 rounded-md p-2 text-sm font-semibold ${hoverClass}`} href={`/${locale}${item.href}`} key={item.href}>
            {item.icon ? <Image alt="" className="size-10 shrink-0 object-contain" height={40} src={item.icon} unoptimized width={40} /> : null}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  return items.map((item, index) => {
    const isExpanded = activeHref === item.href;
    const panelId = `navbar-category-${item.href.replaceAll("/", "-")}`;
    const action = locale === "es" ? (isExpanded ? "Contraer" : "Expandir") : (isExpanded ? "Collapse" : "Expand");

    return (
      <div className={`py-1 ${index > 0 ? "border-t border-border" : ""}`} key={item.href}>
        <div className="flex items-center">
          <Link className={`flex min-h-11 min-w-0 flex-1 items-center rounded-md px-3 text-sm ${hoverClass}`} href={`/${locale}${item.href}`}>
            {item.label}
          </Link>
          {item.children.length > 0 ? (
            <button aria-controls={panelId} aria-label={`${action} ${item.label}`} aria-expanded={isExpanded} className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md ${hoverClass}`} onClick={() => setActiveHref(isExpanded ? "" : item.href)} type="button">
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
