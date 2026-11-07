import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Flag, Pencil, Star, } from "lucide-react";
import { getTaskById } from "@/lib/services/task.service";
import { StatusBadge } from "@/components/StatusBadge";

type TaskDetailsPageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatDueDate(date: string | null): string {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function getPriorityStyles(priority: string): {
  label: string;
  className: string;
} {
  switch (priority) {
    case "HIGH":
      return {
        label: "High",
        className: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400",
      };

    case "LOW":
      return {
        label: "Low",
        className: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
      };

    case "MEDIUM":
    default:
      return {
        label: "Medium",
        className: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
      };
  }
}

export default async function TaskDetailsPage({ params, }: TaskDetailsPageProps) {
  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) {
    notFound();
  }

  const isUpdated = new Date(task.updatedAt).getTime() !== new Date(task.createdAt).getTime();
  const priority = getPriorityStyles(task.priority);
  const editHref = `/tasks/${encodeURIComponent(task.id)}/edit` as Route;
  return (
    <section className="container-shell page-enter py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <Link href="/tasks" className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold text-slate-500 transition hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white" > <ArrowLeft size={17} aria-hidden="true" /> Back to tasks </Link>
        <article aria-labelledby="task-title" className="mt-7 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]" >
          <header className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-6 py-8 dark:border-slate-800 dark:from-indigo-950/40 dark:via-slate-900 dark:to-sky-950/30 sm:px-10 sm:py-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <StatusBadge status={task.status} />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"> <Flag size={13} aria-hidden="true" /> {priority.label} priority </span>
                  {task.isFavorite && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"> <Star size={13} fill="currentColor" aria-hidden="true" /> Favorite </span>
                  )}
                </div>

                <h1 id="task-title" className="max-w-3xl break-words text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl" > {task.title} </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400"> Review the task details, track its current status, and update the task whenever your workflow changes. </p>
              </div>

              <Link href={editHref} className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white" > <Pencil size={16} aria-hidden="true" /> Edit task </Link>
            </div>
          </header>

          <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500"> Description </h2>
                <span className="shrink-0 text-xs font-semibold text-slate-400 dark:text-slate-500"> {task.description.length} characters </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/50 sm:p-6">
                <p className="whitespace-pre-wrap break-words text-[15px] leading-8 text-slate-600 dark:text-slate-300"> {task.description} </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <Flag size={18} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"> Priority </p>
                      <span className={`mt-2 inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-black ${priority.className}`} > {priority.label} </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                      <CalendarDays size={18} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"> Due date </p>
                      <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white"> {formatDueDate(task.dueDate)} </p>
                      <p className="mt-0.5 text-xs font-medium text-slate-400 dark:text-slate-500"> {task.dueDate ? "Scheduled deadline" : "No deadline set"} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside aria-label="Task information" className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <CalendarDays size={18} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"> Created </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white"> {formatDate(task.createdAt)} </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-400 dark:text-slate-500"> {formatTime(task.createdAt)} </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <Clock3 size={18} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"> Last updated </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white"> {isUpdated ? formatDate(task.updatedAt) : "Not updated yet"} </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-400 dark:text-slate-500"> {isUpdated ? formatTime(task.updatedAt) : "Original version"} </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400"> Current status </p>
                <div className="mt-3"> <StatusBadge status={task.status} /> </div>
                <p className="mt-3 text-xs leading-5 text-indigo-700/70 dark:text-indigo-300/70"> You can change the task status from the edit screen. </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
                <div className="flex items-center gap-2">
                  {task.isFavorite ? (
                    <>
                      <Star size={17} className="text-amber-500" fill="currentColor" aria-hidden="true" />
                      <span className="text-sm font-extrabold text-amber-800 dark:text-amber-300"> Favorite task </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} className="text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300"> Standard task </span>
                    </>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-amber-700/70 dark:text-amber-300/70"> {task.isFavorite ? "This task is marked for quick access." : "You can mark this task as a favorite while editing."} </p>
              </div>
            </aside>
          </div>

          <footer className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-5 dark:border-slate-800 dark:bg-slate-950/40 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p className="break-all text-xs font-medium text-slate-400 dark:text-slate-500"> Task ID:{" "} <span className="font-mono text-slate-500 dark:text-slate-400"> {task.id} </span> </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tasks" className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800" > All tasks </Link>
              <Link href={editHref} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/15 transition hover:bg-indigo-700" > <Pencil size={15} aria-hidden="true" /> Edit task </Link>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}