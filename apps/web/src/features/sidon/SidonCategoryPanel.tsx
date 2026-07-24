import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { sidonCategories } from "./sidonCategoryData";
import styles from "./sidon.module.css";

export type SidonCategoryContent = Readonly<{
  headline: string;
  intro: string;
  modules: Record<string, Readonly<{ description: string; href: string; name: string }>>;
  name: string;
  solves: string;
}>;

type Props = Readonly<{
  category: (typeof sidonCategories)[number];
  content: SidonCategoryContent;
  modulesLabel: string;
  solvesLabel: string;
}>;

export function SidonCategoryPanel({ category, content, modulesLabel, solvesLabel }: Props) {
  return <div className={styles.categoryPanel}>
    <div className={styles.categoryIdentity}><Image alt="" className={styles.sidonBrand} height={104} src="/home/worlds/sidon.png" unoptimized width={104} /><div className={styles.categoryMark}><span>{content.name}</span><Image alt="" height={220} src={category.icon} unoptimized width={220} /></div></div>
    <div className={styles.categoryDetails}><p>{content.intro}</p><section><h2>{solvesLabel}</h2><p>{content.solves}</p></section><section><h2>{modulesLabel}</h2><ul>{category.modules.map((module) => { const product = content.modules[module.key]; return <li key={module.key}><Link href={product.href}><Image alt="" height={48} src={module.icon} unoptimized width={48} /><span><strong>{product.name}</strong><small>{product.description}</small></span><ArrowRight aria-hidden="true" size={18} /></Link></li>; })}</ul></section></div>
  </div>;
}
