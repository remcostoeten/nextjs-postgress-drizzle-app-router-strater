import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import type { FC } from "react";

import { LocaleRouteParams } from "@/types/types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");
  return {
    description: t("meta.description"),
  };
}

const HomePage: FC<LocaleRouteParams> = () => {
  const t = useTranslations("home");

  return (
    <>
    </>
  );
};

export default HomePage;
