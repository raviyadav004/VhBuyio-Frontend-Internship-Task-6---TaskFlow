import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Heart, Pencil, } from "lucide-react";
import type { TaskDTO } from "@/types/api";
import { StatusBadge } from "./StatusBadge";
import { DeleteButton } from "./DeleteButton";

type TaskCardProps = {
  task: TaskDTO;
  onDeleted?: (id: string) => void;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function formatRelativeTime(date: string) {
  const now = new Date();
  const createdAt = new Date(date);
  const diff = now.getTime() - createdAt.getTime();
  if (diff < 0)
    return "Created recently";

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (minutes < 1)
    return "Created just now";

  if (minutes < 60)
    return `Created ${minutes}m ago`;

  if (hours < 24)
    return `Created ${hours}h ago`;

  if (days === 1)
    return "Created yesterday";

  if (days < 30)
    return `Created ${days}d ago`;

  return `Created ${formatDate(date)}`;
}

function getPriorityStyles(priority: TaskDTO["priority"]) {
  switch (priority) {
    case "HIGH":
      return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20";

    case "MEDIUM":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";

    case "LOW":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
  }
}

function formatPriority(priority: TaskDTO["priority"]) {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
}

function formatDueDate(date: string | null) {
  if (!date)
    return "No due date";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
  return `Due ${formattedDate}`;
}

export function TaskCard({
  task,
  onDeleted,
}: TaskCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.055)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-[0_24px_60px_rgba(79,70,229,0.13)] dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-[0_20px_50px_rgba(0,0,0,0.20)] dark:hover:border-indigo-500/30 dark:hover:shadow-[0_24px_65px_rgba(79,70,229,0.12]">

      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-indigo-400/10" />
      <div className="relative">
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} />
              <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${getPriorityStyles(task.priority)}`} > {formatPriority(task.priority)} </span>
            </div>

            <div className="flex items-center gap-2">
              {task.isFavorite && ( <Heart size={15} fill="currentColor" className="text-rose-500" aria-label="Favorite task" /> )}
              <span className="hidden text-[10px] font-black uppercase tracking-[0.14em] text-slate-300 transition-colors duration-200 group-hover:text-indigo-400 sm:block dark:text-slate-700 dark:group-hover:text-indigo-500"> Task </span>
            </div>
          </div>

          <Link href={`/tasks/${task.id}`} className="focus-ring inline-flex max-w-full items-center gap-2 rounded-lg text-lg font-black tracking-tight text-slate-900 transition-colors duration-200 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400" >
            <span className="truncate">{task.title}</span>
            <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden="true" className="shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>

          <p className="mt-2.5 min-h-[48px] line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400"> {task.description || "No description provided for this task."} </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
              <CalendarDays size={13} />
              {formatDueDate(task.dueDate)}
            </span>

            {task.isFavorite && ( <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"> <Heart size={13} fill="currentColor" /> Favorite </span> )}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} strokeWidth={2.2} aria-hidden="true" />
              {formatDate(task.createdAt)}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} strokeWidth={2.2} aria-hidden="true" />
              {formatRelativeTime(task.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Link href={`/tasks/${task.id}/edit`} className="focus-ring inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400" aria-label={`Edit task: ${task.title}`} title="Edit task" >
              <Pencil size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>

            <DeleteButton id={task.id} onDeleted={onDeleted} />
          </div>
        </div>
      </div>
    </article>
  );
}