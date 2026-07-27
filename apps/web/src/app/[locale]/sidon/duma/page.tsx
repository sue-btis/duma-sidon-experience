import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { DumaExperience } from "@/features/sidon/DumaExperience";

export default async function DumaPage({ params }: Readonly<{ params: Promise<{ locale: "es" | "en" }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" /></div><DumaExperience locale={locale} /></div>;
}
