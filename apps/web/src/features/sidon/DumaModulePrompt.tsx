import Image from "next/image";
import Link from "next/link";

import styles from "./sidon.module.css";

type Copy = Readonly<{ invitationAction: string; invitationBody: string; invitationTitle: string }>;

export function DumaModulePrompt({ copy, locale, moduleSlug }: Readonly<{ copy: Copy; locale: "es" | "en"; moduleSlug: string }>) {
  const canPlay = moduleSlug === "sense";

  return <div className={styles.dumaPrompt} aria-label={canPlay ? copy.invitationTitle : undefined}>
    <div className={styles.dumaOrbit} aria-hidden="true"><Image alt="" height={214} src="/pet/dumaHead.svg" unoptimized width={242} /></div>
    {canPlay ? <div className={styles.dumaDialog}><strong>{copy.invitationTitle}</strong><span>{copy.invitationBody}</span><Link href={`/${locale}/sidon/monitoreo/sense/juego/`}>{copy.invitationAction}</Link></div> : null}
  </div>;
}
