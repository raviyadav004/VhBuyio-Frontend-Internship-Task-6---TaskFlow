"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useId, useRef, useState, type FormEvent, } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, FileText, Flag, Loader2, Save, Sparkles, Star, } from "lucide-react";
import { createTaskApi, updateTaskApi, } from "@/lib/api/tasks";
import { ApiRequestError, } from "@/types/api";
import type { TaskInput, TaskPriority, TaskStatus, TaskUpdateInput, } from "@/lib/validations";
import type { TaskView } from "@/types/task";

type FormErrors = {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  isFavorite?: string;
  form?: string;
};

type TaskFormState = {
  success: boolean;
  message: string;
  errors: FormErrors;
};

const initialFormState: TaskFormState = {
  success: false,
  message: "",
  errors: {},
};

const FIELD_NAMES = [
  "title",
  "description",
  "status",
  "priority",
  "dueDate",
  "isFavorite",
] as const;

function SubmitButton({
  isEditing,
  pending,
}: {
  isEditing: boolean;
  pending: boolean;
}) {
  return (
    <button type="submit" disabled={pending} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30 active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70" >
      {pending ? (
        <>
          <Loader2 size={17} className="animate-spin" aria-hidden="true" />
          {isEditing ? "Saving..." : "Creating..."}
        </>
      ) : (
        <>
          {isEditing ? (
            <CheckCircle2 size={17} aria-hidden="true" />
          ) : (
            <Save size={17} aria-hidden="true" />
          )}
          {isEditing ? "Save changes" : "Create task"}
        </>
      )}
    </button>
  );
}

function formatDateForInput(
  date: Date | string | null | undefined,
): string {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getFormErrors(error: unknown): {
  message: string;
  errors: FormErrors;
} {
  if (!(error instanceof ApiRequestError)) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      errors: {
        form: "Please try again. If the problem continues, reload the page.",
      },
    };
  }

  const fieldErrors: FormErrors = {};
  if (error.errors) {
    for (const [field, messages] of Object.entries(error.errors)) {
      const message = messages[0] ?? "Invalid value.";
      if ( FIELD_NAMES.includes(field as (typeof FIELD_NAMES)[number]) ) {
        fieldErrors[field as keyof Omit<FormErrors, "form">] = message;
      } else {
        fieldErrors.form = message;
      }
    }
  }

  if (error.status === 400 && Object.keys(fieldErrors).length > 0) {
    return {
      message: "Please correct the highlighted fields.",
      errors: fieldErrors,
    };
  }

  return {
    message: error.message,
    errors: {
      form: error.message,
    },
  };
}

export function TaskForm({
  task,
}: {
  task?: TaskView;
}) {
  const router = useRouter();
  const isEditing = Boolean(task);
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const titleErrorId = `${formId}-title-error`;
  const descriptionErrorId = `${formId}-description-error`;
  const statusErrorId = `${formId}-status-error`;
  const priorityErrorId = `${formId}-priority-error`;
  const dueDateErrorId = `${formId}-due-date-error`;
  const favoriteErrorId = `${formId}-favorite-error`;

  const [titleLength, setTitleLength] = useState( task?.title.length ?? 0, );
  const [descriptionLength, setDescriptionLength] = useState( task?.description.length ?? 0, );
  const [state, setState] = useState<TaskFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDueDate = formatDateForInput(task?.dueDate);
  const hasFieldErrors = Object.values(state.errors).some(Boolean);
  useEffect(() => {
    if (!hasFieldErrors || state.success) {
      return;
    }

    const firstInvalidField = formRef.current?.querySelector<HTMLElement>( '[aria-invalid="true"]', );
    firstInvalidField?.focus();
  }, [hasFieldErrors, state.errors, state.success]);

  const inputBaseClass = "focus-ring w-full rounded-xl border bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/15";
  const selectBaseClass = `${inputBaseClass} cursor-pointer font-semibold`;
  function fieldClass(hasError: boolean): string {
    return hasError ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10 dark:border-rose-500" : "border-slate-200 dark:border-slate-700";
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const dueDateValue = String( formData.get("dueDate") ?? "", ).trim();
    const dueDate = dueDateValue ? new Date(`${dueDateValue}T00:00:00.000Z`) : undefined;
    const commonInput = {
      title: String(formData.get("title") ?? "").trim(),
      description: String( formData.get("description") ?? "", ).trim(),
      status: String( formData.get("status") ?? "", ) as TaskStatus,
      priority: String( formData.get("priority") ?? "", ) as TaskPriority,
      isFavorite: formData.get("isFavorite") === "true",
    };

    setIsSubmitting(true);
    setState(initialFormState);
    try {
      if (isEditing && task) {
        const updateInput: TaskUpdateInput = {
          ...commonInput,
          dueDate: dueDate ?? null,
        };

        await updateTaskApi(task.id, updateInput);
        router.push( `/tasks/${encodeURIComponent(task.id)}` as Route, );
      } else {
        const createInput: TaskInput = {
          ...commonInput,
          dueDate,
        };

        await createTaskApi(createInput);
        router.push("/tasks");
      }
    } catch (error) {
      console.error("[TaskFlow] Task submission failed:", error);
      const result = getFormErrors(error);
      setState({
        success: false,
        message: result.message,
        errors: result.errors,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const cancelHref = ( isEditing && task ? `/tasks/${encodeURIComponent(task.id)}` : "/tasks" ) as Route;
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7" >
      {task && ( <input type="hidden" name="id" value={task.id} /> )}
      {state.errors.form && (
        <div role="alert" aria-live="assertive" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 dark:border-rose-500/25 dark:bg-rose-500/10" >
          <p className="text-sm font-bold text-rose-800 dark:text-rose-200"> {state.message || "Something went wrong."} </p>
        </div>
      )}

      {hasFieldErrors && !state.errors.form && (
        <div role="alert" aria-live="assertive" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 dark:border-rose-500/25 dark:bg-rose-500/10" >
          <p className="text-sm font-bold text-rose-800 dark:text-rose-200"> Please correct the highlighted fields. </p>
          <p className="mt-1 text-xs leading-5 text-rose-700/80 dark:text-rose-300/80"> Review the validation messages below before submitting again. </p>
        </div>
      )}

      <div className="card overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/70 px-6 py-5 dark:border-slate-800 dark:from-slate-900 dark:to-indigo-950/50 sm:px-8">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              <FileText size={20} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <h2 className="font-extrabold text-slate-900 dark:text-white"> {isEditing ? "Task information" : "Create your task"} </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300"> {isEditing ? "Keep the task information accurate and up to date." : "Add the essential details so you know exactly what needs to be done."} </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 bg-white p-6 dark:bg-slate-950/40 sm:p-8">
          <div>
            <label htmlFor="title" className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-slate-800 dark:text-slate-100" >
              <span> Task title <span className="text-rose-500">*</span> </span>
              <span className={`text-xs font-semibold tabular-nums ${ titleLength > 100 ? "text-rose-600" : "text-slate-400" }`} > {titleLength}/100 </span>
            </label>

            <input id = "title" name = "title" type = "text" defaultValue = {task?.title ?? ""} required maxLength = {100} autoComplete = "off" spellCheck aria-invalid = { Boolean(state.errors.title) } aria-describedby = { state.errors.title ? titleErrorId : undefined }
              onChange = { (event) => setTitleLength(event.target.value.length)
              }
              className = { `${inputBaseClass} ${ fieldClass( Boolean(state.errors.title), ) }`}
              placeholder = "e.g. Complete project documentation"
            />

            {state.errors.title ? (
              <p id = { titleErrorId } role = "alert" className = "mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400" > {state.errors.title} </p>
            ) : (
              <p className = "mt-2 text-xs leading-5 text-slate-400"> Use a short, clear title that describes the task outcome. </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-slate-800 dark:text-slate-100" >
              <span> Description <span className="text-rose-500">*</span> </span>
              <span className="text-xs font-semibold text-slate-400 tabular-nums"> {descriptionLength}/1000 </span>
            </label>

            <textarea id="description" name="description" defaultValue={task?.description ?? ""} required maxLength={1000} rows={7} aria-invalid={Boolean(state.errors.description)} aria-describedby={ state.errors.description ? descriptionErrorId : undefined }
              onChange={(event) => setDescriptionLength(event.target.value.length)
              }
              placeholder = "Describe what needs to be done, the expected outcome, or any useful context..."
              className = {`${inputBaseClass} resize-y leading-6 ${fieldClass( Boolean(state.errors.description),
              )}`}
            />

            {state.errors.description ? (
              <p id = { descriptionErrorId } role = "alert" className = "mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400" > {state.errors.description} </p>
            ) : (
              <p className="mt-2 text-xs leading-5 text-slate-400"> Add enough context for the task to remain understandable later. </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100" > Status </label>
              <select id = "status" name = "status" defaultValue = { task?.status ?? "TODO" } aria-invalid = { Boolean(state.errors.status) } aria-describedby = { state.errors.status ? statusErrorId : undefined }
                className = {`${selectBaseClass} ${fieldClass( Boolean(state.errors.status),
                )}`}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>

              {state.errors.status ? (
                <p id = {statusErrorId} role = "alert" className = "mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400" > {state.errors.status} </p>
              ) : (
                <p className = "mt-2 text-xs leading-5 text-slate-400"> Choose the current stage of this task. </p>
              )}
            </div>

            <div>
              <label htmlFor = "priority" className = "mb-2 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100" > <Flag size = {15} className = "text-indigo-500" aria-hidden = "true" /> Priority </label>
              <select id = "priority" name = "priority" defaultValue = { task?.priority ?? "MEDIUM" } aria-invalid = { Boolean(state.errors.priority) } aria-describedby = { state.errors.priority ? priorityErrorId : undefined } className = {`${selectBaseClass} ${fieldClass( Boolean(state.errors.priority), )}`} >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              {state.errors.priority ? (
                <p id = { priorityErrorId } role = "alert" className = "mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400" > { state.errors.priority } </p>
              ) : (
                <p className="mt-2 text-xs leading-5 text-slate-400"> Set the importance level for this task. </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="dueDate" className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100" > <CalendarDays size={15} className="text-indigo-500" aria-hidden="true" /> Due date </label>
              <input id = "dueDate" name = "dueDate" type = "date" defaultValue = { formattedDueDate } aria-invalid = { Boolean(state.errors.dueDate) } aria-describedby = { state.errors.dueDate ? dueDateErrorId : undefined }
                className = {`${inputBaseClass} ${fieldClass(
                  Boolean(state.errors.dueDate),
                )}`}
              />

              {state.errors.dueDate ? (
                <p id = {dueDateErrorId} role = "alert" className = "mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400" > {state.errors.dueDate} </p>
              ) : (
                <p className = "mt-2 text-xs leading-5 text-slate-400"> Optional. Clear the field to remove an existing deadline. </p>
              )}
            </div>

            <div>
              <span className = "mb-2 block text-sm font-bold text-slate-800 dark:text-slate-100"> Task preference </span>
              <label htmlFor = "isFavorite" className = "flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/5" >
                <input id = "isFavorite" name = "isFavorite" type = "checkbox" value = "true" defaultChecked = {task?.isFavorite ?? false} aria-invalid = { Boolean(state.errors.isFavorite) } aria-describedby = { state.errors.isFavorite ? favoriteErrorId : undefined } className="h-4 w-4 rounded border-slate-300 accent-amber-500 focus:ring-amber-500/20 dark:border-slate-600" />
                <Star size = {17} className="shrink-0 text-amber-500" aria-hidden="true" />
                <span className = "text-sm font-semibold text-slate-700 dark:text-slate-200"> Mark as favorite </span>
              </label>

              {state.errors.isFavorite ? (
                <p id = {favoriteErrorId} role = "alert" className = "mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400" > {state.errors.isFavorite} </p>
              ) : (
                <p className = "mt-2 text-xs leading-5 text-slate-400"> Favorite tasks can be highlighted for quick access. </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className = "rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
        <div className = "flex items-start gap-3">
          <div className = "mt-0.5 text-indigo-600 dark:text-indigo-300">
            <Sparkles size = {17} aria-hidden="true" />
          </div>

          <div>
            <p className = "text-sm font-bold text-indigo-900 dark:text-indigo-200"> {isEditing ? "Keep your workflow updated" : "Make it actionable"} </p>
            <p className = "mt-1 text-xs leading-5 text-indigo-700/70 dark:text-indigo-300/80"> {isEditing ? "Keep the status, priority, due date, and description updated as your work changes." : "A clear title, useful description, priority, status, and due date make tasks easier to manage."} </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href = {cancelHref} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800" > <ArrowLeft size={17} aria-hidden="true" /> Cancel </Link>
        <SubmitButton isEditing = {isEditing} pending = {isSubmitting} />
      </div>
    </form>
  );
}