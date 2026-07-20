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
  ShieldCheck,
  Utensils,
} from "lucide-react";

import { HomeSceneController } from "./HomeSceneController";
import styles from "./home-experience.module.css";

type Props = Readonly<{ locale: "es" | "en" }>;

const industries = [
  {
    icon: Factory,
    name: "industrial",
    logos: ["emerson", "ternium", "milwaukee", "chamberlain"],
  },
  { icon: Utensils, name: "food", logos: ["bafar", "sunrise"] },
  { icon: Building2, name: "retail", logos: ["mcdonalds", "carls"] },
  { icon: Palmtree, name: "tourism", logos: ["xcaret"] },
  { icon: Plane, name: "aerospace", logos: ["cessna"] },
  { icon: Landmark, name: "government", logos: ["ibwc"] },
] as const;

const logoNames: Record<string, string> = {
  emerson: "Emerson",
  ternium: "Ternium",
  milwaukee: "Milwaukee",
  chamberlain: "Chamberlain",
  bafar: "Grupo Bafar",
  sunrise: "Sunrise Confections",
  mcdonalds: "McDonald's",
  carls: "Carl's Jr.",
  xcaret: "Grupo Xcaret",
  cessna: "Cessna and Beechcraft",
  ibwc: "IBWC and CILA",
  axis: "Axis Communications",
  avigilon: "Avigilon",
  hanwha: "Hanwha Vision",
  panduit: "Panduit",
  exacq: "exacq Technologies",
  verkada: "Verkada",
  softwarehouse: "Software House",
  hikvision: "Hikvision",
  hid: "HID",
};

const partners = [
  "axis",
  "avigilon",
  "hanwha",
  "panduit",
  "exacq",
  "verkada",
  "softwarehouse",
  "hikvision",
  "hid",
] as const;

function Logo({ id }: Readonly<{ id: string }>) {
  return (
    <Image
      alt={logoNames[id]}
      className={styles.logoImage}
      height={80}
      src={`/home/logos/${id}.png`}
      unoptimized
      width={180}
    />
  );
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
          <Image
            alt="Ecosat"
            className={styles.ecosatLogo}
            height={218}
            priority
            src="/brand/ecosat-horizontal.png"
            unoptimized
            width={403}
          />
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

      <section className={`${styles.scene} ${styles.mapScene}`} data-home-scene id="mapa">
        <div className={styles.sectionContent}>
          <div className={styles.mapNarrative}>
            <p>{t("mapOrigin")}</p>
            <p>{t("mapMexico")}</p>
            <p>{t("mapBorder")}</p>
            <p>{t("mapCanada")}</p>
            <p>{t("mapCentralAmerica")}</p>
          </div>
          <svg aria-hidden="true" className={styles.mapGraphic} viewBox="0 0 760 390">
            <path d="M120 94 225 57l108 39 69-28 93 49 117 11 46 72-45 52-88 3-46 53-83-14-65 49-91-35-69 16-76-74 15-71-60-55Z" />
            {[
              [254, 151], [270, 141], [287, 154], [298, 168], [310, 149], [325, 163], [342, 180],
              [360, 168], [381, 182], [399, 170], [421, 194], [443, 187], [462, 205], [479, 193],
              [501, 215], [520, 203], [540, 228], [557, 218], [576, 237], [599, 229], [621, 245],
              [226, 176], [238, 189], [252, 201], [266, 213], [278, 225], [290, 237], [303, 249],
            ].map(([cx, cy]) => <circle cx={cx} cy={cy} key={`${cx}-${cy}`} r="4" />)}
            <circle className={styles.hqDot} cx="246" cy="147" r="8" />
            <text x="260" y="138">Chihuahua · HQ</text>
          </svg>
          <p className={styles.mapClose}>{t("mapClose")}</p>
        </div>
      </section>

      <section className={`${styles.scene} ${styles.industryScene}`} data-home-scene id="industrias">
        <div className={styles.sectionContent}>
          <h2>{t("industriesTitle")}</h2>
          <div className={styles.industryGrid}>
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <article className={styles.industry} key={industry.name}>
                  <h3><Icon aria-hidden="true" />{t(`industry.${industry.name}`)}</h3>
                  <div className={styles.industryLogos}>
                    {industry.logos.map((logo) => <div className={styles.logoBox} key={logo}><Logo id={logo} /></div>)}
                  </div>
                </article>
              );
            })}
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
          <h2>{t("worldsTitle")}</h2>
          <p className={styles.worldsLead}>{t("worldsLead")}</p>
          <div className={styles.worlds}>
            <article className={`${styles.worldPanel} ${styles.physical}`}>
              <h3><span />{t("physicalTitle")}</h3>
              <div className={styles.capabilities}>
                {[[Camera, "cctv"], [KeyRound, "access"], [Network, "voiceData"], [AudioLines, "audioVideo"]].map(([Icon, key]) => {
                  const CapabilityIcon = Icon as typeof Camera;
                  return <div key={key as string}><CapabilityIcon aria-hidden="true" /><span>{t(`physical.${key}`)}</span></div>;
                })}
              </div>
              <div className={styles.tags}><span>{t("systems")}</span><span>{t("integration")}</span><span>{t("infrastructure")}</span></div>
            </article>
            <div className={styles.connector} aria-hidden="true"><Image alt="" height={218} src="/brand/ecosat-horizontal.png" unoptimized width={403} /></div>
            <article className={`${styles.worldPanel} ${styles.digital}`}>
              <h3><span />{t("digitalTitle")}</h3>
              <div className={styles.sidon}>{t("sidon")}</div>
              <p>{t("digitalDescription")}</p>
              <div className={styles.digitalCapabilities}>
                <span>{t("visibility")}</span><span>{t("control")}</span><span>{t("intelligence")}</span>
              </div>
            </article>
          </div>
          <p className={styles.worldsClose}><ShieldCheck aria-hidden="true" />{t("worldsClose")}</p>
        </div>
      </section>
    </main>
  );
}
