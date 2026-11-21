"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { CheckCircle2, CircleAlert, Info, TriangleAlert, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastTone = "info" | "success" | "warning" | "error";

export interface ToastOptions {
  tone?: ToastTone;
  title?: string;
  message: string;
  /** A button inside the toast that goes somewhere (an in-site path). */
  action?: { label: string; href: string };
  /** Milliseconds until it disappears on its own. 0 keeps it until dismissed. Default 6000. */
  duration?: number;
  /** Fires when the toast is closed — by the person, by its button, or by timing out. */
  onClose?: (reason: "dismissed" | "action" | "timeout") => void;
}

interface ToastItem extends ToastOptions {
  id: number;
  tone: ToastTone;
}

interface ToastApi {
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
  /** Removes these toasts without running their onClose (for example when the person signs out). */
  clear: (ids: Iterable<number>) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const TONES: Record<ToastTone, { icon: LucideIcon; bar: string; iconColor: string }> = {
  info: { icon: Info, bar: "bg-sky-500", iconColor: "text-sky-600" },
  success: { icon: CheckCircle2, bar: "bg-green-500", iconColor: "text-green-600" },
  warning: { icon: TriangleAlert, bar: "bg-primary", iconColor: "text-primary" },
  error: { icon: CircleAlert, bar: "bg-red-500", iconColor: "text-red-600" },
};

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: (reason: "dismissed" | "action" | "timeout") => void;
}) {
  const { icon: Icon, bar, iconColor } = TONES[toast.tone];
  const duration = toast.duration ?? 6000;

  useEffect(() => {
    if (duration === 0) return;
    const timer = window.setTimeout(() => onClose("timeout"), duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role={toast.tone === "error" ? "alert" : "status"}
      className="pointer-events-auto relative flex w-full overflow-hidden rounded-xl border border-border bg-white shadow-[0_12px_32px_rgba(107,31,31,0.18)]"
    >
      <span className={cn("w-1.5 shrink-0", bar)} aria-hidden />
      <div className="flex flex-1 items-start gap-3 p-3.5">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {toast.title && <p className="text-sm font-bold text-maroon">{toast.title}</p>}
          <p className="text-[13px] leading-snug text-foreground">{toast.message}</p>
          {toast.action && (
            <Link
              href={toast.action.href}
              onClick={() => onClose("action")}
              className="mt-1 w-fit rounded-full bg-primary px-3.5 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              {toast.action.label}
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={() => onClose("dismissed")}
          aria-label="Dismiss"
          className="shrink-0 text-muted-foreground transition-colors hover:text-maroon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const current = useRef<ToastItem[]>([]);
  current.current = toasts;
  const closed = useRef(new Set<number>());

  const close = useCallback((id: number, reason: "dismissed" | "action" | "timeout") => {
    // Closed once only, even if a timeout and a click land together.
    if (closed.current.has(id)) return;
    closed.current.add(id);
    const found = current.current.find((t) => t.id === id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
    found?.onClose?.(reason);
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { ...options, id, tone: options.tone ?? "info" }]);
    return id;
  }, []);

  const dismiss = useCallback((id: number) => close(id, "dismissed"), [close]);
  const clear = useCallback((ids: Iterable<number>) => {
    const gone = new Set(ids);
    for (const id of gone) closed.current.add(id);
    setToasts((prev) => prev.filter((t) => !gone.has(t.id)));
  }, []);
  const api = useMemo<ToastApi>(() => ({ show, dismiss, clear }), [show, dismiss, clear]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Bottom corner, clear of the header: the account menu, bell and welcome hint all open at the top right. */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col gap-2.5 sm:bottom-6 sm:right-6">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={(reason) => close(toast.id, reason)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}
