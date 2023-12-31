import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import type { FC } from "react";

import { AuthRequired } from "@/components/(drizzlestarter)/auth-required";
import { ToDoInput } from "./_components/todo-input";
import { ToDoList } from "./_components/todo-list";
import { ToDoSigninFallback } from "./_components/todo-signin-fallback";
import { LocaleRouteParams } from "@/types/types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "todos");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const ToDosPage: FC<LocaleRouteParams> = () => {
  const t = useTranslations("todos");
  return (
    <>
      <h1 className="mb-8 text-2xl">{t("heading")}</h1>
      <AuthRequired fallback={<ToDoSigninFallback />}>
        <ToDoInput className="mb-4" />
        <ToDoList />
      </AuthRequired>
    </>
  );
};

export default ToDosPage;
