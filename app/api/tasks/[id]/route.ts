import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { deleteTask, getTaskById, TaskNotFoundError, updateTask, } from "@/lib/services/task.service";
import { taskDueDateSchema, taskSchema, } from "@/lib/validations";
import type { ApiFailure, ApiSuccess, TaskDTO, } from "@/types/api";

export const runtime = "nodejs";
type RouteContext = {
  params: Promise<{ id: string }>;
};

type ValidationIssue = {
  path: PropertyKey[];
  message: string;
};

const taskUpdateSchema = taskSchema.partial().extend({ dueDate: z.union([taskDueDateSchema, z.null()]).optional(), }).refine( (value) => Object.keys(value).length > 0, {
  message: "At least one field must be provided.",
}, );

function validationErrors( issues: ValidationIssue[], ): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of issues) {
    const field = issue.path.length ? issue.path.map(String).join(".") : "_form";
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(issue.message);
  }
  return errors;
}

function errorResponse( message: string, status: number, errors: Record<string, string[]> | null = null, ): NextResponse<ApiFailure> {
  return NextResponse.json( {
      success: false,
      message,
      errors,
    },
    { status },
  );
}

function successResponse<T>( message: string, data: T, status = 200, ): NextResponse<ApiSuccess<T>> {
  return NextResponse.json( {
      success: true,
      message,
      data,
    },
    { status },
  );
}

async function resolveTaskId( context: RouteContext, ): Promise<string | null> {
  const { id } = await context.params;
  const normalizedId = id?.trim();
  return normalizedId || null;
}

export async function GET( _request: NextRequest, context: RouteContext, ): Promise<NextResponse<ApiSuccess<TaskDTO> | ApiFailure>> {
  try {
    const id = await resolveTaskId(context);
    if (!id) {
      return errorResponse( "A valid task ID is required.", 400, );
    }
    const task = await getTaskById(id);
    return successResponse( "Task retrieved successfully.", task, );
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return errorResponse("Task not found.", 404);
    }

    console.error("[GET /api/tasks/[id]]", error);
    return errorResponse( "Unable to retrieve this task. Please try again.", 500, );
  }
}

export async function PATCH( request: NextRequest, context: RouteContext, ): Promise<NextResponse<ApiSuccess<TaskDTO> | ApiFailure>> {
  try {
    const id = await resolveTaskId(context);
    if (!id) {
      return errorResponse( "A valid task ID is required.", 400, );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse( "Request body must contain valid JSON.", 400, );
    }

    const validation = taskUpdateSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse( "Please correct the submitted task information.", 400, validationErrors(validation.error.issues), );
    }

    const task = await updateTask(id, validation.data);
    return successResponse( "Task updated successfully.", task, );
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return errorResponse("Task not found.", 404);
    }

    console.error("[PATCH /api/tasks/[id]]", error);
    return errorResponse( "Unable to update this task. Please try again.", 500, );
  }
}

export async function DELETE( _request: NextRequest, context: RouteContext, ): Promise<NextResponse<ApiSuccess<null> | ApiFailure>> {
  try {
    const id = await resolveTaskId(context);
    if (!id) {
      return errorResponse( "A valid task ID is required.", 400, );
    }

    await deleteTask(id);
    return successResponse( "Task deleted successfully.", null, );
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      return errorResponse("Task not found.", 404);
    }

    console.error("[DELETE /api/tasks/[id]]", error);
    return errorResponse( "Unable to delete this task. Please try again.", 500, );
  }
}