import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { isSolutionSlug, solutions } from "@/features/integration/solutions";
import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { IntegrationSolutionExperience } from "@/features/integration/IntegrationSolutionExperience";

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
      <div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6">
        <EcosatNavbar locale={locale} page="integracion" path={`/integracion/${solution}/`} />
      </div>
      <IntegrationSolutionExperience locale={locale} solution={solution} />
    </div>
  );
}
