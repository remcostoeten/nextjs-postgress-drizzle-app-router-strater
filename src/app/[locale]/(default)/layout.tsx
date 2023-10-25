import type { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import "@/styles/globals.scss";
import { Header } from "../_components/header";
import { PageLayout } from "../_components/page-layout";
import { metadata } from "../../../../config/metadata";
import { LocaleRouteParams } from "@/types/types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");

  const mergedMetadata: Metadata = {
    ...metadata, // Include the global metadata
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

type DefaultRootLayoutProps = PropsWithChildren<LocaleRouteParams>;

const DefaultRootLayout: FC<DefaultRootLayoutProps> = ({ children }) => {
  return (
    <PageLayout header={<Header className="mb-8" />}>
      <main className="container mx-auto px-4">{children}</main>
    </PageLayout>
  );
};

export default DefaultRootLayout;
