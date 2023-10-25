'use client';
import { useTranslations } from "next-intl";
import type { FC, HTMLAttributes } from "react";

import { trpc } from "@/trpc";
import clsx from "clsx";

type TaskType = {
  id?: number;
  title?: string;
  date?: Date;
  notifications?: number;
  tag?: string | null;
  createdAt?: Date;
  userId?: string;
};

export const ToDoList: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({ className, ...props }) => {
  const t = useTranslations("tasks.list");
  const { data: tasks, isInitialLoading } = trpc.todos.list.useQuery();

  if (isInitialLoading) {
    return (
      <div
        className={clsx(
          "px-4 py-2 rounded border border-gray-200 bg-gray-200 text-lg",
          className
        )}
        {...props}
      >
        {t("loading")}
      </div>
    );
  }

  return (
    <ul className={clsx("grid gap-4", className)} {...props}>
      {tasks?.map((task: TaskType) => (
        <li
          key={task.id}
          className="flex justify-between items-center px-4 py-2 rounded border border-gray-500"
        >
          <span className="text-lg">{task.title}</span>
          <span className="text-sm text-gray-500">
            {t("createdDate", { createdDate: task.createdAt })}
          </span>
        </li>
      ))}
    </ul>
  );
};