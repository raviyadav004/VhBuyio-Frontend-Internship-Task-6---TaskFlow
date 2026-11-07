"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { CheckSquare, LayoutDashboard, ListTodo, Plus, type LucideIcon, } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type NavigationItem = {
  href: Route;
  label: string;
  icon: LucideIcon;
  exact: boolean;
};

const navigation: NavigationItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/tasks",
    label: "Tasks",
    icon: ListTodo,
    exact: false,
  },
];

function isNavigationItemActive(
  pathname: string,
  item: NavigationItem,
): boolean {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/80" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />
      <div className="relative">
        {/* Desktop and tablet header */}
        <div className="mx-auto flex h-19 w-full items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10 2xl:px-12">
          {/* Brand */}
          <Link href="/" className="focus-ring group flex shrink-0 items-center gap-3 rounded-xl" aria-label="TaskFlow home" >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-[0_10px_25px_rgba(79,70,229,0.28)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:shadow-[0_14px_32px_rgba(79,70,229,0.38)] motion-reduce:transition-none">
              <span aria-hidden="true" className="absolute -inset-4 rounded-full bg-indigo-400/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <CheckSquare size={22} strokeWidth={2.5} aria-hidden="true" className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </span>

            <div className="hidden sm:block">
              <div className="flex items-center leading-none">
                <span className="text-[1.2rem] font-black tracking-[-0.035em] text-slate-950 dark:text-white"> Task </span>
                <span className="text-[1.2rem] font-black tracking-[-0.035em] text-indigo-600 dark:text-indigo-400"> Flow </span>
              </div>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500"> Focus · Organize · Finish </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center md:flex" aria-label="Main navigation" >
            <div className="inline-flex items-center rounded-2xl border border-slate-200/80 bg-slate-100/75 p-1 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isNavigationItemActive(pathname, item);
                return (
                  <Link key = {item.href} href = {item.href} aria-current = {isActive ? "page" : undefined} className = {`group relative inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold transition-all duration-200 lg:px-4 motion-reduce:transition-none ${ isActive ? "bg-white text-indigo-600 shadow-[0_3px_12px_rgba(15,23,42,0.08)] dark:bg-slate-800 dark:text-indigo-400 dark:shadow-none" : "text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white" }`} >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2.2} aria-hidden="true" className={`transition-transform duration-200 motion-reduce:transition-none ${ isActive ? "scale-105" : "group-hover:scale-110" }`} />
                    <span>{item.label}</span>
                    {isActive && ( <span aria-hidden="true" className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-indigo-600 dark:bg-indigo-400" /> )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link href="/tasks/new" className="focus-ring group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-950 px-3.5 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_25px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_12px_30px_rgba(79,70,229,0.25)] dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white sm:px-4 motion-reduce:transition-none" >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus size={17} strokeWidth={2.7} aria-hidden="true" className="relative z-10 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
              <span className="relative z-10 hidden sm:inline"> New Task </span>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="border-t border-slate-200/60 bg-white/65 px-3 py-2 backdrop-blur-xl md:hidden dark:border-slate-800/70 dark:bg-slate-950/65">
          <nav className="container-shell grid grid-cols-2 gap-2" aria-label="Mobile navigation" >
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isNavigationItemActive(pathname, item);
              return (
                <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`focus-ring group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-extrabold transition-all duration-200 motion-reduce:transition-none ${ isActive ? "bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white" }`} >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2.2} aria-hidden="true" className="transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none" />
                  <span>{item.label}</span>
                  {isActive && ( <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-indigo-600 dark:bg-indigo-400" /> )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}