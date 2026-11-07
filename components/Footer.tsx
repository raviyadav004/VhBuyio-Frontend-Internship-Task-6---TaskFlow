import Link from "next/link";
import { ArrowUpRight, CheckSquare, Heart, } from "lucide-react";

const productLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Task workspace", href: "/tasks" },
  { label: "Create a task", href: "/tasks/new" },
] as const;

const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "SQLite",
  "Zod",
] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ravi04y?mibextid=ZbWKwL",
    platform: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ravi04y?exln=d3I1dHFiOHQ5NDdo",
    platform: "instagram",
  },
  {
    label: "Email",
    href: "mailto:ry3683948@gmail.com",
    platform: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/raviyadav004",
    platform: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ravi-yadav-36bb0b2b7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    platform: "linkedin",
  },
] as const;

type SocialPlatform =
  | "facebook"
  | "instagram"
  | "mail"
  | "github"
  | "linkedin";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "facebook") {
    return ( <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4.5 w-4.5" > <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.438H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.975h-1.513c-1.49 0-1.956.93-1.956 1.885v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" /> </svg> );
  }

  if (platform === "instagram") {
    return ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4.5 w-4.5" > <rect x="3" y="3" width="18" height="18" rx="5" /> <circle cx="12" cy="12" r="4" /> <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /> </svg> );
  }

  if (platform === "mail") {
    return ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4.5 w-4.5" > <rect x="3" y="5" width="18" height="14" rx="2.5" /> <path d="m4 7 8 6 8-6" /> </svg> );
  }

  if (platform === "github") {
    return ( <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4.5 w-4.5" > <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0 0 12 .5Z" /> </svg> );
  }
  return ( <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4.5 w-4.5" > <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.42v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" /> </svg> );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  return ( <footer className="relative isolate mt-auto overflow-hidden border-t border-slate-200/80 bg-slate-50 dark:border-slate-800/80 dark:bg-[#090e1d]">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" >
        <div className="absolute -left-40 -top-40 h-100 w-100 rounded-full bg-indigo-500/7 blur-3xl dark:bg-indigo-500/12" />
        <div className="absolute -right-32 top-0 h-100 w-100 rounded-full bg-violet-500/6 blur-3xl dark:bg-violet-500/9" />
        <div className="absolute bottom-0 left-1/2 h-64 w-150 -translate-x-1/2 rounded-full bg-indigo-400/5 blur-3xl dark:bg-indigo-500/7" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/45 to-transparent" />
      </div>

      <div className="container-shell relative">
        {/* Main footer content */}
        <div className="grid gap-9 py-9 sm:py-10 md:grid-cols-[1.3fr_0.7fr_1fr] md:gap-8 lg:gap-14 lg:py-12">
          {/* Brand section */}
          <div className="max-w-sm">
            <Link href="/" aria-label="TaskFlow home" className="focus-ring group inline-flex items-center gap-3 rounded-xl" >
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-[0_10px_28px_rgba(79,70,229,0.28)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_32px_rgba(79,70,229,0.36)] motion-reduce:transition-none">
                <span aria-hidden="true" className="absolute -inset-4 rounded-full bg-indigo-300/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <CheckSquare size={22} strokeWidth={2.5} aria-hidden="true" className="relative z-10 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none" />
              </span>

              <span className="flex items-center text-[1.4rem] font-black tracking-[-0.045em]">
                <span className="text-slate-950 dark:text-white"> Task </span>
                <span className="text-indigo-600 dark:text-indigo-400"> Flow </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400"> A focused workspace to capture ideas, organize priorities, and turn everyday work into meaningful progress. </p>
            {/* Brand tagline */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/80 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/8 dark:text-indigo-300"> <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]" /> Focus · Organize · Finish </div>
            {/* Social media links */}
            <div className="mt-5">
              <p className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500"> Connect with me </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target={ social.platform === "mail" ? undefined : "_blank" } rel={ social.platform === "mail" ? undefined : "noopener noreferrer" }
                    aria-label={ social.platform === "mail" ? "Send me an email" : `Visit my ${social.label} profile (opens in a new tab)` }
                    title={social.label}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 shadow-sm shadow-slate-900/2.5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_8px_20px_rgba(79,70,229,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:border-slate-700/80 dark:bg-slate-900/65 dark:text-slate-400 dark:shadow-none dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 motion-reduce:transition-none" >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore section */}
          <nav aria-label="Footer product navigation">
            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 dark:text-slate-100"> Explore </h2>
            <ul className="mt-5 space-y-3.5">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:text-slate-400 dark:hover:text-indigo-300 motion-reduce:transition-none" >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Technology section */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 dark:text-slate-100"> Technology </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400"> Built with modern technologies for a fast, reliable, and maintainable experience. </p>
            <ul className="mt-4 flex max-w-sm flex-wrap gap-2" aria-label="Technology stack" >
              {technologies.map((technology) => (
                <li key={technology} className="rounded-lg border border-slate-200/90 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm shadow-slate-900/2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700/80 dark:bg-slate-900/65 dark:text-slate-300 dark:shadow-none dark:hover:border-indigo-400/40 dark:hover:text-indigo-300 motion-reduce:transition-none" > {technology} </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom signature */}
        <div className="flex flex-col gap-3 border-t border-slate-200/80 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-slate-800/80">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400"> © {currentYear} TaskFlow. All rights reserved. </p>
          <p className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"> Crafted with <Heart size={12} fill="currentColor" aria-hidden="true" className="text-rose-500" /> by <span className="font-bold text-slate-800 dark:text-slate-200"> Ravi Yadav </span> </p>
        </div>
      </div>
    </footer>
  );
}