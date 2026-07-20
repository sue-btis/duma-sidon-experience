import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";
import { HomeExperience } from "@/features/home/HomeExperience";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <div className="fixed inset-x-0 top-0 z-10 px-4 pt-5 sm:px-6">
        <EcosatNavbar locale={locale} />
      </div>
      <HomeExperience locale={locale} />
    </div>
  );
}
