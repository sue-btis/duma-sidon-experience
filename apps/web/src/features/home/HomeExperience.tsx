import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Building2,
  CookingPot,
  Factory,
  Hotel,
  Landmark,
  Store,
  Truck,
} from "lucide-react";

import { CoreOpening } from "./CoreOpening";
import { CompanyEvolution } from "./CompanyEvolution";
import { HomeSceneController } from "./HomeSceneController";
import { WorldCircuit } from "./WorldCircuit";
import styles from "./home-experience.module.css";

type Props = Readonly<{ locale: "es" | "en" }>;

const industries = [
  { icon: Store, name: "retail" },
  { icon: CookingPot, name: "foodService" },
  { icon: Factory, name: "industrial" },
  { icon: Landmark, name: "financial" },
  { icon: Building2, name: "commercial" },
  { icon: Truck, name: "logistics" },
  { icon: Hotel, name: "hospitality" },
] as const;

const logoNames: Record<string, string> = {
  emerson: "Emerson", ternium: "Ternium", milwaukee: "Milwaukee", chamberlain: "Chamberlain",
  bafar: "Grupo Bafar", sunrise: "Sunrise Confections", mcdonalds: "McDonald's", carls: "Carl's Jr.",
  xcaret: "Grupo Xcaret", cessna: "Cessna and Beechcraft", ibwc: "IBWC and CILA",
  axis: "Axis Communications", avigilon: "Avigilon", hanwha: "Hanwha Vision", panduit: "Panduit",
  exacq: "exacq Technologies", verkada: "Verkada", softwarehouse: "Software House", hikvision: "Hikvision", hid: "HID",
};

const partners = ["axis", "avigilon", "hanwha", "panduit", "exacq", "verkada", "softwarehouse", "hikvision", "hid"] as const;
const clients = ["xcaret", "ternium", "bafar", "emerson", "chamberlain", "mcdonalds", "carls", "milwaukee", "cessna", "ibwc", "sunrise"] as const;

function Logo({ id }: Readonly<{ id: string }>) {
  return <Image alt={logoNames[id]} className={styles.logoImage} height={80} src={`/home/partners/${id}.png`} unoptimized width={180} />;
}

function LogoBand({ ids, label, reverse = false }: Readonly<{ ids: readonly string[]; label: string; reverse?: boolean }>) {
  return (
    <div aria-label={label} className={`${styles.logoBand} ${reverse ? styles.logoBandReverse : ""}`} tabIndex={0}>
      <div className={styles.logoTrack}>
        {[...ids, ...ids].map((logo, index) => (
          <div aria-hidden={index >= ids.length || undefined} className={styles.logoTile} key={`${logo}-${index}`}>
            <Logo id={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function HomeExperience({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className={styles.home}>
      <HomeSceneController />

      <CoreOpening
        attributes={[t("attributeInfrastructure"), t("attributeTechnology"), t("attributeConnectivity"), t("attributeIntelligence"), t("attributeTrust")]}
        statement={t("coverLead")}
        title={t("coverTitle")}
      />

      <CompanyEvolution
        ariaLabel={t("evolution.ariaLabel")}
        steps={[
          { body: t("evolution.origin.body"), headline: t("evolution.origin.headline"), kind: "map", label: t("evolution.origin.label"), location: t("evolution.origin.location") },
          { body: t("evolution.timeline.body"), headline: t("evolution.timeline.headline"), kind: "transition" },
          { body: t("evolution.radio.body"), headline: t("evolution.radio.headline"), kind: "phase", label: t("evolution.radio.label") },
          { body: t("evolution.telecom.body"), headline: t("evolution.telecom.headline"), kind: "phase", label: t("evolution.telecom.label") },
          { body: t("evolution.integration.body"), headline: t("evolution.integration.headline"), kind: "phase", label: t("evolution.integration.label") },
          { body: t("evolution.solutions.body"), headline: t("evolution.solutions.headline"), kind: "phase", label: t("evolution.solutions.label") },
          { body: t("evolution.expansion.body"), headline: t("evolution.expansion.headline"), kind: "transition" },
          { body: t("evolution.presence.body"), headline: t("evolution.presence.headline"), kind: "map", label: t("evolution.presence.label") },
        ]}
      />

      <section className={`${styles.scene} ${styles.industryScene}`} data-home-scene id="industrias">
        <div className={styles.sectionContent}>
          <header className={styles.industryIntro}>
            <h2>{t("industriesTitle")}</h2>
            <p>{t("industriesLead")}</p>
          </header>
          <div className={styles.industryGrid}>
            {industries.map(({ icon: Icon, name }) => (
              <article className={styles.industry} key={name}>
                <h3><Icon aria-hidden="true" />{t(`industry.${name}`)}</h3>
              </article>
            ))}
          </div>
          <div className={styles.proofColumns}>
            <section className={styles.proofLayer}>
              <h3>{t("clientsTitle")}</h3>
              <p>{t("clientsLead")}</p>
              <LogoBand ids={clients} label={t("clientsBandLabel")} />
            </section>
            <section className={`${styles.proofLayer} ${styles.partnerLayer}`}>
              <h3>{t("partnersTitle")}</h3>
              <p>{t("partnersLead")}</p>
              <LogoBand ids={partners} label={t("partnersBandLabel")} reverse />
            </section>
          </div>
        </div>
      </section>

      <section className={`${styles.scene} ${styles.worldsScene}`} data-home-scene id="mundos">
        <div aria-hidden="true" className={styles.worldOrbits}><div /><div /></div>
        <div className={styles.sectionContent}>
          <WorldCircuit
            close={t("worldsClose")}
            integration={{
              action: t("integrationAction"),
              description: t("integrationDescription"),
              label: t("physicalWorld"),
            }}
            lead={t("worldsLead")}
            locale={locale}
            sidon={{
              action: t("sidonAction"),
              description: t("digitalDescription"),
              label: t("digitalTitle"),
            }}
            title={t("worldsTitle")}
          />
        </div>
      </section>
    </main>
  );
}
