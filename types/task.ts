import type { Task } from "@prisma/client";

import type {
  TaskPriority as ValidatedTaskPriority,
  TaskStatus as ValidatedTaskStatus,
} from "@/lib/validations";

export type TaskStatus = ValidatedTaskStatus;
export type TaskPriority = ValidatedTaskPriority;
export type TaskView = Pick<
  Task,
  | "id"
  | "title"
  | "description"
  | "status"
  | "priority"
  | "dueDate"
  | "isFavorite"
  | "createdAt"
  | "updatedAt"
>;

export function hasDueDate(
  task: Pick<TaskView, "dueDate">,
): task is Pick<TaskView, "dueDate"> & { dueDate: Date } {
  return task.dueDate !== null;
}

export function isCompletedTask(
  task: Pick<TaskView, "status">,
): boolean {
  return task.status === "COMPLETED";
}

export function isOverdueTask(
  task: Pick<TaskView, "status" | "dueDate">,
  referenceDate: Date = new Date(),
): boolean {
  if (!task.dueDate || task.status === "COMPLETED") {
    return false;
  }

  const dueDate = new Date(task.dueDate);
  const today = new Date(referenceDate);
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return dueDate.getTime() < today.getTime();
}