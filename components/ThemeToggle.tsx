"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("taskflow-theme");
    const prefersDark = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDark(shouldUseDark);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = !dark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("taskflow-theme", nextTheme ? "dark" : "light");
    setDark(nextTheme);
  }

  if (!mounted) {
    return ( <div className = "h-10 w-10 rounded-xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-slate-900/70" aria-hidden = "true" /> );
  }

  return (
    <button type = "button" onClick = { toggleTheme } aria-label = { dark ? "Switch to light mode" : "Switch to dark mode" } title = { dark ? "Switch to light mode" : "Switch to dark mode" } className = "group focus-ring relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-slate-200/80 bg-white/75 text-slate-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300" >
      <Sun size = {18} className = {`absolute transition-all duration-300 ${ dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0" }`} />
      <Moon size = {18} className = {`absolute transition-all duration-300 ${ dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100" }`} />
      <span className = "sr-only"> { dark ? "Switch to light mode" : "Switch to dark mode" } </span>
    </button>
  );
}