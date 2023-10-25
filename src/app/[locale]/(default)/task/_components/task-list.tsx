'use client';
import { useTranslations } from "next-intl";
import type { FC, HTMLAttributes } from "react";

import { trpc } from "@/trpc";
import clsx from "clsx";
import { Alarm, CalendarToday, Person } from "@mui/icons-material";

type TaskType = {
  id?: number;
  title?: string;
  date?: Date;
  notifications?: number;
  tag?: string | null;
  createdAt?: Date;
  userId?: string;completed: boolean; 
};

export const TaskList: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({ className, ...props }) => {
  const t = useTranslations("tasks.list");
  const { data: tasks, isInitialLoading } = trpc.tasks.list.useQuery();

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
    <div className={clsx("grid gap-4", className)} {...props}>
      {tasks?.map((task: TaskType, index: number) => (
        <div key={index} className="border p-4 flex justify-between items-center space-x-2">
          <div>
            <h2 className="text-lg">{task.title}</h2>
            <div className="flex items-center space-x-2">
              <CalendarToday fontSize="small" />
              <span>{task.date?.toLocaleDateString()}</span>
              <Alarm fontSize="small" />
              <span>{task.notifications}</span>
              <Person fontSize="small" />
              <span className="bg-purple-500 text-white px-2 py-1 rounded-md">
                {task.tag || 'aaa'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};