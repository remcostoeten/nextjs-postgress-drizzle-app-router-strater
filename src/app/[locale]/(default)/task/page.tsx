import { AuthRequired } from "@/components/(drizzlestarter)/auth-required";
import { TaskInput } from "./_components/task-input";
import { HomeLink } from "@/components/(drizzlestarter)/home-link";
import { TaskList } from "./_components/task-list";
import { TaskSignInFallback } from "./_components/task-signin-fallback";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("tasks");
  return <>
    <div className="container mx-auto flex flex-col gap-4">
      <h1 className="mb-8 text-2xl">{t("heading")}</h1>
      <AuthRequired fallback={<TaskSignInFallback />}>
        <TaskInput className="mb-4" />
        <TaskList />
      </AuthRequired> 
      <div className="mt-8">
        <HomeLink />
      </div>
    </div>
  </>;
}
