"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";
import { NOTIFICATIONS_CHANGED } from "@/components/notifications/NotificationBell";
import { CATEGORY_META, FILTER_CATEGORIES, timeAgo } from "@/components/notifications/meta";
import { notificationsApi, type NotificationCategory, type SiteNotification } from "@/lib/api";
import { cn } from "@/lib/utils";

type Filter = "all" | "unread" | NotificationCategory;

function NotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [items, setItems] = useState<SiteNotification[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [failed, setFailed] = useState(false);

  const query = useCallback(
    (before?: string | null) =>
      notificationsApi.feed({
        limit: 20,
        before,
        unread: filter === "unread",
        category: filter === "all" || filter === "unread" ? null : filter,
      }),
    [filter],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    query()
      .then((feed) => {
        if (cancelled) return;
        setItems(feed.items);
        setCursor(feed.nextCursor);
        setUnread(feed.unread);
      })
      .catch(() => !cancelled && setFailed(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [query]);

  async function loadMore() {
    if (!cursor) return;
    setMore(true);
    try {
      const feed = await query(cursor);
      setItems((list) => [...list, ...feed.items]);
      setCursor(feed.nextCursor);
    } catch {
      setFailed(true);
    } finally {
      setMore(false);
    }
  }

  function read(ids?: string[]) {
    const now = new Date().toISOString();
    setItems((list) => list.map((n) => (!ids || ids.includes(n.id) ? { ...n, readAt: n.readAt ?? now } : n)));
    setUnread((n) => (ids ? Math.max(0, n - ids.length) : 0));
    void notificationsApi
      .markRead(ids)
      .then(() => window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED)))
      .catch(() => {});
  }

  function open(item: SiteNotification) {
    if (!item.readAt) read([item.id]);
    if (item.link) router.push(item.link);
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: unread > 0 ? `Unread (${unread})` : "Unread" },
    ...FILTER_CATEGORIES.map((key) => ({ key: key as Filter, label: CATEGORY_META[key].label })),
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon">{"Notifications"}</h1>
          <p className="mt-1 text-sm text-[#595656]">{"Events, seva drives, updates and the status of your registration."}</p>
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={() => read()}
            className="flex items-center gap-1.5 rounded-lg border border-[#e87722] px-3 py-2 text-sm font-semibold text-[#e87722] transition-colors hover:bg-[#fde9c8]"
          >
            <CheckCheck className="h-4 w-4" aria-hidden />
            {"Mark all as read"}
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter notifications">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.key
                ? "border-[#e87722] bg-[#e87722] text-white"
                : "border-[#d4af37]/40 bg-white text-maroon hover:bg-[#fff8ec]",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-white shadow-sm">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#595656]">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {"Loading…"}
          </div>
        )}

        {!loading && failed && (
          <p className="px-6 py-14 text-center text-sm text-[#595656]">{"Could not load your notifications. Please refresh and try again."}</p>
        )}

        {!loading && !failed && items.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Bell className="mx-auto h-9 w-9 text-[#d4af37]" aria-hidden />
            <p className="mt-3 font-medium text-maroon">{filter === "unread" ? "Nothing unread" : "Nothing here yet"}</p>
            <p className="mt-1 text-sm text-[#595656]">{"When there is an event, a seva drive or news from Shyam Jagat, you will see it here."}</p>
          </div>
        )}

        {!loading &&
          items.map((item) => {
            const meta = CATEGORY_META[item.category] ?? CATEGORY_META.announcement;
            return (
              <div
                key={item.id}
                className={cn("flex gap-4 border-b border-[#d4af37]/15 px-4 py-4 last:border-0 sm:px-5", !item.readAt && "bg-[#fffbf3]")}
              >
                <span className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full", meta.tint)}>
                  <meta.Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className={cn("text-maroon", item.readAt ? "font-medium" : "font-semibold")}>{item.title ?? meta.label}</p>
                    <span className="shrink-0 text-xs text-[#8a8585]">{timeAgo(item.createdAt)}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[#595656]">{item.message}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-maroon/5 px-2 py-0.5 text-maroon">{meta.label}</span>
                    {item.link && (
                      <button type="button" onClick={() => open(item)} className="font-semibold text-[#e87722] hover:underline">
                        {"Open"}
                      </button>
                    )}
                    {!item.readAt && (
                      <button type="button" onClick={() => read([item.id])} className="font-medium text-[#595656] hover:underline">
                        {"Mark as read"}
                      </button>
                    )}
                  </div>
                </div>
                {!item.readAt && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#e87722]" aria-label="Unread" />}
              </div>
            );
          })}
      </div>

      {cursor && !loading && (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={more}
            className="rounded-lg border border-[#d4af37]/50 bg-white px-5 py-2 text-sm font-semibold text-maroon transition-colors hover:bg-[#fff8ec] disabled:opacity-60"
          >
            {more ? "Loading…" : "Load older"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <RequireAuth>
      <NotificationsPage />
    </RequireAuth>
  );
}
