import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";

import { LanguageSwitcher } from "./language-switcher";
import { UserLogin } from "./user-login";
import Link from "next/link";
import ThemeToggle from "@/components/effects/ToggleTheme";

export const Header: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={clsx(
        "flex justify-between items-center container mx-auto p-4",
        className
      )}
      {...props}
    >
      <LanguageSwitcher />
      <ThemeToggle />
      <nav><ul>
        <li><Link href='task'>Task</Link></li>
      </ul></nav>
      <UserLogin />
    </header>
  );
};
