"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react"
import { DropdownTask } from "./dropdown-task"

type TaskProps = {
  task: Task
}

function TaskList({ task }: TaskProps) {
  const [isPending, startTransition] = useTransition()


  return (
    <li className="flex items-center gap-3 p-4 border-b transition-colors hover:bg-muted/50">
      <Checkbox
        id={task?.title}
        defaultChecked={task?.done}
        onCheckedChange={(checked: boolean) => { 
          startTransition(() => {
            updateTaskStatusAction(task?.id, checked)
          })
        }}
      />
      <label
        htmlFor={task?.title}
        className="flex items-center gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <span>{task?.id}.</span>
        <span>{task?.title}</span>
      </label>
      <span className='ml-auto text-sm text-slate-500 peer-checked:line-through'>
        {task.updatedAt.toUTCString()}
      </span>
      <DropdownTask id={task?.id} />
    </li>
  )
}

export default TaskList