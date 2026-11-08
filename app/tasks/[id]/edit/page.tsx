import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Flag, Pencil, Sparkles, Star, } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TaskForm } from "@/components/TaskForm";
import { getTaskById, TaskNotFoundError, } from "@/lib/services/task.service";
import type { TaskView } from "@/types/task";

type EditTaskPageProps = {
  params: Promise<{ id: string }>;
};

function formatDueDate(date: Date | null): string {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
  };
  return labels[status] ?? status;
}

function getPriorityLabel(priority: string): string {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
}

export default async function EditTaskPage({
  params,
}: EditTaskPageProps) {
  const { id } = await params;
  let taskDTO;
  try {
    taskDTO = await getTaskById(id);
  } catch (error: unknown) {
    if (error instanceof TaskNotFoundError) {
      notFound();
    }
    throw error;
  }

  const task: TaskView = {
    ...taskDTO,
    dueDate: taskDTO.dueDate ? new Date(taskDTO.dueDate) : null,
    createdAt: new Date(taskDTO.createdAt),
    updatedAt: new Date(taskDTO.updatedAt),
  };

  const formattedDueDate = formatDueDate(task.dueDate);
  const priorityLabel = getPriorityLabel(task.priority);
  const statusLabel = getStatusLabel(task.status);
  const detailsHref = `/tasks/${encodeURIComponent(task.id)}` as Route;
  return (
    <section className="container-shell page-enter py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <Link href={detailsHref} className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold text-slate-500 transition hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white" > <ArrowLeft size={17} aria-hidden="true" /> Back to task </Link>
        <article aria-labelledby="edit-task-title" className="mt-7 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_25px_80px_rgba(0,0,0,0.28)]" >
          <header className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-6 py-8 dark:border-slate-800 dark:from-indigo-950/70 dark:via-slate-950 dark:to-sky-950/50 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-indigo-700 backdrop-blur dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"> <Pencil size={13} aria-hidden="true" /> Update task </span>
                <StatusBadge status={task.status} />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-500 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"> <Sparkles size={13} aria-hidden="true" /> TaskFlow </span>

                {task.isFavorite && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/90 px-3 py-1.5 text-xs font-bold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300"> <Star size={13} fill="currentColor" aria-hidden="true" /> Favorite </span>
                )}
              </div>

              <h1 id="edit-task-title" className="mt-5 max-w-3xl break-words text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl" > Edit task </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400"> Update the information below to keep this task accurate, organized, and aligned with your current workflow. </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                  <div className="min-w-0 border-b border-slate-100 px-4 py-4 sm:border-r lg:border-b-0 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400"> Editing </p>
                    <p className="mt-1 truncate text-sm font-extrabold text-slate-900 dark:text-white" title={task.title} > {task.title} </p>
                  </div>

                  <div className="min-w-0 border-b border-slate-100 px-4 py-4 sm:border-b-0 sm:border-r dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400"> Status </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <StatusBadge status={task.status} />
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400"> {statusLabel} </span>
                    </div>
                  </div>

                  <div className="min-w-0 border-b border-slate-100 px-4 py-4 sm:border-r sm:border-b-0 dark:border-slate-800">
                    <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400"> <Flag size={11} aria-hidden="true" /> Priority </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white"> {priorityLabel} </p>
                  </div>

                  <div className="min-w-0 px-4 py-4">
                    <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400"> <CalendarDays size={11} aria-hidden="true" /> Due date </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white"> {formattedDueDate} </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="bg-slate-50/60 p-5 dark:bg-slate-950/50 sm:p-8 lg:p-10"> <TaskForm task={task} /> </div>
          <footer className="border-t border-slate-100 bg-slate-50/70 px-6 py-5 dark:border-slate-800 dark:bg-slate-900/50 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400"> Task ID </p>
                <p className="mt-1 break-all font-mono text-xs text-slate-500 dark:text-slate-400"> {task.id} </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/tasks" className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800" > All tasks </Link>
                <Link href={detailsHref} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800" > <ArrowLeft size={15} aria-hidden="true" /> View task </Link>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}