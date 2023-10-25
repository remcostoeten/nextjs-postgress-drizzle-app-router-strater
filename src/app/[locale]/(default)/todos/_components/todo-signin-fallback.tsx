import { useTranslations } from "next-intl";
import type { FC } from "react";

import { SigninLink } from "@/components/(drizzlestarter)/signin-link";

export const ToDoSigninFallback: FC = () => {
  const t = useTranslations("todos");
  return (
    <div>
      {t.rich("signIn", {
        link: (chunks) => <SigninLink>{chunks}</SigninLink>,
      })}
    </div>
  );
};
