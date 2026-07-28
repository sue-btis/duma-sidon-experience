import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
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

  return (
    <header className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center gap-3 rounded-xl border bg-card px-4 sm:gap-5 sm:px-7">
      <Link aria-label={common("brand")} href={`/${locale}/`}>
        <Image
          alt=""
          className="h-12 w-auto"
          height={145}
          priority
          src="/brand/ecosat-horizontal.png"
          unoptimized
          width={149}
        />
      </Link>
      <span aria-hidden="true" className="h-5 w-px bg-border" />
      <nav aria-label={navigation("primary")} className="flex min-w-0 items-center gap-1 text-sm font-medium text-ecosat-deep">
        <Link
          aria-current={page === "home" ? "page" : undefined}
          className={`inline-flex min-h-11 items-center justify-center border-b-2 px-2 transition-colors hover:text-ecosat ${page === "home" ? "border-ecosat" : "border-transparent"}`}
          href={`/${locale}/`}
        >
          {navigation("home")}
        </Link>
        {([
          { items: solutions.map((solution) => ({ children: [], href: `/integracion/${solution.slug}/`, label: integration(solution.key) })), key: "integracion", label: navigation("integracion") },
          { items: sidonCategories.map((category) => ({ children: category.modules.map((module) => ({ href: `/sidon/${category.slug}/${module.slug}/`, label: sidon(`categories.${category.slug}.modules.${module.key}.name`) })), href: `/sidon/${category.slug}/`, label: sidon(`categories.${category.slug}.name`) })), key: "sidon", label: navigation("sidon") },
        ] as const).map(({ items, key, label }) => (
          <div className="group relative" key={key}>
            <Link
              aria-current={page === key ? "page" : undefined}
              className={`flex min-h-11 items-center gap-1 border-b-2 px-2 transition-colors hover:text-ecosat ${page === key ? "border-ecosat" : "border-transparent"}`}
              href={`/${locale}/${key}/`}
            >
              {label}
              <svg aria-hidden="true" className="size-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="invisible absolute left-0 top-full z-20 w-64 translate-y-1 rounded-lg border bg-popover p-1 text-popover-foreground opacity-0 shadow-sm transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {items.map((item) => item.children.length ? (
                <div className="group/category relative" key={item.href}>
                  <Link className="flex rounded-md px-3 py-2 text-sm hover:bg-accent" href={`/${locale}${item.href}`}>
                    {item.label}
                    <svg aria-hidden="true" className="ml-auto size-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-full top-0 z-30 w-56 translate-x-1 rounded-lg border bg-popover p-1 opacity-0 shadow-sm transition-[opacity,transform,visibility] duration-150 group-hover/category:visible group-hover/category:translate-x-0 group-hover/category:opacity-100 group-focus-within/category:visible group-focus-within/category:translate-x-0 group-focus-within/category:opacity-100">
                    {item.children.map((child) => (
                      <Link className="block rounded-md px-3 py-2 text-sm hover:bg-accent" href={`/${locale}${child.href}`} key={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link className="block rounded-md px-3 py-2 text-sm hover:bg-accent" href={`/${locale}${item.href}`} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="min-w-0 flex-1" />
      <nav aria-label={navigation("language")} className="flex items-center gap-1 text-sm font-medium text-ecosat-deep">
        <Link
          aria-current={locale === "es" ? "page" : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-1 transition-colors hover:text-ecosat ${locale === "es" ? "border-ecosat" : "border-transparent"}`}
          href={`/es${pagePath}`}
        >
          {navigation("es")}
        </Link>
        <Link
          aria-current={locale === "en" ? "page" : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-1 transition-colors hover:text-ecosat ${locale === "en" ? "border-ecosat" : "border-transparent"}`}
          href={`/en${pagePath}`}
        >
          {navigation("en")}
        </Link>
      </nav>
    </header>
  );
}
