import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function IntegrationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <EcosatNavbar locale={locale} page="integracion" />
      <main />
    </div>
  );
}
