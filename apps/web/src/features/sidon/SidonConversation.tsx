import { getTranslations } from "next-intl/server";

import { ConversationExperience } from "@/features/conversation/ConversationExperience";

export async function SidonConversation({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations("sidon");

  return <ConversationExperience backLabel={t("returnToSidon")} backPath={`/${locale}/sidon/`} copy={t("conversationLead")} label={t("eyebrow")} title={t("conversationTitle")} world="sidon" />;
}
