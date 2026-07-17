import type { AbstractIntlMessages } from "next-intl";

import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];
type MessageModule = { default: AbstractIntlMessages };

const modules: Record<Locale, Record<string, () => Promise<MessageModule>>> = {
  es: {
    common: () => import("./messages/es/common.json"),
    navigation: () => import("./messages/es/navigation.json"),
    platform: () => import("./messages/es/platform.json"),
    "modules/shared": () => import("./messages/es/modules/shared.json"),
  },
  en: {
    common: () => import("./messages/en/common.json"),
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
