import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const common = await getTranslations("common");
  const navigation = await getTranslations("navigation");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-12">
      <section className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          {common("brand")}
        </h1>
        <nav aria-label={navigation("language")} className="flex gap-2">
          <Link className={buttonVariants({ variant: locale === "es" ? "default" : "outline" })} href="/es/">
            {navigation("es")}
          </Link>
          <Link className={buttonVariants({ variant: locale === "en" ? "default" : "outline" })} href="/en/">
            {navigation("en")}
          </Link>
        </nav>
      </section>
    </main>
  );
}
