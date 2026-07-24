import { getTranslations } from "next-intl/server";

import { ConversationExperience } from "@/features/conversation/ConversationExperience";

export async function IntegrationConversation({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations("integration");

  return (
    <ConversationExperience backLabel={t("returnToIntegration")} backPath={`/${locale}/integracion/`} copy={t("conversationCopy")} label={t("label")} title={t("conversationTitle")} world="integration" />
  );
}
