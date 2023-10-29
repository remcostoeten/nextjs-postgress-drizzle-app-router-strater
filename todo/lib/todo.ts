import prisma from "./prisma";

export async function getTodos() {
  try {
    const todos = await prisma.todo.findMany()
    return { todos }
  } catch (error) {
    return { error }
  }
}

type Todo = {
  id: number;
  title: string;
  weight: number;
  category: string;
  done: boolean;
};

type CreateTodoResult = { task: Todo } | { error: any };

export async function createTodo(
  title: string,
  weight: number,
  category: string
): Promise<CreateTodoResult> {
  try {
    const task = await prisma.todo.create({ data: { title, weight, category } });
    return { task };
  } catch (error) {
    return { error };
  }
}
export async function updateTodoStatus(id: number, done: boolean) {
  try {
    const task = await prisma.todo.update({ where: { id }, data: { done } })
    return { task }
  } catch (error) {
    return { error }
  }
}

export async function deleteTodoById(id: number) {
  try {
    const task = await prisma.todo.delete({ where: { id } })
    return { task }
  } catch (error) {
    return { error }
  }
}