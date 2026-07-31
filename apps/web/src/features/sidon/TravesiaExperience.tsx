import { getTranslations } from "next-intl/server";

export async function TravesiaExperience({ locale }: Readonly<{ locale: "es" | "en" }>) {
  const t = await getTranslations({ locale, namespace: "travesia" });

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-44 sm:px-6">
      <h1 className="max-w-[12ch] text-5xl leading-[.95] tracking-[-.035em] text-sidon-deep sm:text-7xl">{t("title")}</h1>
      <section className="mt-12 grid gap-4 md:grid-cols-2" aria-label={t("sectionLabel")}>
        <div className="min-h-72 border border-line bg-surface-alt p-6 text-sidon-deep">{t("contentLabel")}</div>
        <div className="min-h-72 border border-line bg-surface-alt p-6 text-sidon-deep">{t("mapLabel")}</div>
      </section>
    </main>
  );
}
