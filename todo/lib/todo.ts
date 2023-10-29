import prisma from "./prisma";

export async function getTodos() {
  try {
    const todos = await prisma.task.findMany()
    return { todos }
  } catch (error) {
    return { error }
  }
}

export async function createTodo(title: string, weight: number, category: string) {
  try {
    const task = await prisma.task.create({ data: { title, weight, Category: category } })
    return { task }
  } catch (error) {
    return { error }
  }
}

export async function updateTodoStatus(id: number, done: boolean) {
  try {
    const task = await prisma.task.update({ where: { id }, data: { done } })
    return { task }
  } catch (error) {
    return { error }
  }
}

export async function deleteTodoById(id: number) {
  try {
    const task = await prisma.task.delete({ where: { id } })
    return { task }
  } catch (error) {
    return { error }
  }
}