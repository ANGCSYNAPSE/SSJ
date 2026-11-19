"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, BellRing, CheckCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { notificationsApi, type SiteNotification } from "@/lib/api";
import { cn } from "@/lib/utils";
import { CATEGORY_META, timeAgo } from "./meta";

const POLL_MS = 60_000;
const PREVIEW = 6;

/** Fired by anything that changes what is read, so the bell and the notifications page stay in step. */
export const NOTIFICATIONS_CHANGED = "ssj:notifications-changed";

/**
 * The bell in the header: a badge with how many are unread, and a short list of the latest with a link
 * to all of them. Counts refresh every minute and whenever the tab comes back into view.
 */
export default function NotificationBell({ className }: { className?: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<SiteNotification[] | null>(null);
  const [failed, setFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const refreshCount = useCallback(async () => {
    try {
      setUnread((await notificationsApi.count()).unread);
    } catch {
      /* the next check tries again */
    }
  }, []);

  const loadLatest = useCallback(async () => {
    try {
      const feed = await notificationsApi.feed({ limit: PREVIEW });
      setItems(feed.items);
      setUnread(feed.unread);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setUnread(0);
      setItems(null);
      return;
    }
    void refreshCount();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void refreshCount();
    }, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && void refreshCount();
    const onChanged = () => {
      void refreshCount();
      setItems(null);
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener(NOTIFICATIONS_CHANGED, onChanged);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener(NOTIFICATIONS_CHANGED, onChanged);
    };
  }, [user, refreshCount]);

  useEffect(() => {
    if (open) void loadLatest();
  }, [open, loadLatest]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  async function openItem(item: SiteNotification) {
    setOpen(false);
    if (!item.readAt) {
      setItems((list) => list?.map((n) => (n.id === item.id ? { ...n, readAt: new Date().toISOString() } : n)) ?? null);
      setUnread((n) => Math.max(0, n - 1));
      void notificationsApi.markRead([item.id]).then(() => window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED))).catch(() => {});
    }
    router.push(item.link ?? "/notifications");
  }

  async function markAll() {
    setItems((list) => list?.map((n) => ({ ...n, readAt: n.readAt ?? new Date().toISOString() })) ?? null);
    setUnread(0);
    try {
      await notificationsApi.markRead();
      window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED));
    } catch {
      void loadLatest();
    }
  }

  const Icon = unread > 0 ? BellRing : Bell;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[#fff8ec] text-maroon transition-all duration-200 hover:border-[#e87722]/50 hover:bg-[#fde9c8] hover:shadow-sm",
          open && "border-[#e87722]/50 bg-[#fde9c8]",
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        {unread > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex min-w-[20px] items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[11px] font-bold leading-4 text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="fixed inset-x-3 top-[76px] z-[60] overflow-hidden rounded-xl border border-[#d4af37]/40 bg-white shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[390px]"
        >
          <div className="flex items-center justify-between border-b border-[#d4af37]/25 bg-[#fff8ec] px-4 py-3">
            <p className="font-semibold text-maroon">
              {"Notifications"}
              {unread > 0 && <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{unread} new</span>}
            </p>
            {unread > 0 && (
              <button type="button" onClick={markAll} className="flex items-center gap-1 text-xs font-semibold text-[#e87722] hover:underline">
                <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                {"Mark all read"}
              </button>
            )}
          </div>

          <div className="max-h-[min(60vh,420px)] overflow-y-auto">
            {items === null && !failed && (
              <div className="space-y-3 p-4" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-9 w-9 animate-pulse rounded-full bg-maroon/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-2/3 animate-pulse rounded bg-maroon/10" />
                      <div className="h-3 w-full animate-pulse rounded bg-maroon/10" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {failed && (
              <p className="px-4 py-8 text-center text-sm text-[#595656]">
                {"Could not load your notifications. "}
                <button type="button" onClick={() => void loadLatest()} className="font-semibold text-[#e87722] hover:underline">
                  {"Try again"}
                </button>
              </p>
            )}
            {items?.length === 0 && (
              <div className="px-6 py-10 text-center">
                <Bell className="mx-auto h-8 w-8 text-[#d4af37]" aria-hidden />
                <p className="mt-3 font-medium text-maroon">{"You're all caught up"}</p>
                <p className="mt-1 text-sm text-[#595656]">{"Events, seva drives and updates from Shyam Jagat will appear here."}</p>
              </div>
            )}
            {items?.map((item) => {
              const meta = CATEGORY_META[item.category] ?? CATEGORY_META.announcement;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => void openItem(item)}
                  className={cn(
                    "flex w-full gap-3 border-b border-[#d4af37]/15 px-4 py-3 text-left transition-colors hover:bg-[#fff8ec]",
                    !item.readAt && "bg-[#fffbf3]",
                  )}
                >
                  <span className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full", meta.tint)}>
                    <meta.Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className={cn("text-sm text-maroon", !item.readAt ? "font-semibold" : "font-medium")}>
                        {item.title ?? meta.label}
                      </span>
                      {!item.readAt && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e87722]" aria-label="Unread" />}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-[#595656]">{item.message}</span>
                    <span className="mt-1 block text-[11px] text-[#8a8585]">
                      {meta.label} · {timeAgo(item.createdAt)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-[#d4af37]/25 bg-[#fff8ec] px-4 py-3 text-center text-sm font-semibold text-[#e87722] hover:bg-[#fde9c8]"
          >
            {"View all notifications"}
          </Link>
        </div>
      )}
    </div>
  );
}
