// Import the metadata object

import type { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";
import "@/styles/globals.scss";
import { PageLayout } from "../_components/page-layout";
import { Toaster } from 'sonner';
import { metadata } from "../../../../config/metadata";
import { LocaleRouteParams } from "@/types/types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");

  // Merge the generated metadata with the global metadata object
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

type AuthRootLayoutProps = PropsWithChildren<LocaleRouteParams>;

const AuthRootLayout: FC<AuthRootLayoutProps> = async ({ children }) => {
  return (
    <body className="bg-background text-offwhite">
      <Toaster/>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </body>
  );
};

export default AuthRootLayout;
