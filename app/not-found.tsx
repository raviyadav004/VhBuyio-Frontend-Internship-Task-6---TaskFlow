import Link from "next/link";
import { ArrowLeft, ClipboardList, Home, SearchX, Sparkles, } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-[70vh] place-items-center py-12 sm:py-16">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-[0_25px_90px_rgba(0,0,0,0.3)] sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />

        <div className="relative">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-indigo-700 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"> <Sparkles size={14} /> Page not found </div>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400"> <SearchX size={34} strokeWidth={2} /> </div>
          <p className="mt-7 text-7xl font-black tracking-[-0.05em] text-indigo-600 dark:text-indigo-400 sm:text-8xl"> 404 </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl"> Task not found </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base"> The task you requested does not exist, may have been removed, or the link you followed is no longer available. </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/tasks" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-600/20 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white" > <ClipboardList size={16} /> View all tasks </Link>
            <Link href="/" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/40 dark:hover:text-indigo-400" > <Home size={16} /> Go home </Link>
          </div>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/50">
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400"> If you followed an old task link, return to your workspace and choose a task from the current list. </p>
          </div>

          <Link href="/tasks" className="focus-ring mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition-colors hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400" > <ArrowLeft size={13} /> Back to workspace </Link>
        </div>
      </div>
    </section>
  );
}