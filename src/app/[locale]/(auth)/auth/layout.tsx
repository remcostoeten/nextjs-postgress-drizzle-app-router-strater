// Import the metadata object

import type { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import "@/styles/globals.scss";
import { Toaster } from 'sonner';
import { LocaleRouteParams } from "@/types/types";
import { metadata } from "../../../../../config/metadata";
import { PageLayout } from "../../_components/page-layout";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");

  const mergedMetadata: Metadata = {
    ...metadata, 
    title: {
      default: t("meta.title"),
      template: `%s | ${t("meta.title")}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": 1,
        "max-image-preview": "large",
        "max-snippet": 150,
      },
    },
  };

  return mergedMetadata;
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
