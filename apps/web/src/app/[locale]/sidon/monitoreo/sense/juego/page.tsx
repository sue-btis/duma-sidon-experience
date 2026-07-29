import { getTranslations, setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en" }> }>;

export const dynamicParams = false;

export function generateStaticParams() { return ["es", "en"].map((locale) => ({ locale })); }

export default async function SenseGamePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sidon" });
  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" path="/sidon/monitoreo/sense/juego/" /></div><iframe className="h-svh w-full border-0 pt-20" sandbox="allow-scripts" src="/games/sense-duma/index.html" title={t("dumaGame.invitationTitle")} /></div>;
}
