import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import "server-only";

import { signInPagePath } from "@/auth";
import { defaultLocale } from "@/i18n";
import { db } from "./db/db";

export const authOptions: AuthOptions = {
  // Note: Cast required to workaround issue https://github.com/nextauthjs/next-auth/issues/8283
  adapter: DrizzleAdapter(db) as AuthOptions["adapter"],
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID!,
    }),
  ],
  pages: {
    signIn: signInPagePath(defaultLocale),
  },
  callbacks: {
    session({ session, user }) {
      const sessionUser = session.user ?? {};
      sessionUser.id = user.id;
      session.user = sessionUser;
      return session;
    },
  },
};