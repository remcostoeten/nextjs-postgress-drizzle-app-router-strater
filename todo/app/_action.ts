'use server'

import { createTask, deleteTaskById, updateTaskStatus } from "@/lib/task"
import { createTodo, deleteTodoById, updateTodoStatus} from "@/lib/todo"
import { revalidatePath } from "next/cache"

export async function createTodoAction(title: string) {
  await createTodo(title)
  revalidatePath("/")
}

export async function updateTodoStatusAction(id: number, done: boolean) { 
  await updateTodoStatus(id, done)
  revalidatePath("/")
}

export async function deleteTodoAction(id: number) { 
  await deleteTodoById(id)
  revalidatePath("/")
}

export async function createTaskAction(title: string) {
  await createTask(title)
  revalidatePath("/")
}

export async function c(id: number, done: boolean) { 
  await updateTaskStatus(id, done)
  revalidatePath("/")
}

export async function deleteTaskAction(id: number) { 
  await deleteTaskById(id)
  revalidatePath("/")
}