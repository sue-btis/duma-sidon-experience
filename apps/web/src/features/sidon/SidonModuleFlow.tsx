"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./sidon.module.css";
import { DumaModulePrompt } from "./DumaModulePrompt";

export type SidonModuleFlow = Readonly<{
  intro: string;
  stages: ReadonlyArray<Readonly<{ description: string; name: string; sceneCopy: string; sceneTitle: string; status: string }>>;
  title: string;
}>;

export function getPhaseImage(moduleSlug: string, index: number) {
  return `/home/worlds/sidon/modulos-imagenes/fases-modulos/${moduleSlug}-fase-${String(index + 1).padStart(2, "0")}.png`;
}

export function SidonModuleFlow({ dumaGame, flow, heroImage, locale, moduleSlug }: Readonly<{ dumaGame: Readonly<{ invitationAction: string; invitationBody: string; invitationTitle: string }>; flow: SidonModuleFlow; heroImage: string; locale: "es" | "en"; moduleSlug: string }>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState(() => getPhaseImage(moduleSlug, 0));
  const activeStage = flow.stages[activeIndex];

  return <section aria-labelledby="module-flow-title" className={styles.moduleFlow}>
    <header><h2 id="module-flow-title">{flow.title}</h2><p>{flow.intro}</p></header>
    <div className={styles.moduleFlowLayout}>
      <ol aria-label={flow.title} className={styles.moduleFlowList}>
        {flow.stages.map((stage, index) => <li key={stage.name}><button aria-current={index === activeIndex ? "step" : undefined} onClick={() => { setActiveIndex(index); setImageSrc(getPhaseImage(moduleSlug, index)); }} type="button"><b>{String(index + 1).padStart(2, "0")}</b><span><strong>{stage.name}</strong><small>{stage.description}</small></span></button></li>)}
      </ol>
      <div aria-live="polite" className={styles.moduleFlowScene}>
        <div className={styles.moduleFlowImage}>
          <DumaModulePrompt copy={dumaGame} locale={locale} moduleSlug={moduleSlug} />
          <Image alt="" className={styles.moduleFlowImageForeground} height={941} onError={() => { setImageSrc(heroImage); }} src={imageSrc} unoptimized width={1672} />
        </div>
        <div><p>{activeStage.status}</p><h3>{activeStage.sceneTitle}</h3><span>{activeStage.sceneCopy}</span></div>
      </div>
    </div>
  </section>;
}
