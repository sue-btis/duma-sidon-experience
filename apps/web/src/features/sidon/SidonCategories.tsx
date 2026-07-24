import { OrbitCarousel } from "@/components/ui/OrbitCarousel";

import { sidonCategories, type SidonCategorySlug } from "./sidonCategoryData";

type CategoryContent = Readonly<{ name: string }>;

type Props = Readonly<{
  categories: Record<SidonCategorySlug, CategoryContent>;
  instructions: string;
  locale: "es" | "en";
  nextLabel: string;
  previousLabel: string;
}>;

export function SidonCategories({ categories, instructions, locale, nextLabel, previousLabel }: Props) {
  return <OrbitCarousel
    accentColor="var(--sidon)"
    ariaLabel={instructions}
    deepColor="var(--sidon-deep)"
    id="sidon-categories"
    instructions={instructions}
    items={sidonCategories.map((category) => ({
      href: `/${locale}/sidon/${category.slug}/`,
      id: category.slug,
      image: category.carouselImage,
      title: categories[category.slug].name,
    }))}
    locale={locale}
    nextLabel={nextLabel}
    previousLabel={previousLabel}
  />;
}
