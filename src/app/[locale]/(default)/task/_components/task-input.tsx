"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRef, type ElementRef, type FC, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

import { addTaskInputSchema, type AddTaskInputData } from "@/schemas/tasks";
import { useAddTask } from "../_hooks/use-add-task";
import { ActionButton } from "@/components/(drizzlestarter)/action-button";

export const TaskInput: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  const t = useTranslations("tasks.input");
  const formRef = useRef<ElementRef<"form">>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskInputData>({
    resolver: zodResolver(addTaskInputSchema),
  });
  const { mutate: addTask, isLoading } = useAddTask();

  const onSubmit = (data: AddTaskInputData) => {
    addTask(data, {
      onSuccess: () => {
        formRef.current?.reset();
      },
    });
  };

  return (
    <form
      ref={formRef}
      className={clsx("flex gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <input
        type="text"
        placeholder={t("titlePlaceholder")}
        className={clsx("flex-grow p-2 rounded border border-gray-300", {
          "outline-2 outline-red-600": errors.title,
        })}
        {...register("title")}
      />
      <input
        type="date"
        placeholder={t("datePlaceholder")}
        className={clsx("flex-grow p-2 rounded border border-gray-300", {
          "outline-2 outline-red-600": errors.date,
        })}
        {...register("date")}
      />
      <input
        type="number"
        placeholder={t("notificationsPlaceholder")}
        className={clsx("flex-grow p-2 rounded border border-gray-300", {
          "outline-2 outline-red-600": errors.notifications,
        })}
        {...register("notifications")}
      />
      <input
        type="text"
        placeholder={t("tagPlaceholder")}
        className={clsx("flex-grow p-2 rounded border border-gray-300", {
          "outline-2 outline-red-600": errors.tag,
        })}
        {...register("tag")}
      />
      <ActionButton type="submit" disabled={isLoading}>
        {t("submitButtonText")}
      </ActionButton>
    </form>
  );
};