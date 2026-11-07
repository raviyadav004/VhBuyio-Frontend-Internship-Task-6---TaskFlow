import Link from "next/link";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import { TaskForm } from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <section className="container-shell max-w-4xl py-10 sm:py-14">
      <div className="mb-8">
        <Link href="/tasks" className=" focus-ring inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 " > <ArrowLeft size={16} /> Back to tasks </Link>
      </div>

      <div className="mb-8">
        <div className=" mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300 " >
          <Sparkles size={14} />
          Create task
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className=" text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white " > Add a new task </h1>
            <p className=" mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300 " > Capture what needs to be done, add useful context, and choose the right status to keep your workflow organized. </p>
          </div>

          <div className=" hidden shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:block dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 " >
            <div className=" grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300 " > <Plus size={20} /> </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className=" pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-500/10 via-transparent to-sky-500/10 blur-xl " />
        <div className="relative"> <TaskForm /> </div>
      </div>

      <div className=" mt-5 rounded-2xl border border-slate-200/80 bg-white/70 px-5 py-4 dark:border-slate-700/80 dark:bg-slate-900/70 " >
        <p className=" text-xs leading-5 text-slate-600 dark:text-slate-300 " > <span className=" font-bold text-slate-800 dark:text-white " > Tip: </span>{" "} Use a clear title and concise description so your task remains easy to understand when you return to it later. </p>
      </div>
    </section>
  );
}