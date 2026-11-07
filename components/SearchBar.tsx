import { Search } from "lucide-react";

type SearchBarProps = {
  value?: string;
};

export function SearchBar({ value = "" }: SearchBarProps) {
  return (
    <form method="get" role="search" className="relative">
      <Search size={18} strokeWidth={2.2} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" />
      <input
        type="search"
        name="q"
        defaultValue={value}
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
        autoComplete="off"
        className="
          focus-ring w-full rounded-xl
          border border-slate-200/80
          bg-white/80
          py-3.5 pl-11 pr-11
          text-sm font-medium
          text-slate-900
          placeholder:text-slate-400
          outline-none
          shadow-sm
          backdrop-blur-xl
          transition-all duration-200
          hover:border-slate-300
          focus:border-indigo-400
          focus:bg-white
          focus:shadow-md
          focus:shadow-indigo-500/10
          dark:border-slate-700/80
          dark:bg-slate-950/50
          dark:text-slate-100
          dark:placeholder:text-slate-500
          dark:hover:border-slate-600
          dark:focus:border-indigo-400
          dark:focus:bg-slate-950/70
          dark:focus:shadow-indigo-500/10
        "
      />
    </form>
  );
}