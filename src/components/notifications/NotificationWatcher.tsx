"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { categoryByKey } from "@/components/auth/signup/categories";
import { useToast, type ToastTone } from "@/components/ui/Toast";
import { notificationsApi, type SiteNotification } from "@/lib/api";

const POLL_MS = 60_000;

const TONE: Record<SiteNotification["kind"], ToastTone> = {
  info: "info",
  success: "success",
  warning: "warning",
};

/** A short button label for the pages an admin can link a message to. */
function actionLabel(href: string): string {
  if (href === "/complete-profile") return "Complete my profile";
  if (href === "/") return "Go to home";
  return "Open";
}

/**
 * Shows the messages an admin has sent as toasts while the person is signed
 * in: once when the page loads, then every minute. A message stays on screen
 * until it is dismissed or its button is used, and only then is it marked
 * read — so one that was never acknowledged comes back on the next visit.
 */
export default function NotificationWatcher() {
  const { user } = useAuth();
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

      for (const item of unread) {
        if (shown.current.has(item.id)) continue;
        shown.current.add(item.id);
        toast.show({
          tone: TONE[item.kind] ?? "info",
          title: item.title ?? undefined,
          message: item.message,
          action: item.link ? { label: actionLabel(item.link), href: item.link } : undefined,
          duration: 0,
          onClose: (reason) => {
            if (reason !== "timeout") void notificationsApi.markRead([item.id]).catch(() => {});
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
