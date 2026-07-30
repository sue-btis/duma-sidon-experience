"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getDumaGameCompletionKey, type DumaGameId } from "./dumaGameCompletion";
import styles from "./duma.module.css";

type Module = Readonly<{ explanation: string; finding: string; id: string; name: string; recommendation: string }>;
type Capability = Readonly<{ copy: string; id: string; label: string; title: string }>;
type Game = Readonly<{ copy: string; id: DumaGameId; name: string; title: string }>;
export type DumaPrototype = Readonly<{
  capabilityLabel: string; capabilityTitle: string; capabilities: Capability[]; gameStatus: string; games: Game[]; gamesLabel: string; gamesLead: string; gamesTitle: string;
  modules: Module[]; networkLabel: string; outputExplanation: string; outputFinding: string; outputLabel: string; outputRecommendation: string; play: string; played: string;
  readingLabel: string; readingLead: string; readingTitle: string; relationshipLabel: string; relationshipLead: string; relationshipTitle: string;
}>;

const moduleImages: Record<string, string> = {
  argos: "/home/worlds/sidon/auditorias-modulos/Argos_Isoptipo_Color.png",
  mantiz: "/home/worlds/sidon/mantenimiento-modulos/Mantiz_Isotipo_Color.png",
  sense: "/home/worlds/sidon/monitoreo-modulos/Sense_Isotipo_Color.png",
  "smart-audits": "/home/worlds/sidon/auditorias-modulos/SmartAudits_Logotipo_Color.png",
};

const gamePaths: Record<DumaGameId, string> = {
  sense: "/sidon/monitoreo/sense/juego/",
  "smart-audits": "/sidon/auditorias/smart-audits/juego/",
};

export function DumaInteractive({ content, locale }: Readonly<{ content: DumaPrototype; locale: "es" | "en" }>) {
  const [activeModuleId, setActiveModuleId] = useState(content.modules[0]?.id ?? "");
  const [activeCapabilityId, setActiveCapabilityId] = useState(content.capabilities[0]?.id ?? "");
  const [played, setPlayed] = useState<ReadonlySet<DumaGameId>>(() => new Set());
  const activeModule = content.modules.find((module) => module.id === activeModuleId) ?? content.modules[0];
  const activeCapability = content.capabilities.find((capability) => capability.id === activeCapabilityId) ?? content.capabilities[0];

  useEffect(() => {
    function readCompletion() {
      try { setPlayed(new Set(content.games.filter((game) => window.localStorage.getItem(getDumaGameCompletionKey(game.id)) === "true").map((game) => game.id))); } catch { /* Storage is optional. */ }
    }

    const timer = window.setTimeout(readCompletion, 0);
    window.addEventListener("storage", readCompletion);
    return () => { window.clearTimeout(timer); window.removeEventListener("storage", readCompletion); };
  }, [content.games]);

  if (!activeModule || !activeCapability) return null;

  return <>
    <section className={styles.networkSection}>
      <div className={styles.sectionIntro}><p>{content.networkLabel}</p><h2>{content.readingTitle}</h2><span>{content.readingLead}</span></div>
      <div className={styles.networkLayout}>
        <div aria-label={content.networkLabel} className={styles.network} role="group">
          <div aria-hidden="true" className={styles.networkLines} />
          <div className={styles.dumaCore}><Image alt="" height={112} src="/home/worlds/dumaAi.png" unoptimized width={112} /><span>Duma AI</span></div>
          {content.modules.map((module, index) => <button aria-pressed={module.id === activeModule.id} className={styles.networkNode} data-index={index} key={module.id} onClick={() => setActiveModuleId(module.id)} type="button"><Image alt="" height={78} src={moduleImages[module.id]} unoptimized width={78} /><span>{module.name}</span></button>)}
        </div>
        <article aria-live="polite" className={styles.readingPanel}>
          <p>{content.readingLabel}</p><h3>{activeModule.finding}</h3><div className={styles.sourceRow}><span>{activeModule.name}</span><span>Sidón</span><span>Duma AI</span></div>
          <div className={styles.outputs}><div><b>{content.outputFinding}</b><span>{activeModule.finding}</span></div><div><b>{content.outputExplanation}</b><span>{activeModule.explanation}</span></div><div><b>{content.outputRecommendation}</b><span>{activeModule.recommendation}</span></div></div>
        </article>
      </div>
    </section>
    <section className={styles.capabilities}>
      <div className={styles.sectionIntro}><p>{content.capabilityLabel}</p><h2>{content.capabilityTitle}</h2></div>
      <div className={styles.capabilityLayout}>
        <div aria-label={content.capabilityLabel} className={styles.capabilityTabs} role="tablist">{content.capabilities.map((capability) => <button aria-controls={`capability-${capability.id}`} aria-selected={capability.id === activeCapability.id} id={`tab-${capability.id}`} key={capability.id} onClick={() => setActiveCapabilityId(capability.id)} role="tab" type="button">{capability.label}</button>)}</div>
        <article aria-labelledby={`tab-${activeCapability.id}`} className={styles.capabilityPanel} id={`capability-${activeCapability.id}`} role="tabpanel"><span>Duma AI</span><h3>{activeCapability.title}</h3><p>{activeCapability.copy}</p><div aria-hidden="true" className={styles.signalBars}>{[31, 58, 45, 79, 56, 92, 66].map((height) => <i key={height} style={{ height: `${height}%` }} />)}</div></article>
      </div>
    </section>
    <section className={styles.games}>
      <div className={styles.gamesHead}><div className={styles.sectionIntro}><p>{content.gamesLabel}</p><h2>{content.gamesTitle}</h2></div><p>{content.gamesLead}</p></div>
      <div className={styles.gameGrid}>{content.games.map((game) => <article className={styles.gameCard} key={game.id}><div><span>{game.name}</span><h3>{game.title}</h3><p>{game.copy}</p></div><div className={styles.gameFoot}><small>{content.gameStatus}</small><Link aria-label={`${content.play}: ${game.title}`} href={`/${locale}${gamePaths[game.id]}`}>{played.has(game.id) ? content.played : content.play}</Link></div></article>)}</div>
    </section>
    <section className={styles.relationship}><div><p>{content.relationshipLabel}</p><h2>{content.relationshipTitle}</h2></div><p>{content.relationshipLead}</p></section>
  </>;
}
