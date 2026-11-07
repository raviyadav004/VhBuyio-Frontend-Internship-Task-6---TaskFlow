import { Circle, CircleCheck, CircleDot, type LucideIcon, } from "lucide-react";
import type { TaskStatus } from "@/types/task";

type StatusConfig = {
  label: string;
  icon: LucideIcon;
  className: string;
};

const config: Record<TaskStatus, StatusConfig> = {
  TODO: {
    label: "To Do",
    icon: Circle,
    className: "bg-slate-100/90 text-slate-700 ring-slate-200/80 " + "dark:bg-slate-800/80 dark:text-slate-300 dark:ring-slate-700/80",
  },

  IN_PROGRESS: {
    label: "In Progress",
    icon: CircleDot,
    className: "bg-amber-50/90 text-amber-700 ring-amber-200/80 " + "dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  },

  COMPLETED: {
    label: "Completed",
    icon: CircleCheck,
    className: "bg-emerald-50/90 text-emerald-700 ring-emerald-200/80 " + "dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const item = config[status];
  const Icon = item.icon;

  return (
    <span className = {` inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black tracking-wide ring-1 transition-all duration-200 ${item.className} `} >
      <Icon size={13} strokeWidth={2.6} aria-hidden="true" />
      <span>{item.label}</span>
    </span>
  );
}