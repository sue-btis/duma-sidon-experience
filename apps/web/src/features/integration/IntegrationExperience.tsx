import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { solutions, type SolutionSlug } from "./solutions";
import styles from "./integration.module.css";

type Props = Readonly<{ locale: "es" | "en"; solution?: SolutionSlug }>;

export async function IntegrationExperience({ locale, solution }: Props) {
  const t = await getTranslations("integration");

  if (solution) {
    const current = solutions.find((item) => item.slug === solution);

    if (!current) return null;

    return (
      <main className={styles.page}>
        <section className={styles.solutionHero}>
          <Link className={styles.backLink} href={`/${locale}/integracion/`}>{t("returnToIntegration")}</Link>
          <Image alt="" className={styles.solutionIcon} height={180} src={current.icon} unoptimized width={180} />
          <p className={styles.worldLabel}>{t("label")}</p>
          <h1>{t(current.key)}</h1>
          <Link className={styles.primaryLink} href={`/${locale}/integracion/conversemos/?source_path=%2Fintegracion&world=integracion&interest=proyecto-integracion`}>
            {t("conversation")}<ArrowRight aria-hidden="true" size={18} />
          </Link>
        </section>
        <SiblingNavigator current={solution} locale={locale} title={t("siblings")} translate={t} />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.worldLabel}>{t("label")}</p>
        <h1>{t("headline")}</h1>
        <p className={styles.lead}>{t("lead")}</p>
        <Link className={styles.primaryLink} href={`/${locale}/integracion/conversemos/?source_path=%2Fintegracion&world=integracion&interest=proyecto-integracion`}>
          {t("conversation")}<ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
      <section aria-labelledby="integration-solutions" className={styles.catalog}>
        <h2 id="integration-solutions">{t("solutions")}</h2>
        <ul className={styles.solutionList}>
          {solutions.map((item) => (
            <li key={item.slug}>
              <Link className={styles.solutionLink} href={`/${locale}/${item.slug}/`}>
                <Image alt="" height={84} src={item.icon} unoptimized width={84} />
                <span>{t(item.key)}</span>
                <ArrowRight aria-hidden="true" size={18} />
                <span className="sr-only">{t("solutionAction")}: {t(item.key)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.projectBand}>
        <div className={styles.projectNode} aria-hidden="true"><span /><span /><span /></div>
        <div>
          <h2>{t("projectTitle")}</h2>
          <p>{t("projectCopy")}</p>
        </div>
      </section>
    </main>
  );
}

type NavigatorProps = Readonly<{
  current: SolutionSlug;
  locale: "es" | "en";
  title: string;
  translate: Awaited<ReturnType<typeof getTranslations>>;
}>;

function SiblingNavigator({ current, locale, title, translate }: NavigatorProps) {
  return (
    <nav aria-label={title} className={styles.siblings}>
      <h2>{title}</h2>
      <ul>
        {solutions.map((item) => (
          <li key={item.slug}>
            <Link aria-current={item.slug === current ? "page" : undefined} href={`/${locale}/${item.slug}/`}>
              {translate(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
