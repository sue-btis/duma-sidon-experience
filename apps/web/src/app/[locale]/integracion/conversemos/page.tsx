import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { IntegrationConversation } from "@/features/integration/IntegrationConversation";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en" }> }>;

export default async function IntegrationConversationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <div className="px-4 pt-5 sm:px-6">
        <EcosatNavbar locale={locale} page="integracion" path="/integracion/conversemos/" />
      </div>
      <IntegrationConversation locale={locale} />
    </div>
  );
}
