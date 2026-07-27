import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { sidonCategories } from "@/features/sidon/sidonCategoryData";

type Props = Readonly<{ params: Promise<{ category: string; locale: "es" | "en"; module: string }> }>;

export function generateStaticParams() {
  return ["es", "en"].flatMap((locale) => sidonCategories.flatMap((category) => category.modules.map((module) => ({ locale, category: category.slug, module: module.slug }))));
}

export const dynamicParams = false;

export default async function SidonModulePage({ params }: Props) {
  const { category: categorySlug, locale, module: moduleSlug } = await params;

  setRequestLocale(locale);
  if (!sidonCategories.some((category) => category.slug === categorySlug && category.modules.some((module) => module.slug === moduleSlug))) notFound();

  return null;
}
