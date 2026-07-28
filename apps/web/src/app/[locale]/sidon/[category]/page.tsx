import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { SidonExperience } from "@/features/sidon/SidonExperience";
import { sidonCategories, type SidonCategorySlug } from "@/features/sidon/sidonCategoryData";

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

  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" path={`/sidon/${category.slug}/`} /></div><SidonExperience initialCategory={category.slug as SidonCategorySlug} locale={locale} /></div>;
}
