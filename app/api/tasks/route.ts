import { NextRequest, NextResponse } from "next/server";
import { createTask, getTasks } from "@/lib/services/task.service";
import { taskSchema } from "@/lib/validations";
import type { ApiFailure, ApiSuccess, TaskDTO } from "@/types/api";

export const runtime = "nodejs";
function validationErrors(
  issues: Array<{
    path: PropertyKey[];
    message: string;
  }>,
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const issue of issues) {
    const field = issue.path.length > 0 ? issue.path.map(String).join(".") : "_form";
    errors[field] ??= [];
    errors[field].push(issue.message);
  }
  return errors;
}

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const tasks = await getTasks(search);
    const response: ApiSuccess<TaskDTO[]> = {
      success: true,
      message: "Tasks retrieved successfully.",
      data: tasks,
    };

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    console.error("[GET /api/tasks]", error);

    const response: ApiFailure = {
      success: false,
      message: "Unable to retrieve tasks. Please try again.",
      errors: null,
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      const response: ApiFailure = {
        success: false,
        message: "Request body must contain valid JSON.",
        errors: null,
      };

      return NextResponse.json(response, {
        status: 400,
      });
    }

    const validation = taskSchema.safeParse(body);
    if (!validation.success) {
      const response: ApiFailure = {
        success: false,
        message: "Please correct the submitted task information.",
        errors: validationErrors(validation.error.issues),
      };

      return NextResponse.json(response, {
        status: 400,
      });
    }

    const task = await createTask(validation.data);
    const response: ApiSuccess<TaskDTO> = {
      success: true,
      message: "Task created successfully.",
      data: task,
    };

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error) {
    console.error("[POST /api/tasks]", error);

    const response: ApiFailure = {
      success: false,
      message: "Unable to create the task. Please try again.",
      errors: null,
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }
}