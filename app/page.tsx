import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Database, ListChecks, Search, ShieldCheck, Sparkles, Target, Zap, } from "lucide-react";

const capabilities = [
  {
    icon: CheckCircle2,
    title: "Complete CRUD",
    text: "Create, update, manage and delete tasks through a clean, reliable workflow.",
    label: "Core workflow",
  },
  {
    icon: Search,
    title: "Instant search",
    text: "Find exactly what you need with fast title-based workspace search.",
    label: "Productivity",
  },
  {
    icon: Database,
    title: "Persistent storage",
    text: "Keep your task data safely persisted through SQLite and Prisma.",
    label: "Reliable data",
  },
  {
    icon: ShieldCheck,
    title: "Validated input",
    text: "Protect task creation and updates with structured Zod validation.",
    label: "Built-in safety",
  },
];

const workflow = [
  {
    number: "01",
    icon: Target,
    title: "Capture",
    text: "Turn an idea into a clearly defined task with the information that matters.",
  },
  {
    number: "02",
    icon: ListChecks,
    title: "Organize",
    text: "Keep your workspace structured by searching tasks and updating their status.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Complete",
    text: "Move work forward, finish what matters and keep your progress visible.",
  },
];

const principles = [
  "Simple task creation",
  "Persistent task data",
  "Fast workspace search",
  "Structured validation",
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-20%] h-155 w-155 -translate-x-1/2 rounded-full bg-indigo-500/[0.10] blur-3xl dark:bg-indigo-500/[0.13]" />
          <div className="absolute left-[-12%] top-[18%] h-105 w-105 rounded-full bg-violet-500/[0.07] blur-3xl dark:bg-violet-500/[0.08]" />
          <div className="absolute right-[-12%] top-[12%] h-110 w-110 rounded-full bg-cyan-400/[0.07] blur-3xl dark:bg-cyan-400/[0.08]" />
          <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.025]" style={{
              backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute left-1/2 top-[48%] h-125 w-225 -translate-x-1/2 rounded-full bg-indigo-500/[0.025] blur-3xl" />
        </div>

        <div className="container-shell">
          <div className="flex min-h-[calc(100vh-76px)] items-center justify-center py-16 sm:py-20 lg:py-24">
            <div className="page-enter flex w-full max-w-6xl flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-indigo-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-indigo-300 hover:shadow-md dark:border-indigo-400/20 dark:bg-slate-900/60 dark:text-indigo-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                </span>
                TaskFlow workspace
                <Sparkles size={13} className="text-indigo-500 dark:text-indigo-400" />
              </div>

              <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.7rem] xl:text-[6.4rem] dark:text-white"> Turn everyday work into{" "} <span className="gradient-text">clear progress.</span> </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400"> A focused task management workspace designed to help you capture work, organize priorities, track progress and finish what matters. </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/tasks" className="focus-ring group inline-flex min-w-[190px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-600/20 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white" > Open Task Manager <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /> </Link>
                <Link href="/tasks/new" className="focus-ring inline-flex min-w-[160px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-extrabold text-slate-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300" > Create a task </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2"> <CheckCircle2 size={16} className="text-emerald-500" /> Full CRUD workflow </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-800" />
                <span className="inline-flex items-center gap-2"> <Zap size={16} className="text-amber-500" /> Server-first architecture </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-800" />
                <span className="inline-flex items-center gap-2"> <ShieldCheck size={16} className="text-indigo-500" /> Zod validation </span>
              </div>

              <div className="mt-14 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 text-left shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/[0.07] dark:bg-slate-900/55">
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  <Metric value="100%" label="Focused workflow" />
                  <Metric value="CRUD" label="Task operations" border />
                  <Metric value="SQLite" label="Persistent storage" border />
                  <Metric value="Zod" label="Input validation" border />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                <span className="inline-flex items-center gap-2"> <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Production-ready structure </span>
                <span className="hidden h-3 w-px bg-slate-200 sm:block dark:bg-slate-800" />
                <span>Next.js</span>
                <span className="hidden h-3 w-px bg-slate-200 sm:block dark:bg-slate-800" />
                <span>Prisma</span>
                <span className="hidden h-3 w-px bg-slate-200 sm:block dark:bg-slate-800" />
                <span>SQLite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-slate-200/70 bg-white/35 py-20 dark:border-white/[0.06] dark:bg-slate-950/20 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/[0.045] blur-3xl" />
        <div className="container-shell relative">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400"> Built for focus </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"> Everything you need. <br /> Nothing you don&apos;t. </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400"> TaskFlow keeps task management intentionally focused so your workspace stays useful instead of becoming another source of complexity. </p>
            </div>
            <Link href="/tasks" className="focus-ring group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/[0.08] dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:text-indigo-400" > Explore workspace <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200/80 hover:shadow-xl hover:shadow-indigo-500/[0.06] dark:border-white/[0.07] dark:bg-slate-900/55 dark:hover:border-indigo-400/20 dark:hover:shadow-black/20" >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/[0.07] blur-2xl transition-all duration-500 group-hover:bg-indigo-500/[0.13]" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:scale-105 dark:bg-indigo-500/10 dark:text-indigo-400"> <Icon size={20} /> </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300 dark:text-slate-600"> 0{index + 1} </span>
                    </div>

                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400"> {item.label} </p>
                    <h3 className="mt-2 text-lg font-black tracking-tight text-slate-900 dark:text-white"> {item.title} </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400"> {item.text} </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/60 dark:border-white/[0.06] dark:bg-slate-950/35">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[20%] h-72 w-72 rounded-full bg-indigo-500/[0.06] blur-3xl" />
          <div className="absolute bottom-[10%] right-[-10%] h-72 w-72 rounded-full bg-cyan-400/[0.05] blur-3xl" />
        </div>

        <div className="container-shell relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400"> Simple workflow </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl dark:text-white"> Work should feel <span className="gradient-text"> straightforward.</span> </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400"> A clear workflow keeps your attention on the work instead of the tool you use to manage it. </p>

              <div className="mt-8">
                <Link href="/tasks/new" className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl" > Start with a task <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" /> </Link>
              </div>
            </div>

            <div className="space-y-4"> {workflow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.number} className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg dark:border-white/[0.07] dark:bg-slate-900/60 dark:hover:border-indigo-400/20" >
                    <div className="flex gap-5">
                      <div className="relative shrink-0">
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"> <Icon size={20} /> </div>
                        {index < workflow.length - 1 && ( <div className="absolute left-1/2 top-[calc(100%+5px)] hidden h-4 w-px -translate-x-1/2 bg-linear-to-b from-indigo-300 to-transparent sm:block dark:from-indigo-500/30" /> )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white"> {item.title} </h3>
                          <span className="text-[10px] font-black tracking-[0.2em] text-indigo-400 dark:text-indigo-500"> {item.number} </span>
                        </div>
                        <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400"> {item.text} </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 sm:py-24">
        <div className="overflow-hidden rounded-4xl border border-slate-200/80 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/[0.07] dark:bg-slate-900/50">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-slate-950 px-7 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-indigo-300"> <Sparkles size={20} /> </div>
                <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-indigo-300"> Designed with intent </p>
                <h2 className="mt-3 max-w-md text-2xl font-black tracking-tight text-white sm:text-3xl"> A workspace that stays out of your way. </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-400"> TaskFlow focuses on the essentials: clear tasks, reliable data and a workflow that is easy to understand. </p>
              </div>
            </div>

            <div className="p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400"> Core principles </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {principles.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3.5 dark:border-white/[0.07] dark:bg-white/[0.025]" >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"> <Check size={14} strokeWidth={3} /> </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300"> {item} </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-slate-200/80 pt-6 dark:border-white/[0.07]">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"> <ShieldCheck size={17} /> </div>
                <div>
                  <p className="text-xs font-black text-slate-800 dark:text-slate-200"> Structured by design </p>
                  <p className="mt-0.5 text-xs text-slate-400"> Clean architecture · Validated data · Persistent storage </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-20 sm:pb-24">
        <div className="relative overflow-hidden rounded-4xl bg-slate-950 px-7 py-14 text-center shadow-2xl shadow-slate-950/20 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-36 -right-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.045]" style={{
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-indigo-300 shadow-lg"> <Sparkles size={23} /> </div>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-indigo-300"> Your next step </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl"> Ready to bring your work under control? </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"> Create your first task, organize your workspace and start turning plans into measurable progress. </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/tasks/new" className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-400 hover:via-indigo-500 hover:to-violet-500 hover:shadow-xl hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:shadow-indigo-500/25" > Create your first task <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" /> </Link>
              <Link href="/tasks" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1]" > View workspace </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({
  value,
  label,
  border = false,
}: {
  value: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div className={`px-5 py-5 sm:px-6 ${ border ? "border-l border-slate-200/80 dark:border-white/[0.07]" : "" }`} >
      <p className="text-lg font-black tracking-tight text-slate-950 dark:text-white"> {value} </p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.13em] text-slate-400 dark:text-slate-500"> {label} </p>
    </div>
  );
}