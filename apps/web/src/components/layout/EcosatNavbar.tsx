import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NavbarCategoryList } from "@/components/layout/NavbarCategoryList";
import { getLocalizedCarouselImage } from "@/components/ui/orbitCarouselImage";
import { solutions } from "@/features/integration/solutions";
import { sidonCategories } from "@/features/sidon/sidonCategoryData";

type Props = Readonly<{
  locale: "es" | "en";
  page?: "home" | "integracion" | "sidon";
  path?: string;
}>;

export async function EcosatNavbar({ locale, page = "home", path }: Props) {
  const common = await getTranslations("common");
  const integration = await getTranslations("integration");
  const navigation = await getTranslations("navigation");
  const sidon = await getTranslations("sidon");
  const pagePath = path ?? (page === "home" ? "/" : `/${page}/`);
  const worldHoverClass = (world: "home" | "integracion" | "sidon") => world === "integracion" ? "hover:bg-[color-mix(in_srgb,var(--integration)_12%,var(--surface))]" : world === "sidon" ? "hover:bg-[color-mix(in_srgb,var(--sidon)_12%,var(--surface))]" : "hover:bg-[color-mix(in_srgb,var(--ecosat)_12%,var(--surface))]";
  const dropdownHeaderClass = (world: "integracion" | "sidon") => world === "integracion" ? "bg-[color-mix(in_srgb,var(--integration)_18%,var(--surface))] text-integration-deep hover:bg-[color-mix(in_srgb,var(--integration)_26%,var(--surface))]" : "bg-[color-mix(in_srgb,var(--sidon)_18%,var(--surface))] text-sidon-deep hover:bg-[color-mix(in_srgb,var(--sidon)_26%,var(--surface))]";

  const worldClass = (world: "home" | "integracion" | "sidon") => {
    const isActive = page === world;
    const activeColor = world === "integracion" ? "bg-integration-deep text-white" : world === "sidon" ? "bg-sidon-deep text-white" : "bg-ecosat-deep text-white";

    return `relative z-10 flex min-h-10 items-center justify-center gap-1 rounded-lg px-4 text-sm font-semibold transition-colors ${isActive ? activeColor : `text-ecosat-deep ${worldHoverClass(world)}`}`;
  };

  return (
    <header className="relative mx-auto flex min-h-[76px] w-full max-w-6xl flex-wrap items-center gap-3 rounded-xl border bg-card px-3 sm:flex-nowrap sm:gap-5 sm:px-5">
      <Link aria-label={common("brand")} className="rounded-lg bg-card px-2 py-1" href={`/${locale}/`}>
        <Image
          alt=""
          className="h-12 w-auto"
          height={145}
          priority
          src="/home/worlds/ecosat-horizontal.png"
          unoptimized
          width={149}
        />
      </Link>
      <span aria-hidden="true" className="h-7 w-px bg-border" />
      <nav aria-label={navigation("primary")} className="order-4 flex w-full items-start justify-between gap-1 sm:order-none sm:w-auto sm:justify-start">
        <Link
          aria-current={page === "home" ? "page" : undefined}
          className={worldClass("home")}
          href={`/${locale}/`}
        >
          {navigation("home")}
        </Link>
        {([
          { items: solutions.map((solution) => ({ children: [], href: `/integracion/${solution.slug}/`, icon: getLocalizedCarouselImage(solution.icon, locale), label: integration(solution.key) })), key: "integracion", label: navigation("integracion"), logo: "/home/worlds/integracion.png", menuClass: "left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0" },
          { items: sidonCategories.map((category) => ({ children: category.modules.map((module) => ({ href: `/sidon/${category.slug}/${module.slug}/`, icon: module.icon, label: sidon(`categories.${category.slug}.modules.${module.key}.name`) })), href: `/sidon/${category.slug}/`, label: sidon(`categories.${category.slug}.name`) })), key: "sidon", label: navigation("sidon"), logo: "/home/worlds/sidon.png", menuClass: "left-1/2 -translate-x-1/2", supplement: { href: "/sidon/duma/", icon: "/home/worlds/dumaAiLetter.png", label: "Duma" } },
        ] as const).map(({ items, key, label, logo, menuClass, ...menuProps }) => (
          <details className="group static" key={key} name="primary-navigation">
            <summary className={`${worldClass(key)} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
              <span className="flex items-center gap-1">
                {label}
                <svg aria-hidden="true" className="size-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className={`absolute top-full z-20 mt-1 w-[min(20rem,calc(100vw-2rem))] rounded-lg border bg-popover p-1 text-popover-foreground shadow-sm has-[.navbar-logo-list]:w-[min(38rem,calc(100vw-2rem))] has-[.navbar-module-explorer]:w-[min(48rem,calc(100vw-2rem))] ${menuClass}`}>
              <Link className={`flex min-h-12 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors ${dropdownHeaderClass(key)}`} href={`/${locale}/${key}/`}>
                <Image alt="" className="size-9 object-contain" height={104} src={logo} unoptimized width={104} />
                {label}
              </Link>
              <NavbarCategoryList hoverClass={worldHoverClass(key)} items={items} locale={locale} {...menuProps} />
            </div>
          </details>
        ))}
      </nav>
      <div className="min-w-0 flex-1" />
      <nav aria-label={navigation("language")} className="flex items-center gap-1 rounded-lg bg-card p-1 text-sm font-semibold text-ecosat-deep">
        <Link
          aria-current={locale === "es" ? "page" : undefined}
          className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-md px-1 transition-colors ${locale === "es" ? "bg-ecosat-deep text-white" : "hover:bg-[color-mix(in_srgb,var(--ecosat)_9%,var(--surface))]"}`}
          href={`/es${pagePath}`}
        >
          {navigation("es")}
        </Link>
        <Link
          aria-current={locale === "en" ? "page" : undefined}
          className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-md px-1 transition-colors ${locale === "en" ? "bg-ecosat-deep text-white" : "hover:bg-[color-mix(in_srgb,var(--ecosat)_9%,var(--surface))]"}`}
          href={`/en${pagePath}`}
        >
          {navigation("en")}
        </Link>
      </nav>
    </header>
  );
}
