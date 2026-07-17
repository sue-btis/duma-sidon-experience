import { getTranslations, setRequestLocale } from "next-intl/server";

import { AgentPetDemo } from "@/features/agent-pet/AgentPetDemo";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function PetPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("agentPet");

  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <AgentPetDemo
        labels={{
          title: t("title"),
          description: t("description"),
          automatic: t("automatic"),
          manual: t("manual"),
          states: {
            idle: t("states.idle"),
            working: t("states.working"),
            waiting: t("states.waiting"),
            success: t("states.success"),
            error: t("states.error"),
          },
        }}
      />
    </main>
  );
}
