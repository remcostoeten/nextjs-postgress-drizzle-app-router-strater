import type { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import "@/styles/globals.scss";
import { PageLayout } from "../_components/page-layout";
import type { LocaleRouteParams } from "../types";
import { Toaster } from 'sonner';

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");
  return {
    title: {
      default: t("meta.title"),
      template: `%s | ${t("meta.title")}`,
    },
  };
}

type AuthRootLayoutProps = PropsWithChildren<LocaleRouteParams>;

const AuthRootLayout: FC<AuthRootLayoutProps> = async ({ children }) => {
  return (
    <PageLayout>
      <Toaster/>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </PageLayout>
  );
};

export default AuthRootLayout;
