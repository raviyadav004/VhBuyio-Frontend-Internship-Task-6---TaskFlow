import { z } from "zod";

export const taskStatuses = [ "TODO", "IN_PROGRESS", "COMPLETED", ] as const;
export const taskPriorities = [ "LOW", "MEDIUM", "HIGH", ] as const;

export const TASK_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MIN: 1,
  DESCRIPTION_MAX: 1000,
} as const;

const VALIDATION_MESSAGES = {
  TITLE_REQUIRED: "Title is required",
  TITLE_TOO_LONG: `Title must be ${TASK_LIMITS.TITLE_MAX} characters or less`,
  DESCRIPTION_REQUIRED: "Description is required",
  DESCRIPTION_TOO_LONG: `Description must be ${TASK_LIMITS.DESCRIPTION_MAX} characters or less`,
  INVALID_STATUS: "Select a valid status",
  INVALID_PRIORITY: "Select a valid priority",
  INVALID_DATE: "Enter a valid date",
} as const;

export const taskStatusSchema = z.enum(taskStatuses, {
  error: VALIDATION_MESSAGES.INVALID_STATUS,
});

export const taskPrioritySchema = z.enum(taskPriorities, {
  error: VALIDATION_MESSAGES.INVALID_PRIORITY,
});

export const taskDueDateSchema = z.string({
    error: VALIDATION_MESSAGES.INVALID_DATE,
  }).trim().optional().transform((value, ctx) => {
    if (!value) {
      return undefined;
    }

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) {
      ctx.addIssue({
        code: "custom",
        message: VALIDATION_MESSAGES.INVALID_DATE,
      });
      return z.NEVER;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (
      year < 1 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      ctx.addIssue({
        code: "custom",
        message: VALIDATION_MESSAGES.INVALID_DATE,
      });
      return z.NEVER;
    }

    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);

    const isValidDate = date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
    if (!isValidDate) {
      ctx.addIssue({
        code: "custom",
        message: VALIDATION_MESSAGES.INVALID_DATE,
      });
      return z.NEVER;
    }
    return date;
  });

export const taskSchema = z.object({
    title: z.string({
        error: VALIDATION_MESSAGES.TITLE_REQUIRED,
      }).trim().min(
        TASK_LIMITS.TITLE_MIN,
        VALIDATION_MESSAGES.TITLE_REQUIRED,
      ).max(
        TASK_LIMITS.TITLE_MAX,
        VALIDATION_MESSAGES.TITLE_TOO_LONG,
      ),

    description: z.string({
        error: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
      }).trim().min(
        TASK_LIMITS.DESCRIPTION_MIN,
        VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
      ).max(
        TASK_LIMITS.DESCRIPTION_MAX,
        VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG,
      ),

    status: taskStatusSchema,
    priority: taskPrioritySchema,
    dueDate: taskDueDateSchema,
    isFavorite: z.boolean().default(false),
  }).strict();

export type TaskFormInput = z.input<typeof taskSchema>;
export type TaskInput = z.output<typeof taskSchema>;
export type TaskUpdateInput = Omit< Partial<TaskInput>, "dueDate" > & {
  dueDate?: Date | null;
};

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskPriority = z.infer<typeof taskPrioritySchema>;