import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { IntegrationOrbit } from "./IntegrationOrbit";
import { OrbitLink } from "./OrbitLink";
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
        <IntegrationOrbit activeNode={solution}><section className={styles.solutionHero}>
          <OrbitLink className={styles.backLink} href={`/${locale}/integracion/`}>{t("returnToIntegration")}</OrbitLink>
          <Image alt="" className={styles.solutionIcon} height={180} src={current.icon} unoptimized width={180} />
          <p className={styles.worldLabel}>{t("label")}</p>
          <h1>{t(current.key)}</h1>
          <OrbitLink className={styles.primaryLink} href={`/${locale}/integracion/conversemos/?source_path=%2Fintegracion&world=integracion&interest=proyecto-integracion`}>
            {t("conversation")}<ArrowRight aria-hidden="true" size={18} />
          </OrbitLink>
        </section>
        <SolutionDetails solution={current} translate={t} /></IntegrationOrbit>
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
        <OrbitLink className={styles.primaryLink} href={`/${locale}/integracion/conversemos/?source_path=%2Fintegracion&world=integracion&interest=proyecto-integracion`}>
          {t("conversation")}<ArrowRight aria-hidden="true" size={18} />
        </OrbitLink>
      </section>
      <section aria-labelledby="integration-solutions" className={styles.catalog}>
          <h2 id="integration-solutions">{t("solutions")}</h2>
          <ul className={styles.solutionList}>
            {solutions.map((item) => (
              <li key={item.slug}>
                <OrbitLink className={styles.solutionLink} href={`/${locale}/${item.slug}/`} node={item.slug}>
                  <Image alt="" height={84} src={item.icon} unoptimized width={84} />
                  <span>{t(item.key)}</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </OrbitLink>
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
            <OrbitLink ariaCurrent={item.slug === current ? "page" : undefined} href={`/${locale}/${item.slug}/`} node={item.slug}>
              {translate(item.key)}
            </OrbitLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SolutionDetails({ solution, translate }: Readonly<{ solution: (typeof solutions)[number]; translate: Awaited<ReturnType<typeof getTranslations>> }>) {
  const content = `solution.${solution.slug}`;
  const list = (key: string) => translate.raw(`${content}.${key}`) as string[];

  return (
    <div className={styles.details}>
      <section><h2>{translate("definition")}</h2><p>{translate(`${content}.definition`)}</p></section>
      <section><h2>{translate(solution.emphasis)}</h2><ul className={styles.pills}>{list("emphasis").map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2>{translate("applications")}</h2><ul>{list("applications").map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2>{translate(solution.detail)}</h2><ul>{list("details").map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2>{translate("projectCriteria")}</h2><p>{translate(`${content}.note`)}</p></section>
    </div>
  );
}
