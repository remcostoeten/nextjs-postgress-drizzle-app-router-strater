import { deleteTaskAction } from "@/app/_action"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownTask({ id }: { id: number }) {
  const deleteTask = () => deleteTaskAction(id)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={deleteTask}
        >Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
