import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { SidonModuleExperience, type SidonModuleNarrative } from "@/features/sidon/SidonModuleExperience";
import { sidonCategories } from "@/features/sidon/sidonCategoryData";
import { getTranslations } from "next-intl/server";

type Props = Readonly<{ params: Promise<{ category: string; locale: "es" | "en"; module: string }> }>;

export function generateStaticParams() {
  return ["es", "en"].flatMap((locale) => sidonCategories.flatMap((category) => category.modules.map((module) => ({ locale, category: category.slug, module: module.slug }))));
}

export const dynamicParams = false;

export default async function SidonModulePage({ params }: Props) {
  const { category: categorySlug, locale, module: moduleSlug } = await params;

  setRequestLocale(locale);
  const category = sidonCategories.find((item) => item.slug === categorySlug);
  const moduleDefinition = category?.modules.find((item) => item.slug === moduleSlug);
  if (!category || !moduleDefinition) notFound();

  const t = await getTranslations({ locale, namespace: "sidon" });
  const content = t.raw("categories") as Record<string, { name: string; solves: string; modules: Record<string, { description: string; name: string }> }>;
  const categoryContent = content[category.slug];
  const moduleContent = categoryContent.modules[moduleDefinition.key];
  const narratives = t.raw("moduleNarratives") as Partial<Record<string, SidonModuleNarrative>>;

  return <div className="bg-background"><div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6"><EcosatNavbar locale={locale} page="sidon" /></div><SidonModuleExperience categoryName={categoryContent.name} categorySlug={category.slug} contactAction={t("conversationAction")} contactLead={t("conversationLead")} contactTitle={t("conversationTitle")} description={moduleContent.description} locale={locale} moduleIcon={moduleDefinition.icon} moduleName={moduleContent.name} moduleSlug={moduleDefinition.slug} narrative={narratives[moduleDefinition.slug]} solves={categoryContent.solves} /></div>;
}
