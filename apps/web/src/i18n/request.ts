import { getRequestConfig } from "next-intl/server";

import { getMessages } from "@/i18n/messages";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = routing.locales.includes(requestedLocale as "es" | "en")
    ? (requestedLocale as "es" | "en")
    : routing.defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});
