import Link from "next/link";

import { WorldRelay } from "./WorldRelay";
import styles from "./conversation.module.css";

type World = "integration" | "sidon";

type Props = Readonly<{
  backLabel: string;
  backPath: string;
  copy: string;
  label: string;
  title: string;
  world: World;
}>;

export function ConversationExperience({ backLabel, backPath, copy, label, title, world }: Props) {
  return (
    <main className={styles.page} data-world={world}>
      <section aria-labelledby="conversation-title" className={styles.conversation}>
        <div className={styles.copy}>
          <p className={styles.label}>{label}</p>
          <h1 id="conversation-title">{title}</h1>
          <p className={styles.description}>{copy}</p>
          <Link className={styles.backLink} href={backPath}>{backLabel}</Link>
        </div>
        <WorldRelay world={world} />
      </section>
    </main>
  );
}
