import { getTranslations, setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { DumaGameFrame } from "@/features/sidon/DumaGameFrame";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en" }> }>;

export const dynamicParams = false;

export function generateStaticParams() { return ["es", "en"].map((locale) => ({ locale })); }

export default async function SenseGamePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sidon" });
  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" path="/sidon/monitoreo/sense/juego/" /></div><DumaGameFrame game="sense" src="/games/sense-duma/index.html" title={t("dumaGame.invitationTitle")} /></div>;
}
