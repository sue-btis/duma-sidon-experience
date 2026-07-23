import { setRequestLocale } from "next-intl/server";

import { sidonCategories } from "@/features/sidon/sidonCategoryData";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en" }> }>;

export function generateStaticParams() {
  return ["es", "en"].flatMap((locale) => sidonCategories.map(({ slug: category }) => ({ locale, category })));
}

export const dynamicParams = false;

export default async function SidonCategoryPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);
  return null;
}
