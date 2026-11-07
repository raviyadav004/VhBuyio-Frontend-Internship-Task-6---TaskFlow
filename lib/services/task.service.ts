import { Prisma, type Task } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { TaskInput, TaskUpdateInput, } from "@/lib/validations";
import type { TaskDTO } from "@/types/api";

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task with ID "${id}" was not found.`);
    this.name = "TaskNotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function toTaskDTO(task: Task): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate?.toISOString() ?? null,
    isFavorite: task.isFavorite,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

function handleDatabaseError(error: unknown, id: string): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    throw new TaskNotFoundError(id);
  }
  throw error;
}

export async function getTasks(
  search?: string,
): Promise<TaskDTO[]> {
  const normalizedSearch = search?.trim();
  const tasks = await prisma.task.findMany({
    where: normalizedSearch
      ? {
          title: {
            contains: normalizedSearch,
          },
        }
      : undefined,

    orderBy: [
      { createdAt: "desc" },
      { id: "desc" },
    ],
  });
  return tasks.map(toTaskDTO);
}

export async function getTaskById( id: string, ): Promise<TaskDTO> {
  const task = await prisma.task.findUnique({ where: { id }, });
  if (!task) {
    throw new TaskNotFoundError(id);
  }
  return toTaskDTO(task);
}

export async function createTask( input: TaskInput, ): Promise<TaskDTO> {
  const task = await prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate ?? null,
      isFavorite: input.isFavorite,
    },
  });
  return toTaskDTO(task);
}

export async function updateTask( id: string, input: TaskUpdateInput, ): Promise<TaskDTO> {
  const data: Prisma.TaskUpdateInput = {};
  if (input.title !== undefined) {
    data.title = input.title;
  }

  if (input.description !== undefined) {
    data.description = input.description;
  }

  if (input.status !== undefined) {
    data.status = input.status;
  }

  if (input.priority !== undefined) {
    data.priority = input.priority;
  }

  if (input.dueDate !== undefined) {
    data.dueDate = input.dueDate;
  }

  if (input.isFavorite !== undefined) {
    data.isFavorite = input.isFavorite;
  }

  try {
    const task = await prisma.task.update({ where: { id }, data, });
    return toTaskDTO(task);
  } catch (error) {
    handleDatabaseError(error, id);
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    handleDatabaseError(error, id);
  }
}