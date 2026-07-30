import { BarChart3, FileText, Lightbulb, Mic } from "lucide-react";

import styles from "./duma.module.css";

export type DumaCapabilitiesCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  cards: {
    insights: { label: string; title: string; copy: string; signal: string; finding: string; action: string };
    icos: { label: string; title: string; copy: string; start: string; current: string; categories: string[] };
    voice: { label: string; title: string; copy: string; transcript: string; reply: string };
    reports: { label: string; title: string; copy: string; summary: string; status: string; chartLabel: string };
  };
};

export function DumaCapabilities({ content }: Readonly<{ content: DumaCapabilitiesCopy }>) {
  const { cards } = content;

  return <section className={styles.capabilityShowcase} aria-labelledby="duma-capabilities-title">
    <div className={styles.capabilityShowcaseIntro}>
      <p>{content.eyebrow}</p>
      <h2 id="duma-capabilities-title">{content.title}</h2>
      <span>{content.lead}</span>
    </div>
    <div className={styles.capabilityGrid}>
      <article className={`${styles.capabilityCard} ${styles.insightsCard}`}>
        <div className={styles.capabilityHeading}><Lightbulb aria-hidden="true" size={18} /><span>{cards.insights.label}</span></div>
        <div className={styles.insightPreview}>
          <span>{cards.insights.signal}</span>
          <strong>{cards.insights.finding}</strong>
          <p>{cards.insights.action}</p>
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.insights.title}</h3><p>{cards.insights.copy}</p></div>
      </article>

      <article className={`${styles.capabilityCard} ${styles.icosCard}`}>
        <div className={styles.capabilityHeading}><BarChart3 aria-hidden="true" size={18} /><span>{cards.icos.label}</span></div>
        <div className={styles.icosPreview}>
          <div className={styles.icosScale}><span>{cards.icos.start}</span><b>68</b><span>{cards.icos.current}</span><b>86</b></div>
          <div className={styles.icosBars}>{cards.icos.categories.map((category, index) => <div key={category}><span>{category}</span><i style={{ "--icos-value": `${[64, 81, 72][index]}%` } as React.CSSProperties} /></div>)}</div>
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.icos.title}</h3><p>{cards.icos.copy}</p></div>
      </article>

      <article className={`${styles.capabilityCard} ${styles.voiceCard}`}>
        <div className={styles.capabilityHeading}><Mic aria-hidden="true" size={18} /><span>{cards.voice.label}</span></div>
        <div className={styles.voicePreview}>
          <div className={styles.voicePulse}><Mic aria-hidden="true" size={18} /><div aria-hidden="true">{[26, 48, 76, 52, 32, 68, 44, 25].map((height, index) => <i key={index} style={{ "--voice-height": `${height}%` } as React.CSSProperties} />)}</div></div>
          <p>{cards.voice.transcript}</p>
          <strong>{cards.voice.reply}</strong>
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.voice.title}</h3><p>{cards.voice.copy}</p></div>
      </article>

      <article className={`${styles.capabilityCard} ${styles.reportCard}`}>
        <div className={styles.capabilityHeading}><FileText aria-hidden="true" size={18} /><span>{cards.reports.label}</span></div>
        <div className={styles.reportPreview}>
          <div><span>{cards.reports.status}</span><b>{cards.reports.summary}</b></div>
          <svg aria-label={cards.reports.chartLabel} role="img" viewBox="0 0 340 104"><path className={styles.reportGridLine} d="M0 82.5H340M0 52.5H340M0 22.5H340" /><path className={styles.reportArea} d="M0 80L48 68L96 72L145 45L193 55L241 25L290 36L340 12V104H0Z" /><path className={styles.reportLine} d="M0 80L48 68L96 72L145 45L193 55L241 25L290 36L340 12" /></svg>
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.reports.title}</h3><p>{cards.reports.copy}</p></div>
      </article>
    </div>
  </section>;
}
