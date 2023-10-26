'use client';
import { useTranslations } from "next-intl";
import type { FC, HTMLAttributes } from "react";
import { trpc } from "@/trpc";
import clsx from "clsx";
import { Alarm, CalendarToday, Person, CheckCircleOutline, Delete } from "@mui/icons-material";

type TaskType = {
  id?: number;
  title?: string;
  date?: Date;
  notifications?: number;
  tag?: string | null;
  createdAt?: Date;
  userId?: string;
  isCompleted?: boolean; // Assuming you've added this field
};

export const TaskList: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({ className, ...props }) => {
  const t = useTranslations("tasks.list");
  const { data: tasks, isInitialLoading } = trpc.tasks.list.useQuery();
  const utils = trpc.useContext();
  const updateCompletionStatus = trpc.tasks.updateCompletionStatus.useMutation();

  const handleCompletionToggle = (taskId: number, isCompleted: boolean) => {
    updateCompletionStatus.mutate({ taskId, isCompleted }, {
      onSuccess: () => {
        utils.tasks.list.invalidate();
      },
    });
  };

  const deleteTask = trpc.tasks.delete.useMutation();

  const handleDelete = (taskId: number) => {
    deleteTask.mutate({ taskId }, {
      onSuccess: () => {
        utils.tasks.list.invalidate();
      },
    });
  };

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className={clsx("grid gap-4", className)} {...props}>
      {tasks?.map((task: TaskType,) => (
        <div key={task.id} className="border p-4 flex justify-between items-center space-x-2">
          <div>
            <h2 className="text-lg">{task.title}</h2>
            <div className="flex items-center space-x-2">
              <CalendarToday fontSize="small" />
              <span>{task.date?.toLocaleDateString()}</span>
              <Alarm fontSize="small" />
              <span>{task.notifications}</span>
              <Person fontSize="small" />
              <span className="bg-purple-500 text-white px-2 py-1 rounded-md">
                {task.tag || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => task.id !== undefined && handleCompletionToggle(task.id, !task.isCompleted)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <CheckCircleOutline fontSize="small" className={task.isCompleted ? "text-green-500" : "text-gray-500"} />
            <button onClick={() => task.id !== undefined && handleDelete(task.id)} className="text-red-500">
              <Delete fontSize="small" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
