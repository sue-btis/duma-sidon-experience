import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { SidonConversation } from "@/features/sidon/SidonConversation";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en" }> }>;

export default async function SidonConversationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <div className="px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" path="/sidon/conversemos/" /></div>
      <SidonConversation locale={locale} />
    </div>
  );
}
