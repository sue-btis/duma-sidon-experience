import Link from "next/link";
import { getTranslations } from "next-intl/server";

import styles from "./integration.module.css";

export async function IntegrationConversation({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations("integration");

  return (
    <main className={styles.page}>
      <section className={styles.conversation}>
        <p className={styles.worldLabel}>{t("label")}</p>
        <h1>{t("conversationTitle")}</h1>
        <p>{t("conversationCopy")}</p>
        <Link className={styles.backLink} href={`/${locale}/integracion/`}>{t("returnToIntegration")}</Link>
      </section>
    </main>
  );
}
