import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { IntegrationExperience } from "@/features/integration/IntegrationExperience";
import { isSolutionSlug, solutions } from "@/features/integration/solutions";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en"; solution: string }> }>;

export function generateStaticParams() {
  return ["es", "en"].flatMap((locale) => solutions.map(({ slug: solution }) => ({ locale, solution })));
}

export const dynamicParams = false;

export default async function SolutionPage({ params }: Props) {
  const { locale, solution } = await params;

  if (!isSolutionSlug(solution)) notFound();

  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <EcosatNavbar locale={locale} page="integracion" path={`/${solution}/`} />
      <IntegrationExperience locale={locale} solution={solution} />
    </div>
  );
}
