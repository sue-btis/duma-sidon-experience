import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Props = Readonly<{
  locale: "es" | "en";
}>;

export async function EcosatNavbar({ locale }: Props) {
  const common = await getTranslations("common");
  const navigation = await getTranslations("navigation");

  return (
    <header className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center gap-3 rounded-xl border bg-card px-4 sm:gap-5 sm:px-7">
      <Link aria-label={common("brand")} href={`/${locale}/`}>
        <Image
          alt=""
          className="h-auto w-[118px] sm:w-[150px]"
          height={218}
          priority
          src="/brand/ecosat-horizontal.png"
          unoptimized
          width={403}
        />
      </Link>
      <span aria-hidden="true" className="h-5 w-px bg-border" />
      <div className="min-w-0 flex-1" />
      <nav aria-label={navigation("language")} className="flex items-center gap-1 text-sm font-medium text-ecosat-deep">
        <Link
          aria-current={locale === "es" ? "page" : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-1 transition-colors hover:text-ecosat ${locale === "es" ? "border-ecosat" : "border-transparent"}`}
          href="/es/"
        >
          {navigation("es")}
        </Link>
        <Link
          aria-current={locale === "en" ? "page" : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-1 transition-colors hover:text-ecosat ${locale === "en" ? "border-ecosat" : "border-transparent"}`}
          href="/en/"
        >
          {navigation("en")}
        </Link>
      </nav>
    </header>
  );
}
