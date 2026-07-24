import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { sidonCategories } from "@/features/sidon/sidonCategoryData";
import { SidonCategoryPanel, type SidonCategoryContent } from "@/features/sidon/SidonCategoryPanel";
import styles from "@/features/sidon/sidon.module.css";

type Props = Readonly<{ params: Promise<{ category: string; locale: "es" | "en" }> }>;

export function generateStaticParams() {
  return ["es", "en"].flatMap((locale) => sidonCategories.map(({ slug: category }) => ({ locale, category })));
}

export const dynamicParams = false;

export default async function SidonCategoryPage({ params }: Props) {
  const { category: categorySlug, locale } = await params;

  setRequestLocale(locale);
  const category = sidonCategories.find(({ slug }) => slug === categorySlug);
  if (!category) notFound();

  const t = await getTranslations({ locale, namespace: "sidon" });
  const categories = t.raw("categories") as Record<string, SidonCategoryContent>;

  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" /></div><main className={styles.categoryPage}><SidonCategoryPanel category={category} content={categories[category.slug]} modulesLabel={t("modules")} solvesLabel={t("whatItSolves")} /></main></div>;
}
