import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { TravesiaExperience } from "@/features/sidon/TravesiaExperience";

export default async function TravesiaPage({ params }: Readonly<{ params: Promise<{ locale: "es" | "en" }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="travesia" path="/sidon/travesia/" /></div><TravesiaExperience locale={locale} /></div>;
}
