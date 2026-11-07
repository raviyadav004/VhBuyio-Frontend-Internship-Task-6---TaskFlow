"use client";

import { AlertTriangle, Loader2, Trash2, X, } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent, } from "react";
import { createPortal } from "react-dom";
import { deleteTaskApi } from "@/lib/api/tasks";

type DeleteButtonProps = {
  id: string;
  onDeleted?: (id: string) => void;
};

export function DeleteButton({
  id,
  onDeleted,
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    if (isDeletingRef.current)
      return;

    setError("");
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen)
      return;

    const triggerElement = triggerRef.current;
    cancelRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab")
        return;

      const dialog = dialogRef.current;
      if (!dialog)
        return;
      const focusableElements = dialog.querySelectorAll<HTMLElement>(
          [
            'button:not([disabled])',
            'input:not([disabled])',
            'a[href]',
            'textarea:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        );

      const focusable = Array.from(focusableElements);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerElement?.isConnected) {
        triggerElement.focus();
      }
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  function openModal() {
    if (isDeletingRef.current)
      return;
    setError("");
    setIsOpen(true);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    if (isDeletingRef.current)
      return;

    isDeletingRef.current = true;
    setIsDeleting(true);
    setError("");
    try {
      await deleteTaskApi(id);
      onDeleted?.(id);
      setIsOpen(false);
    } catch (err) {
      console.error("[TaskFlow] Delete request failed:", err);

      setError( err instanceof Error ? err.message : "We couldn't delete this task. Please try again.", );
    } finally {
      isDeletingRef.current = false;
      setIsDeleting(false);
    }
  }

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <button type="button" tabIndex={-1} aria-label="Close delete confirmation" onClick={closeModal} disabled={isDeleting} className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-md transition-opacity duration-200 dark:bg-black/60 disabled:cursor-not-allowed" />
      <div ref={dialogRef} id={dialogId} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} aria-busy={isDeleting} tabIndex={-1} className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.22)] outline-none animate-in fade-in zoom-in-95 duration-200 dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-[0_30px_100px_rgba(0,0,0,0.55)]" >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
              <AlertTriangle size={23} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <button type="button" onClick={closeModal} disabled={isDeleting} aria-label="Close dialog" className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800 dark:hover:text-slate-200" > <X size={18} strokeWidth={2.2} aria-hidden="true" /> </button>
          </div>

          <div className="mt-6">
            <h2 id={titleId} className="text-[1.35rem] font-black tracking-tight text-slate-950 dark:text-white" > Delete this task? </h2>
            <p id={descriptionId} className="mt-2.5 text-sm leading-6 text-slate-500 dark:text-slate-400" > This task will be permanently removed from your workspace. This action cannot be undone. </p>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/70 px-4 py-3.5 dark:border-amber-500/20 dark:bg-amber-500/10">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <p className="text-xs font-semibold leading-5 text-amber-800 dark:text-amber-300"> Deleting this task cannot be reversed later. </p>
          </div>

          {error && (
            <div role="alert" aria-live="assertive" className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 dark:border-rose-500/20 dark:bg-rose-500/10" >
              <AlertTriangle size={17} className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true" />
              <p className="text-xs font-semibold leading-5 text-rose-700 dark:text-rose-300"> {error} </p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-950/40">
          <button ref={cancelRef} type="button" onClick={closeModal} disabled={isDeleting} className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" > Cancel </button>
          <form onSubmit={handleSubmit} className="w-full sm:w-auto">
            <button type="submit" disabled={isDeleting} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-rose-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-rose-600/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto" >
              {isDeleting ? (
                <> <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Deleting... </>
              ) : (
                <> <Trash2 size={16} strokeWidth={2.3} aria-hidden="true" /> Delete task </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openModal} title="Delete task" aria-label="Delete task" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? dialogId : undefined} className="focus-ring inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 hover:shadow-sm dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400" >
        <Trash2 size={16} strokeWidth={2.2} aria-hidden="true" />
      </button>
      {mounted && isOpen ? createPortal(modal, document.body) : null}
    </>
  );
}