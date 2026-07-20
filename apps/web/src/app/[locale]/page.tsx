import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { HomeExperience } from "@/features/home/HomeExperience";
import { OpeningNavbar } from "@/features/home/OpeningNavbar";
import { getTranslations } from "next-intl/server";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const home = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="bg-background">
      <OpeningNavbar openLabel={home("openNavigation")}>
        <EcosatNavbar locale={locale} />
      </OpeningNavbar>
      <HomeExperience locale={locale} />
    </div>
  );
}
