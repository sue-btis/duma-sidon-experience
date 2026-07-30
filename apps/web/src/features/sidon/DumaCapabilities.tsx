import { ArrowUp, BarChart3, FileText, Lightbulb, Mic, Paperclip } from "lucide-react";

import styles from "./duma.module.css";

export type DumaCapabilitiesCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  composer: { placeholder: string; recording: string };
  cards: {
    insights: { label: string; title: string; copy: string; prompt: string; signal: string; finding: string; action: string };
    icos: { label: string; title: string; copy: string; prompt: string; start: string; current: string; categories: string[] };
    voice: { label: string; title: string; copy: string; transcript: string; reply: string };
    reports: { label: string; title: string; copy: string; prompt: string; summary: string; status: string; summaryLines: string[]; followupLines: string[]; chartLabel: string };
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
        <div className={styles.chatPreview}>
          <p className={styles.chatQuestion}>{cards.insights.prompt}</p>
          <div className={styles.dumaResponse}><span aria-hidden="true">D</span><div><small>{cards.insights.signal}</small><strong>{cards.insights.finding}</strong><p>{cards.insights.action}</p></div></div>
          <ChatComposer placeholder={content.composer.placeholder} />
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.insights.title}</h3><p>{cards.insights.copy}</p></div>
      </article>

      <article className={`${styles.capabilityCard} ${styles.icosCard}`}>
        <div className={styles.capabilityHeading}><BarChart3 aria-hidden="true" size={18} /><span>{cards.icos.label}</span></div>
        <div className={styles.chatPreview}>
          <p className={styles.chatQuestion}>{cards.icos.prompt}</p>
          <div className={styles.dumaResponse}><span aria-hidden="true">D</span><div><div className={styles.icosScale}><span>{cards.icos.start}</span><b>68</b><span>{cards.icos.current}</span><b>86</b></div><div className={styles.icosBars}>{cards.icos.categories.map((category, index) => <div key={category}><span>{category}</span><i style={{ "--icos-value": `${[64, 81, 72][index]}%` } as React.CSSProperties} /></div>)}</div></div></div>
          <ChatComposer placeholder={content.composer.placeholder} />
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.icos.title}</h3><p>{cards.icos.copy}</p></div>
      </article>

      <article className={`${styles.capabilityCard} ${styles.voiceCard}`}>
        <div className={styles.capabilityHeading}><Mic aria-hidden="true" size={18} /><span>{cards.voice.label}</span></div>
        <div className={styles.chatPreview}>
          <div className={styles.dumaResponse}><span aria-hidden="true">D</span><div><div className={styles.voicePulse}><Mic aria-hidden="true" size={16} /><div aria-hidden="true">{[26, 48, 76, 52, 32, 68, 44, 25].map((height, index) => <i key={index} style={{ "--voice-height": `${height}%` } as React.CSSProperties} />)}</div></div><p>{cards.voice.reply}</p></div></div>
          <ChatComposer recording={content.composer.recording} />
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.voice.title}</h3><p>{cards.voice.copy}</p></div>
      </article>

      <article className={`${styles.capabilityCard} ${styles.reportCard}`}>
        <div className={styles.capabilityHeading}><FileText aria-hidden="true" size={18} /><span>{cards.reports.label}</span></div>
        <div className={styles.chatPreview}>
          <p className={styles.chatQuestion}>{cards.reports.prompt}</p>
          <div className={styles.dumaResponse}><span aria-hidden="true">D</span><div className={styles.reportPreview}><div><span>{cards.reports.status}</span><b>{cards.reports.summary}</b></div><div className={styles.reportText}>{cards.reports.summaryLines.map((line) => <p key={line}>{line}</p>)}</div><ReportChart label={cards.reports.chartLabel} /><div className={styles.reportText}>{cards.reports.followupLines.map((line) => <p key={line}>{line}</p>)}</div><ReportChart label={cards.reports.chartLabel} /></div></div>
          <ChatComposer placeholder={content.composer.placeholder} />
        </div>
        <div className={styles.capabilityCopy}><h3>{cards.reports.title}</h3><p>{cards.reports.copy}</p></div>
      </article>
    </div>
  </section>;
}

function ChatComposer({ placeholder, recording }: Readonly<{ placeholder?: string; recording?: string }>) {
  return <div className={`${styles.chatComposerPreview}${recording ? ` ${styles.chatComposerRecording}` : ""}`}>
    {recording ? <><span className={styles.recordingMic}><Mic aria-hidden="true" size={16} /></span><span>{recording}</span><i aria-hidden="true" /></> : <><span>{placeholder}</span><Paperclip aria-hidden="true" size={17} /><ArrowUp aria-hidden="true" size={17} /></>}
  </div>;
}

function ReportChart({ label }: Readonly<{ label: string }>) {
  return <svg aria-label={label} role="img" viewBox="0 0 340 104"><path className={styles.reportGridLine} d="M0 82.5H340M0 52.5H340M0 22.5H340" /><path className={styles.reportArea} d="M0 80L48 68L96 72L145 45L193 55L241 25L290 36L340 12V104H0Z" /><path className={styles.reportLine} d="M0 80L48 68L96 72L145 45L193 55L241 25L290 36L340 12" /></svg>;
}
