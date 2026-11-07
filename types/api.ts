import type { TaskPriority, TaskStatus } from "@/lib/validations";

export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors: Record<string, string[]> | null;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
export class ApiRequestError extends Error {
  readonly status: number;
  readonly errors: Record<string, string[]> | null;

  constructor(
    message: string,
    status: number,
    errors: Record<string, string[]> | null = null,
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}