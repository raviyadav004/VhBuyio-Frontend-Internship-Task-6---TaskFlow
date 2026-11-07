import type { TaskInput, TaskUpdateInput, } from "@/lib/validations";
import { ApiRequestError, type ApiSuccess, type TaskDTO, } from "@/types/api";

const TASKS_ENDPOINT = "/api/tasks";
type ApiEnvelope = {
  success: unknown;
  message: unknown;
  data?: unknown;
  errors?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return ( typeof value === "object" && value !== null && !Array.isArray(value) );
}

function isValidationErrors(
  value: unknown,
): value is Record<string, string[]> | null {
  if (value === null) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }
  return Object.values(value).every( (messages) => Array.isArray(messages) && messages.every( (message) => typeof message === "string", ), );
}

function serializeTaskInput( input: TaskInput | TaskUpdateInput, ): Record<string, unknown> {
  const payload: Record<string, unknown> = { ...input, };
  if (input.dueDate instanceof Date) {
    payload.dueDate = input.dueDate.toISOString().slice(0, 10);
  }
  return payload;
}

async function apiRequest<T>( endpoint: string, options: RequestInit = {}, ): Promise<ApiSuccess<T>> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    throw new Error( "Unable to connect to the server. Please check your connection.", );
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error( "The server returned an invalid response. Please try again.", );
  }

  if (!isRecord(result)) {
    throw new Error( "The server returned an unexpected response.", );
  }

  const envelope = result as ApiEnvelope;
  if ( typeof envelope.success !== "boolean" || typeof envelope.message !== "string" ) {
    throw new Error( "The server returned an unexpected response.", );
  }

  if (!response.ok || envelope.success === false) {
    const errors = isValidationErrors(envelope.errors) ? envelope.errors : null;
    throw new ApiRequestError( envelope.message, response.status, errors, );
  }

  if (!("data" in envelope)) {
    throw new Error( "The server response is missing required data.", );
  }

  return {
    success: true,
    message: envelope.message,
    data: envelope.data as T,
  };
}

export async function fetchTasks( search = "", ): Promise<TaskDTO[]> {
  const normalizedSearch = search.trim();
  const query = normalizedSearch ? `?${new URLSearchParams({ search: normalizedSearch, }).toString()}` : "";
  const result = await apiRequest<TaskDTO[]>(
    `${TASKS_ENDPOINT}${query}`,
    {
      method: "GET",
    },
  );
  return result.data;
}

export async function fetchTaskById( id: string, ): Promise<TaskDTO> {
  const result = await apiRequest<TaskDTO>(
    `${TASKS_ENDPOINT}/${encodeURIComponent(id)}`,
    {
      method: "GET",
    },
  );
  return result.data;
}

export async function createTaskApi( input: TaskInput, ): Promise<TaskDTO> {
  const result = await apiRequest<TaskDTO>(
    TASKS_ENDPOINT,
    {
      method: "POST",
      body: JSON.stringify(serializeTaskInput(input)),
    },
  );
  return result.data;
}

export async function updateTaskApi( id: string, input: TaskUpdateInput, ): Promise<TaskDTO> {
  const result = await apiRequest<TaskDTO>(
    `${TASKS_ENDPOINT}/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(serializeTaskInput(input)),
    },
  );
  return result.data;
}

export async function deleteTaskApi( id: string, ): Promise<void> {
  await apiRequest<null>(
    `${TASKS_ENDPOINT}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
}