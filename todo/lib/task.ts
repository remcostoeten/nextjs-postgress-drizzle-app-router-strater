
export async function createTask(title: string) {
  try {
    const task = await prisma.task.create({ data: { title } })
    return { task }
  } catch (error) {
    return { error }
  }
}

export async function updateTaskStatus(id: number, done: boolean) {
  try {
    const task = await prisma.task.update({ where: { id }, data: { done } })
    return { task }
  } catch (error) {
    return { error }
  }
}

export async function deleteTaskById(id: number) {
  try {
    const task = await prisma.todo.delete({ where: { id } })
    return { task }
  } catch (error) {
    return { error }
  }
}