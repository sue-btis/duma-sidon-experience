import { setRequestLocale } from "next-intl/server";

import { EcosatNavbar } from "@/components/layout/EcosatNavbar";

type Props = Readonly<{
  params: Promise<{ locale: "es" | "en" }>;
}>;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-muted px-4 pt-5 sm:px-6">
      <EcosatNavbar locale={locale} />
    </div>
  );
}
