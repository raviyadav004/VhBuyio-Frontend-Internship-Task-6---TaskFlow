export default function Loading() {
  return (
    <section className="container-shell page-enter py-8 sm:py-12 lg:py-14">
      <div className=" relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/65 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/55 dark:shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10 " >
        <div className=" pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/10 " />
        <div className=" pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10 " />

        <div className="relative animate-pulse">
          <div className="h-8 w-36 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-6 h-12 w-3/4 max-w-2xl rounded-xl bg-slate-200 dark:bg-slate-800 sm:h-16" />
          <div className="mt-4 h-4 w-full max-w-2xl rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-2/3 max-w-xl rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="h-10 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className=" relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-[0_20px_50px_rgba(0,0,0,0.18)] " >
            <div className="animate-pulse">
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-9 w-14 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="absolute right-5 top-5 h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="animate-pulse">
            <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className=" h-14 animate-pulse rounded-2xl border border-slate-200/80 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 " />
      </div>

      <div className="mt-9">
        <div className="animate-pulse">
          <div className="h-8 w-44 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-64 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className=" overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.055)] dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-[0_20px_50px_rgba(0,0,0,0.20)] " >
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="mt-5 h-6 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-5 flex gap-2">
                  <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className=" mt-5 border-t border-slate-100 pt-4 dark:border-slate-800 " >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="mt-2 h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <div className="flex gap-1">
                      <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                      <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}