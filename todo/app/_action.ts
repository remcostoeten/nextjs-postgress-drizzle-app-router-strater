'use server'

import { createTodo, deleteTodoById, updateTodoStatus } from "@/lib/todo"
import { revalidatePath } from "next/cache"

export async function createTodoAction(title: string, weight: number, category: any, date: any) {
  await createTodo(title, weight, category)
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