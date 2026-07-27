import Image from "next/image";
import Link from "next/link";

import styles from "./duma-orbit-link.module.css";

export function DumaOrbitLink({ href, label }: Readonly<{ href: string; label: string }>) {
  return (
    <Link aria-label={label} className={styles.pet} href={href}>
      <span className={styles.visual}>
        <Image alt="" draggable={false} height={214} src="/pet/dumaHead.svg" unoptimized width={242} />
      </span>
    </Link>
  );
}
