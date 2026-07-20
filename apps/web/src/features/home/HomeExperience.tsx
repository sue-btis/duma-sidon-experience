import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ArrowDown,
  AudioLines,
  Building2,
  Camera,
  Cpu,
  Factory,
  KeyRound,
  Landmark,
  Network,
  Palmtree,
  Plane,
  Utensils,
} from "lucide-react";

import { HomeSceneController } from "./HomeSceneController";
import { MapExperience } from "./MapExperience";
import { WorldCircuit } from "./WorldCircuit";
import styles from "./home-experience.module.css";

type Props = Readonly<{ locale: "es" | "en" }>;

const industries = [
  { icon: Factory, name: "industrial", logos: ["emerson", "ternium", "milwaukee", "chamberlain"] },
  { icon: Utensils, name: "food", logos: ["bafar", "sunrise"] },
  { icon: Building2, name: "retail", logos: ["mcdonalds", "carls"] },
  { icon: Palmtree, name: "tourism", logos: ["xcaret"] },
  { icon: Plane, name: "aerospace", logos: ["cessna"] },
  { icon: Landmark, name: "government", logos: ["ibwc"] },
] as const;

const logoNames: Record<string, string> = {
  emerson: "Emerson", ternium: "Ternium", milwaukee: "Milwaukee", chamberlain: "Chamberlain",
  bafar: "Grupo Bafar", sunrise: "Sunrise Confections", mcdonalds: "McDonald's", carls: "Carl's Jr.",
  xcaret: "Grupo Xcaret", cessna: "Cessna and Beechcraft", ibwc: "IBWC and CILA",
  axis: "Axis Communications", avigilon: "Avigilon", hanwha: "Hanwha Vision", panduit: "Panduit",
  exacq: "exacq Technologies", verkada: "Verkada", softwarehouse: "Software House", hikvision: "Hikvision", hid: "HID",
};

const partners = ["axis", "avigilon", "hanwha", "panduit", "exacq", "verkada", "softwarehouse", "hikvision", "hid"] as const;

function Logo({ id }: Readonly<{ id: string }>) {
  return <Image alt={logoNames[id]} className={styles.logoImage} height={80} src={`/home/partners/${id}.png`} unoptimized width={180} />;
}

export async function HomeExperience({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home" });
  const pillars = [
    [Camera, "pillarSecurity"],
    [KeyRound, "pillarAccess"],
    [Network, "pillarNetworks"],
    [AudioLines, "pillarAudio"],
    [Cpu, "pillarIntelligence"],
  ] as const;

  return (
    <main className={styles.home}>
      <HomeSceneController />

      <section className={`${styles.scene} ${styles.cover}`} data-home-scene id="portada">
        <div aria-hidden="true" className={styles.orbits}>
          <div className={`${styles.orbit} ${styles.orbitOuter}`}>
            <i className={`${styles.orbitNode} ${styles.outerNode}`} />
          </div>
          <div className={`${styles.orbit} ${styles.orbitInner}`}>
            <i className={`${styles.orbitNode} ${styles.innerNode}`} />
          </div>
        </div>
        <div className={styles.coverContent}>
          <h1 className={styles.visuallyHidden}>{t("coverTitle")}</h1>
          <Image alt="Ecosat" className={styles.ecosatLogo} height={218} priority src="/brand/ecosat-horizontal.png" unoptimized width={403} />
          <p className={styles.lead}>{t("coverLead")}</p>
          <div className={styles.pillars}>
            {pillars.map(([Icon, key]) => (
              <div className={styles.pillar} key={key}>
                <Icon aria-hidden="true" />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
          <a className={styles.startButton} href="#mapa">
            {t("start")}
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <MapExperience
        close={t("mapClose")}
        hq={t("mapHq")}
        labels={[t("mapOrigin"), t("mapMexico"), t("mapBorder"), t("mapCanada"), t("mapCentralAmerica"), t("mapPresence")]}
        reach={[t("mapReachOne"), t("mapReachMexico"), t("mapReachNorth"), t("mapReachTotal")]}
      />

      <section className={`${styles.scene} ${styles.industryScene}`} data-home-scene id="industrias">
        <div className={styles.sectionContent}>
          <h2>{t("industriesTitle")}</h2>
          <div className={styles.industryGrid}>
            {industries.map(({ icon: Icon, logos, name }) => (
              <article className={styles.industry} key={name}>
                <h3><Icon aria-hidden="true" />{t(`industry.${name}`)}</h3>
                <div className={styles.industryLogos}>
                  {logos.map((logo) => <Logo id={logo} key={logo} />)}
                </div>
              </article>
            ))}
          </div>
          <h3 className={styles.partnerTitle}>{t("partnersTitle")}</h3>
          <div className={styles.partners}>
            {partners.map((logo) => <div className={styles.partnerLogo} key={logo}><Logo id={logo} /></div>)}
          </div>
          <p className={styles.close}>{t("industriesClose")}</p>
        </div>
      </section>

      <section className={`${styles.scene} ${styles.worldsScene}`} data-home-scene id="mundos">
        <div aria-hidden="true" className={styles.worldOrbits}><div /><div /></div>
        <div className={styles.sectionContent}>
          <WorldCircuit
            close={t("worldsClose")}
            lead={t("worldsLead")}
            title={t("worldsTitle")}
          />
        </div>
      </section>
    </main>
  );
}
