import type { AbstractIntlMessages } from "next-intl";

import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];
type MessageModule = { default: AbstractIntlMessages };

const modules: Record<Locale, Record<string, () => Promise<MessageModule>>> = {
  es: {
    agentPet: () => import("./messages/es/agent-pet.json"),
    common: () => import("./messages/es/common.json"),
    home: () => import("./messages/es/home.json"),
    integration: () => import("./messages/es/integration.json") as unknown as Promise<MessageModule>,
    sidon: () => import("./messages/es/sidon.json") as unknown as Promise<MessageModule>,
    navigation: () => import("./messages/es/navigation.json"),
    platform: () => import("./messages/es/platform.json"),
    "modules/shared": () => import("./messages/es/modules/shared.json"),
  },
  en: {
    agentPet: () => import("./messages/en/agent-pet.json"),
    common: () => import("./messages/en/common.json"),
    home: () => import("./messages/en/home.json"),
    integration: () => import("./messages/en/integration.json") as unknown as Promise<MessageModule>,
    sidon: () => import("./messages/en/sidon.json") as unknown as Promise<MessageModule>,
    navigation: () => import("./messages/en/navigation.json"),
    platform: () => import("./messages/en/platform.json"),
    "modules/shared": () => import("./messages/en/modules/shared.json"),
  },
};

export async function getMessages(locale: Locale) {
  const entries = await Promise.all(
    Object.entries(modules[locale]).map(async ([namespace, load]) => [
      namespace,
      (await load()).default,
    ]),
  );

  return Object.fromEntries(entries) as AbstractIntlMessages;
}
