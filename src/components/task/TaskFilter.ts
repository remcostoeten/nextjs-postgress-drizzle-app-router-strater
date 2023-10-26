import { TaskType } from "@/types/types";

export const filterTasks = (tasks: TaskType[], filterDate: Date | null, filterCompleted: boolean | null): TaskType[] => {
    return tasks.filter(task => {
      const matchesDate = filterDate ? new Date(task.createdAt).toDateString() === filterDate.toDateString() : true;
      const matchesCompletion = filterCompleted !== null ? task.isCompleted === filterCompleted : true;
  
      return matchesDate && matchesCompletion;
    });
  };