import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { OrbitLink } from "./OrbitLink";
import { solutions, type SolutionSlug } from "./solutions";
import styles from "./integration.module.css";

type SolutionContent = Readonly<{
  definition: string;
  emphasis: string[];
  applications: string[];
  details: string[];
  note: string;
}>;

type Props = Readonly<{ locale: "es" | "en"; solution: SolutionSlug }>;

export async function IntegrationSolutionExperience({ locale, solution: slug }: Props) {
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) return null;

  const t = await getTranslations("integration");
  const content = t.raw(`solution.${slug}`) as SolutionContent;
  const siblings = solutions.filter((item) => item.slug !== slug);

  return (
    <main className={styles.solutionPage}>
      <section aria-labelledby="solution-title" className={`${styles.solutionSection} ${styles.solutionArrival}`}>
        <div className={styles.solutionIntroCopy}>
          <p className={styles.worldLabel}>{t("label")}</p>
          <p className={styles.solutionName}>{t(solution.key)}</p>
          <h1 id="solution-title">{t(`headlines.${slug}`)}</h1>
          <p className={styles.solutionDefinition}>{content.definition}</p>
        </div>
        <SolutionScene icon={solution.icon} iconScale={solution.iconScale} title={t(solution.key)} variant={solution.sceneVariant} />
      </section>

      <section aria-labelledby="value-title" className={`${styles.solutionSection} ${styles.valueSection}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.worldLabel}>{t("outcomes")}</p>
          <h2 id="value-title">{t(solution.key)}</h2>
        </div>
        <ol className={styles.pillarNodes}>
          {content.emphasis.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section className={`${styles.solutionSection} ${styles.operationSection}`}>
        <div aria-labelledby="applications-title" className={styles.applicationPanel}>
          <p className={styles.worldLabel}>{t("applications")}</p>
          <h2 id="applications-title">{content.definition}</h2>
          <ul className={styles.applicationList}>{content.applications.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div aria-labelledby="capabilities-title" className={styles.capabilityPanel}>
          <p className={styles.worldLabel}>{t("capabilities")}</p>
          <h2 id="capabilities-title">{t(solution.key)}</h2>
          <ol className={styles.capabilityList}>{content.details.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
        </div>
      </section>

      <section aria-labelledby="solution-conversation" className={`${styles.solutionSection} ${styles.closingSection}`}>
        <div><p className={styles.worldLabel}>{t("scope")}</p><h2>{t("projectCriteria")}</h2><p className={styles.scopeCopy}>{content.note}</p></div>
        <div><p className={styles.worldLabel}>{t("label")}</p><h2 id="solution-conversation">{t("projectTitle")}</h2><p>{t("projectCopy")}</p><OrbitLink className={styles.primaryLink} href={`/${locale}/integracion/conversemos/`}>{t("conversation")}<ArrowRight aria-hidden="true" size={18} /></OrbitLink></div>
      </section>

      <nav aria-label={t("siblings")} className={styles.siblingNavigation}>
        <p className={styles.worldLabel}>{t("siblings")}</p>
        <div>{siblings.map((item) => <OrbitLink className={styles.siblingLink} href={`/${locale}/integracion/${item.slug}/`} key={item.slug}>{t(item.key)}<ArrowRight aria-hidden="true" size={16} /></OrbitLink>)}</div>
      </nav>
    </main>
  );
}

function SolutionScene({ icon, iconScale, title, variant }: Readonly<{ icon: string; iconScale: number; title: string; variant: (typeof solutions)[number]["sceneVariant"] }>) {
  return (
    <div aria-hidden="true" className={`${styles.solutionScene} ${styles[`scene${variant[0].toUpperCase()}${variant.slice(1)}`]}`}>
      <span className={styles.orbitOne} /><span className={styles.orbitTwo} /><span className={styles.sceneBeam} /><span className={styles.sceneNodeOne} /><span className={styles.sceneNodeTwo} /><span className={styles.sceneNodeThree} />
      <Image alt="" className={styles.solutionIcon} height={160} src={icon} style={{ transform: `scale(${iconScale})` }} unoptimized width={160} />
      <p>{title}</p>
    </div>
  );
}
