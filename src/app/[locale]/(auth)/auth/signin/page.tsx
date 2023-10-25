import type { Metadata } from "next";
import { getProviders } from "next-auth/react";
import { getTranslator } from "next-intl/server";
import type { FC } from "react";

import { SignInPageContent } from "./_components/signin-page-content";
import { LocaleRouteParams } from "@/types/types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "signIn");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const SignInPage: FC<LocaleRouteParams> = async () => {
  const providers = await getProviders();
  if (!providers) return null;
  return <SignInPageContent providers={providers} />;
};

export default SignInPage;
