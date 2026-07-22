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
      deepColor="var(--sidon-deep)"
      id="sidon-categories"
      instructions={instructions}
      items={sidonCategories.map((category) => {
        const content = categories[category.slug];
        return {
          action: exploreLabel.replace("{category}", content.name),
          description: `${modulesLabel}: ${category.modules.map((module) => content.modules[module].name).join(" · ")}`,
          href: `/${locale}/${category.slug}/`,
          icon: category.icon,
          id: category.slug,
          title: content.name,
        };
      })}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
    />
  );
}
