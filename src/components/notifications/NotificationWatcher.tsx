"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { categoryByKey } from "@/components/auth/signup/categories";
import { useToast, type ToastTone } from "@/components/ui/Toast";
import { notificationsApi, type SiteNotification } from "@/lib/api";
import { ACCOUNT_CHANGED, NOTIFICATIONS_CHANGED } from "./NotificationBell";

// A refund or payment message should show up within seconds, not minutes; the check is one small request.
const POLL_MS = 15_000;
/** Only something sent in the last day pops up; older unread ones wait quietly in the bell. */
const FRESH_MS = 24 * 60 * 60 * 1000;
/** A pile of unread messages never becomes a wall of toasts. */
const MAX_TOASTS = 3;

const TONE: Record<SiteNotification["kind"], ToastTone> = {
  info: "info",
  success: "success",
  warning: "warning",
};

/** A short button label for the pages an admin can link a message to. */
function actionLabel(href: string): string {
  if (href === "/complete-profile") return "Complete my profile";
  if (href === "/") return "Go to home";
  if (href.startsWith("/events")) return "View event";
  if (href.startsWith("/initiatives")) return "See initiative";
  if (href.startsWith("/blog")) return "Read more";
  if (href.startsWith("/donation")) return "Donate";
  if (href.startsWith("/profile")) return "Open my profile";
  return "Open";
}

/**
 * Shows the messages an admin has sent as toasts while the person is signed
 * in: once when the page loads, then every minute. A message stays on screen
 * until it is dismissed or its button is used, and only then is it marked
 * read. Only recent ones (up to three) pop up; everything else is in the bell.
 */
export default function NotificationWatcher() {
  const { user, refreshUser } = useAuth();
  const toast = useToast();
  const pathname = usePathname();
  const shown = useRef(new Set<string>());
  const reminded = useRef<string | null>(null);

  // Someone who registered but left details blank is reminded once per visit,
  // even if no admin has written to them. Not while they're already on the
  // page that fixes it, or just after submitting a registration.
  useEffect(() => {
    if (!user) {
      reminded.current = null;
      return;
    }
    if (pathname.startsWith("/complete-profile") || pathname.startsWith("/signup")) return;
    const unfinished = user.profiles?.find((p) => p.isComplete === false);
    if (!unfinished || reminded.current === user.id) return;
    reminded.current = user.id;
    const label = categoryByKey(unfinished.category)?.label ?? unfinished.category;
    const left = unfinished.missing?.length ?? 0;
    toast.show({
      tone: "warning",
      title: "Finish your profile",
      message: `Your ${label.toLowerCase()} registration still needs ${left} detail${left === 1 ? "" : "s"}. It only takes a minute.`,
      action: { label: "Complete my profile", href: "/complete-profile" },
      duration: 10000,
    });
  }, [user, pathname, toast]);

  useEffect(() => {
    if (!user) {
      shown.current.clear();
      return;
    }

    let cancelled = false;

    async function check() {
      let unread: SiteNotification[];
      try {
        unread = await notificationsApi.unread();
      } catch {
        return; // A missed check is fine; the next one tries again.
      }
      if (cancelled) return;

      const fresh = unread.filter((n) => !shown.current.has(n.id) && Date.now() - new Date(n.createdAt).getTime() < FRESH_MS);
      // The rest are still in the bell; remember them so they never pop up later.
      for (const n of unread) shown.current.add(n.id);
      // A payment, refund or registration decision changes numbers on the page: refresh them without a reload.
      if (fresh.some((n) => n.category === "payment" || n.category === "registration")) {
        void refreshUser();
        window.dispatchEvent(new Event(ACCOUNT_CHANGED));
      }
      for (const item of fresh.slice(0, MAX_TOASTS)) {
        toast.show({
          tone: TONE[item.kind] ?? "info",
          title: item.title ?? undefined,
          message: item.message,
          action: item.link ? { label: actionLabel(item.link), href: item.link } : undefined,
          duration: 0,
          onClose: (reason) => {
            if (reason !== "timeout") {
              void notificationsApi.markRead([item.id]).then(() => window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED))).catch(() => {});
            }
          },
        });
      }
    }

    void check();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void check();
    }, POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [user, toast]);

  return null;
}
