import { setRequestLocale } from "next-intl/server";

import { RetailRenderExperience } from "@/features/renders/retail/RetailRenderExperience";

type Props = Readonly<{ params: Promise<{ locale: "es" | "en" }> }>;

export default async function RetailRenderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RetailRenderExperience />;
}
