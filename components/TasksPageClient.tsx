"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, ClipboardList, Clock3, ListFilter, Plus, Search, Sparkles, TrendingUp, } from "lucide-react";
import { fetchTasks } from "@/lib/api/tasks";
import type { TaskDTO } from "@/types/api";
import { SearchBar } from "@/components/SearchBar";
import { TaskCard } from "@/components/TaskCard";

type TasksPageClientProps = {
  searchQuery: string;
};

export function TasksPageClient({
  searchQuery,
}: TasksPageClientProps) {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;
    async function loadTasks() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTasks();
        if (isActive) {
          setTasks(data);
        }
      } catch (err) {
        if (isActive) {
          setError( err instanceof Error ? err.message : "Unable to load tasks. Please try again.", );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();
    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const handleTaskDeleted = useCallback((deletedTaskId: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== deletedTaskId),
    );
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return tasks;
    }

    return tasks.filter((task) => task.title.toLowerCase().includes(query), );
  }, [tasks, searchQuery]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter( (task) => task.status === "COMPLETED", ).length;
  const inProgressTasks = tasks.filter( (task) => task.status === "IN_PROGRESS", ).length;
  const todoTasks = tasks.filter( (task) => task.status === "TODO", ).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const resultCount = searchResults.length;

  return (
    <section className="container-shell page-enter py-8 sm:py-12 lg:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/65 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-slate-800/80 dark:bg-slate-900/55 dark:shadow-[0_25px_80px_rgba(0,0,0,0.2)]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/80 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300"> <Sparkles size={14} /> Task workspace </div>
            <h1 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"> Your work,{" "} <span className="gradient-text">under control.</span> </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400"> Organize your tasks, monitor progress, and keep your most important work moving forward from one focused workspace. </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-2.5 text-sm font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                <ClipboardList size={16} className="text-indigo-500" />
                {totalTasks} {totalTasks === 1 ? "task" : "tasks"} in workspace
              </div>

              {completedTasks > 0 && (
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-3.5 py-2.5 text-sm font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 size={16} />
                  {completedTasks} completed
                </div>
              )}
            </div>
          </div>

          <Link href="/tasks/new" className="focus-ring group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-600/20 sm:w-fit dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white" > <Plus size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-90" /> Create new task </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total tasks" value={totalTasks} icon={<ClipboardList size={21} />} iconClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" accent="from-indigo-500/20" />
        <StatCard label="To do" value={todoTasks} icon={<ListFilter size={21} />} iconClass="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" accent="from-slate-400/15" />
        <StatCard label="In progress" value={inProgressTasks} icon={<Clock3 size={21} />} iconClass="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" accent="from-amber-500/15" />
        <StatCard label="Completed" value={completedTasks} icon={<CheckCircle2 size={21} />} iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" accent="from-emerald-500/15" />
      </div>

      {totalTasks > 0 && (
        <div className="card relative mt-5 overflow-hidden rounded-[1.75rem] p-5 sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-500/10" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <TrendingUp size={19} />
                </div>

                <div>
                  <p className="text-base font-black text-slate-950 dark:text-white"> Overall progress </p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400"> Keep the momentum going </p>
                </div>
              </div>

              <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-200"> {completedTasks} </span>{" "} of{" "}
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {totalTasks}
                </span>{" "}
                {totalTasks === 1 ? "task" : "tasks"} completed
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-black tracking-tight text-indigo-600 dark:text-indigo-400"> {completionRate}% </span>
            </div>
          </div>

          <div className="relative mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-valuenow={completionRate} aria-valuemin={0} aria-valuemax={100} aria-label="Task completion progress" >
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-all duration-700" style={{ width: `${completionRate}%` }} />
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Search size={15} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800 dark:text-slate-200"> Search workspace </p>
              <p className="hidden text-xs text-slate-400 sm:block"> Find tasks by title </p>
            </div>
          </div>

          {searchQuery && (
            <Link href="/tasks" className="focus-ring inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300" > Clear <ArrowRight size={13} /> </Link>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-1.5 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
          <SearchBar value={searchQuery} />
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white"> {searchQuery ? "Search results" : "Recent tasks"} </h2>
            <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-slate-100 px-2 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300"> {isLoading ? "…" : resultCount} </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"> {searchQuery ? `Showing tasks matching "${searchQuery}"` : "Your latest tasks and ongoing work"} </p>
        </div>

        {!searchQuery && totalTasks > 0 && (
          <Link href="/tasks/new" className="focus-ring hidden items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 sm:inline-flex dark:text-indigo-400 dark:hover:text-indigo-300" > Add another task <ChevronRight size={16} /> </Link>
        )}
      </div>

      {isLoading ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading tasks" aria-busy="true" >
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card min-h-64 animate-pulse rounded-[1.5rem] p-5" >
              <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-6 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-4 h-4 w-full rounded bg-slate-100 dark:bg-slate-800" />
              <div className="mt-2 h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card mt-5 rounded-[1.75rem] border border-rose-200 p-8 text-center dark:border-rose-500/20">
          <h3 className="text-lg font-black text-slate-900 dark:text-white"> Unable to load tasks </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400"> {error} </p>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="focus-ring mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950" > Try again </button>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {searchResults.map((task) => (
            <TaskCard key={task.id} task={task} onDeleted={handleTaskDeleted} />
          ))}
        </div>
      ) : (
        <EmptyState searchQuery={searchQuery} />
      )}
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
  iconClass,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
  accent: string;
}) {
  return (
    <div className="card surface-hover group relative overflow-hidden rounded-[1.5rem] p-5">
      <div className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${accent} to-transparent blur-2xl opacity-70`} />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500"> {label} </p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white"> {value} </p>
        </div>
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconClass}`} > {icon} </div>
      </div>
    </div>
  );
}

function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="card relative mt-5 overflow-hidden rounded-[2rem] border-dashed p-10 text-center sm:p-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />

      <div className="relative">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
          {searchQuery ? <Search size={30} /> : <ClipboardList size={30} />}
        </div>

        <h2 className="mt-7 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white"> {searchQuery ? "No matching tasks" : "Your workspace is empty"} </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400"> {searchQuery ? `We couldn't find any task titles matching "${searchQuery}". Try a different search term.` : "Create your first task and start turning your plans into clear, actionable progress."} </p>
        {searchQuery ? (
          <Link href="/tasks" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/40 dark:hover:text-indigo-400" > <ArrowRight size={16} className="rotate-180" /> Clear search </Link>
        ) : (
          <Link href="/tasks/new" className="focus-ring group mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-600/20 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white" > <Plus size={17} className="transition-transform duration-300 group-hover:rotate-90" /> Create your first task </Link>
        )}
      </div>
    </div>
  );
}