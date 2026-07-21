import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { IntegrationExperience } from "@/features/integration/IntegrationExperience";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function IntegrationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <div className="px-4 pt-5 sm:px-6">
        <EcosatNavbar locale={locale} page="integracion" />
      </div>
      <IntegrationExperience locale={locale} />
    </div>
  );
}
