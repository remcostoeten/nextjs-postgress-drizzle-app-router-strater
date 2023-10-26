'use client';
import type { FC, HTMLAttributes } from "react";
import { trpc } from "@/trpc";
import clsx from "clsx";
import { Alarm, CalendarToday, Person, CheckCircleOutline, Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAutoAnimate } from '@formkit/auto-animate/react';


type TaskType = {
  id?: number;
  title?: string;
  date?: Date;
  notifications?: number;
  tag?: string | null;
  createdAt?: Date;
  userId?: string;
  isCompleted?: boolean;
};
import { toast, Toaster } from 'sonner';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MiniSpinner from "@/styles/components/loaders/MiniSpinner";
import Toolbar from "@/components/task/Toolbar";

export const TaskList: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({ className, ...props }) => {
  const { data: tasks, isInitialLoading } = trpc.tasks.list.useQuery();
  const utils = trpc.useContext();
  const updateCompletionStatus = trpc.tasks.updateCompletionStatus.useMutation();
  const deleteTask = trpc.tasks.delete.useMutation();
  const editTask = trpc.tasks.edit.useMutation();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({ taskId: 0, title: '', tag: '', isCompleted: false });
  const [parentRef] = useAutoAnimate();
  const [searchTerm, setSearchTerm] = useState('');

  const [sortByDate, setSortByDate] = useState(false);
  const [sortByCompletion, setSortByCompletion] = useState(false);

  // Sort tasks based on the selected sorting options
  let sortedTasks = tasks ?? [];
  if (sortByDate) {
    sortedTasks = [...sortedTasks].sort((a, b) => ((a.date?.getTime() || 0) - (b.date?.getTime() || 0)) as number);
    toast.success('sorted by date');
  }
  if (sortByCompletion) {
    sortedTasks = [...sortedTasks].sort((a, b) => (a.isCompleted ? -1 : 1) - (b.isCompleted ? -1 : 1));
    toast.success('sorted by completion');
  }


  const handleCompletionToggle = (taskId: number, isCompleted: boolean) => {
    updateCompletionStatus.mutate({ taskId, isCompleted }, {
      onSuccess: () => {
        toast.success('Huraaaaaay, good busy bee!');
        utils.tasks.list.invalidate();
      },
    });
  };

  const handleDelete = (taskId: number) => {
    deleteTask.mutate({ taskId }, {
      onSuccess: () => {
        utils.tasks.list.invalidate();
        toast.success('Task deleted successfully');
      },
    });
  };


  const handleEditOpen = (task: TaskType) => {
    setEditFormValues({ taskId: task.id || 0, title: task.title || '', tag: task.tag || '', isCompleted: task.isCompleted || false });
    setEditFormOpen(false);
  };

  const handleEditClose = () => {
    setEditFormOpen(false);
  };

  const handleEditSubmit = () => {
    editTask.mutate({
      taskId: editFormValues.taskId,
      title: editFormValues.title,
      tag: editFormValues.tag,
      isCompleted: editFormValues.isCompleted
    }, {
      onSuccess: () => {
        handleEditClose();
        toast.success('Task edited successfully');

      },
      onError: (err) => {
        console.error(err);
        toast.error('Error editing task');
      },
    });
  };

  if (isInitialLoading) {
    return (
      <MiniSpinner />
    );
  }

  return (
    <>
      <Toaster />

      <div ref={parentRef} className={clsx("grid border-t", className)} {...props}>
        <div className="flex justify-between space-x-2 w-full mb-4">
          <Toolbar
            onSortDate={() => {
              setSortByDate(!sortByDate);
              setSortByCompletion(false);
            }}
            onSortChecked={() => {
              setSortByCompletion(!sortByCompletion);
              setSortByDate(false);
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}

          />
        </div>
        {sortedTasks?.filter(task => task.title?.toLowerCase().includes(searchTerm.toLowerCase())).map((task: TaskType,) => (
          <div key={task.id} className="border-l border-r border-b p-4 flex justify-between items-center space-x-2">
            <div>
              <h2 className={`text-lg ${task.isCompleted ? 'line-through' : ''}`}>{task.title}</h2>
              <div className="flex items-center space-x-2">
                <CalendarToday fontSize="small" />
                <span>{task.date?.toLocaleDateString()}</span>
                <Alarm fontSize="small" />
                <span>{task.notifications}</span>
                <Person fontSize="small" />
                {task.tag && <span className="bg-purple-500 text-white px-2 py-1 rounded-md">
                  {task.tag}
                </span>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => task.id !== undefined && handleCompletionToggle(task.id, !task.isCompleted)}
                className="form-checkbox h-5 w-5 text-gray-600" />
              <CheckCircleOutline fontSize="small" className={task.isCompleted ? "text-green-500" : "text-gray-500"} />
              <button onClick={() => task.id !== undefined && handleDelete(task.id)} className="text-red-500">
                <Delete fontSize="small" />
              </button>
              <button onClick={() => task.id !== undefined && handleEditOpen(task)} className="text-blue-500">
                <Edit fontSize="small" />
              </button>
            </div>
          </div>
        ))}
        {editFormOpen && (
          <><Popover>
            <PopoverTrigger>
              <Button>Edit</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Input
                autoFocus
                placeholder="Title"
                type="text"
                value={editFormValues.title}
                onChange={(e) => setEditFormValues({ ...editFormValues, title: e.target.value })} />
              <Input
                placeholder="Tag"
                type="text"
                value={editFormValues.tag}
                onChange={(e) => setEditFormValues({ ...editFormValues, tag: e.target.value })} />
              <Checkbox
                checked={editFormValues.isCompleted}
                onChange={(e) => setEditFormValues({ ...editFormValues, isCompleted: (e.target as HTMLInputElement).checked })} />
              <Button onClick={handleEditSubmit}>Save</Button>
            </PopoverContent>
          </Popover></>
        )}
      </div></>
  );
};

export default TaskList;
