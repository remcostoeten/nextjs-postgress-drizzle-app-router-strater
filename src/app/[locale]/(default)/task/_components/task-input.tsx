"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRef, type ElementRef, type FC, type HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTaskInputSchema, type AddTaskInputData } from "@/schemas/tasks";
import { SkeletonFourBarsWSpinner } from "@/styles/components/loaders/MiniSpinner";
import { useAddTask } from "../_hooks/use-add-task";

export const TaskInput: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const {
    register,
    handleSubmit,
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

  if (isLoading) {
    return (
      <SkeletonFourBarsWSpinner />
    );
  }

  return (
    <form
      ref={formRef}
      className={clsx("grid gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Task Details</h4>
        <p className="text-sm text-muted-foreground">
          Enter the details for the task
        </p>
      </div>
      <div className="flex flex-col gap-1 it">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          className="col-span-2 h-8"
          {...register("title")}
        />
      </div>
      <div className="flex flex-col gap-1 it">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          className="col-span-2 h-8"
          {...register("date")}
        />
      </div>
      <div className="flex flex-col gap-1 it">
        <Label htmlFor="weight">Weight</Label>
        <Input
          id="weight"
          type="number"
          className="col-span-2 h-8"
          {...register("weight")}
        />
      </div>
      <div className="flex flex-col gap-1 it">
        <Label htmlFor="tag">Tag</Label>
        <Input
          id="tag"
          type="text"
          className="col-span-2 h-8"
          {...register("tag")}
        />
      </div>
      <Button variant="outline" type="submit" disabled={isLoading}>
        Add todo
      </Button>
    </form>
  );
};