import { OrbitCarousel } from "@/components/ui/OrbitCarousel";

import { sidonCategories, type SidonCategorySlug } from "./sidonCategoryData";

type CategoryContent = Readonly<{ modules: Record<string, Readonly<{ name: string }>>; name: string }>;

type Props = Readonly<{
  categories: Record<SidonCategorySlug, CategoryContent>;
  exploreLabel: string;
  instructions: string;
  locale: "es" | "en";
  modulesLabel: string;
  nextLabel: string;
  previousLabel: string;
}>;

export function SidonCategories({ categories, exploreLabel, instructions, locale, modulesLabel, nextLabel, previousLabel }: Props) {
  return (
    <OrbitCarousel
      accentColor="var(--sidon)"
      ariaLabel={instructions}
      brandIcon="/home/worlds/sidon.png"
      deepColor="var(--sidon-deep)"
      id="sidon-categories"
      instructions={instructions}
      items={sidonCategories.map((category) => {
        const content = categories[category.slug];
        return {
          action: exploreLabel,
          decorativeColor: category.decorativeColor,
          href: `/${locale}/sidon/${category.slug}/`,
          icon: category.icon,
          id: category.slug,
          modules: category.modules.map((module) => ({ icon: module.icon, name: content.modules[module.key].name })),
          modulesLabel,
          title: content.name,
        };
      })}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
    />
  );
}
