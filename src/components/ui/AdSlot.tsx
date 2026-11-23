"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/api";
import AdCreative, { SLOT_DIMS, type AdCreativeData, type AdSize } from "@/components/ui/AdCreative";

interface Ad extends AdCreativeData {
  id: string;
  placement: AdSize;
  page: string | null;
  /** The 1st, 2nd... spot of its size on the page (top to bottom); empty = any spot. */
  slotPosition?: number | null;
  advertiser?: string | null;
  priority?: "low" | "medium" | "high";
}

/** How the slots rotate; set by the admin (Advertisement page). */
interface Rotation {
  seconds: number;
  /** tiles: the current ad in the middle with the next and previous behind it at the sides; fade: one ad at a time. */
  transition: "tiles" | "fade";
  pauseOnHover: boolean;
}
const DEFAULT_ROTATION: Rotation = { seconds: 6, transition: "tiles", pauseOnHover: true };

/**
 * Where each placement area chosen in the admin panel is shown. An ad whose
 * area is missing, "All Pages" or "Site-wide Popup" is eligible everywhere.
 */
const pageRoutes: Record<string, string[]> = {
  Homepage: ["/"],
  "Home Page Hero": ["/"],
  "Home Page Sidebar": ["/"],
  "Knowledge Hub": ["/baba-shyam", "/blog"],
  "Blog Listing": ["/blog"],
  "Events Page": ["/events"],
  "Temple Directory": ["/temple-directory"],
  "Donation Page": ["/donation"],
  "Initiatives Page": ["/initiatives"],
  "About Page": ["/about"],
  "Dharamshala Page": ["/dharamshala"],
  "Artists Page": ["/artists"],
  "Organisations Page": ["/organisations"],
  "Baba Shyam Page": ["/baba-shyam"],
  "Team Pages": ["/team"],
  "Registration Pages": ["/artist-registration", "/dancer-registration", "/musician-registration", "/temple-registration"],
};

const priorityRank = { high: 0, medium: 1, low: 2 } as const;

/** The footer's own spot, which is on every page. Its ads go there and nowhere else. */
const FOOTER_AREA = "Footer (all pages)";

function matchesPage(ad: Ad, pathname: string, footer: boolean): boolean {
  if (ad.page === FOOTER_AREA) return footer;
  if (footer) return false;
  if (!ad.page || ad.page === "All Pages" || ad.page === "Site-wide Popup") return true;
  const routes = pageRoutes[ad.page];
  // An area the site does not know about is treated as site-wide rather than hidden.
  if (!routes) return true;
  return routes.some((route) => (route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`)));
}

function resolveImage(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

/**
 * A page can have several slots of the same size (the homepage has two leaderboards). Each slot claims a place in
 * line when it appears, so the slots start on different ads instead of all showing the same one.
 */
const claims = new Map<string, Map<string, number>>();

// One request each, shared by every slot on the page (and across navigations).
let adsRequest: Promise<Ad[]> | null = null;
function loadAds(): Promise<Ad[]> {
  if (!adsRequest) {
    adsRequest = fetch(`${API_URL}/api/v1/ads`)
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => (Array.isArray(payload?.data) ? (payload.data as Ad[]) : []))
      .catch(() => {
        adsRequest = null;
        return [];
      });
  }
  return adsRequest;
}

let rotationRequest: Promise<Rotation> | null = null;
function loadRotation(): Promise<Rotation> {
  if (!rotationRequest) {
    rotationRequest = fetch(`${API_URL}/api/v1/ads/rotation`)
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        const data = payload?.data ?? {};
        // An older saved value ("slide") means nothing now: show the tiles.
        return { ...DEFAULT_ROTATION, ...data, transition: data.transition === "fade" ? "fade" : "tiles" } as Rotation;
      })
      .catch(() => {
        rotationRequest = null;
        return DEFAULT_ROTATION;
      });
  }
  return rotationRequest;
}

/** Counts a click for the admin's numbers. Fire and forget: it must never hold up the visitor's navigation. */
function reportClick(id: string) {
  const url = `${API_URL}/api/v1/ads/${id}/click`;
  try {
    if (navigator.sendBeacon?.(url)) return;
    void fetch(url, { method: "POST", keepalive: true });
  } catch {
    /* counting is optional */
  }
}

/** The width the slot has to work with, kept up to date as the window changes. */
function useStageWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

/** How big the neighbouring tiles are next to the one in the middle, and how much of each shows beside it. */
const SIDE_SCALE = 0.84;
const MIN_PEEK = 34;
const EASE = "0.75s cubic-bezier(.4,.1,.2,1)";

/**
 * Advertisement placement. Shows the live ads for this slot size and page. With several ads, the current one sits in the
 * middle, full size, and the next and the previous show smaller and dimmed at its sides as if behind it, reaching out to the
 * edges of the row; every few
 * seconds the row moves on one place (the time is set in the admin). A spot with no ad assigned shows nothing.
 */
export default function AdSlot({ size, area }: { size: AdSize; area?: "footer"; cta?: string }) {
  const pathname = usePathname() ?? "/";
  const [ads, setAds] = useState<Ad[]>([]);
  const [rotation, setRotation] = useState<Rotation>(DEFAULT_ROTATION);
  const slotId = useId();
  const [place, setPlace] = useState(0);
  // How many spots of this size the page has (so ads without a set spot can be shared out, never shown twice on one page).
  const [spots, setSpots] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const footer = area === "footer";
  // Which ad is in front, and which one was in front just before (used by the one-at-a-time fade).
  const [pos, setPos] = useState({ active: 0, prev: -1 });
  const [hovering, setHovering] = useState(false);
  const dims = SLOT_DIMS[size];
  const { ref, width: stageWidth } = useStageWidth();

  useEffect(() => {
    const key = `${pathname}|${size}|${area ?? ""}`;
    let line = claims.get(key);
    if (!line) {
      line = new Map();
      claims.set(key, line);
    }
    if (!line.has(slotId)) line.set(slotId, line.size);
    setPlace(line.get(slotId) ?? 0);
    // Every spot on the page has claimed its place by the time this runs, so the count is complete.
    const counted = window.setTimeout(() => setSpots(Math.max(1, line.size)), 0);
    return () => {
      window.clearTimeout(counted);
      line.delete(slotId);
    };
  }, [pathname, size, area, slotId]);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([loadAds(), loadRotation()]).then(([list, rules]) => {
      if (cancelled) return;
      setAds(list);
      setRotation(rules);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // An ad with a set spot shows only in that spot. The others are shared out between the spots, so one ad is never in two
  // places on the same page.
  const eligible = ads
    .filter((a) => a.placement === size && matchesPage(a, pathname, footer))
    .sort((a, b) => a.id.localeCompare(b.id));
  const floating = eligible.filter((a) => !a.slotPosition);
  const running = [
    ...eligible.filter((a) => !footer && a.slotPosition === place + 1),
    ...(footer ? floating : floating.filter((_, index) => index % spots === place % spots)),
  ].sort((a, b) => priorityRank[a.priority ?? "medium"] - priorityRank[b.priority ?? "medium"] || a.id.localeCompare(b.id));
  const count = running.length;
  // A different set of ads (another page, a new list) starts again from this slot's own place in line.
  const runningKey = running.map((a) => a.id).join(",");
  useEffect(() => {
    setPos({ active: count ? place % count : 0, prev: -1 });
  }, [runningKey, place, count]);

  const paused = hovering && rotation.pauseOnHover;
  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return; // nobody is looking: stay put
      setPos((p) => ({ active: (p.active + 1) % count, prev: p.active }));
    }, rotation.seconds * 1000);
    return () => window.clearInterval(timer);
  }, [count, paused, rotation.seconds]);

  const current = count ? Math.min(pos.active, count - 1) : 0;
  const shown = count ? running[current] : undefined;
  // Shyam Jagat's own appeals (made by the team) are not paid advertising, so they are not labelled as such. Anyone else's
  // ad, and the empty reserved space, keep the "ADVERTISEMENT" label that readers and advertising rules expect.
  const own = shown?.advertiser?.trim().toLowerCase().startsWith("shyam jagat") ?? false;
  const label = own ? "SEVA APPEAL" : "ADVERTISEMENT";

  // The ad in the middle is shown at full size when there is room, smaller on a phone. Whatever room is left on each
  // side shows the neighbouring ads.
  const tiles = rotation.transition === "tiles" && count > 1;
  const room = stageWidth || dims.w;
  const fit = Math.min(1, (room - (tiles ? 2 * MIN_PEEK : 0)) / dims.w);
  const centreW = dims.w * fit;
  const sideW = centreW * SIDE_SCALE;
  // The neighbours reach out to the edges of the row: all the space beside the middle ad is filled (a side ad never
  // shows more than nearly all of itself, so a very wide screen keeps a little margin rather than a gap).
  const peek = tiles ? Math.max(MIN_PEEK, Math.min(sideW * 0.92, (room - centreW) / 2)) : 0;
  const sideX = centreW / 2 + peek - sideW / 2;
  const stageH = dims.h * fit;

  // Where each ad stands relative to the one in front: 0 is the middle, -1 the left, 1 the right, further out is out of sight.
  const half = Math.floor(count / 2);
  const rels = running.map((_, i) => ((((i - current + half) % count) + count) % count) - half);
  const lastRels = useRef<number[]>([]);
  useEffect(() => {
    lastRels.current = rels;
  });

  // Nothing is assigned to this spot (or the ads have not arrived yet): the page simply has no ad bar here.
  if (!loaded || count === 0) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#f7f7f7] py-8">
      <div className="h-px w-full bg-[#e0e0e0]" />
      <div className="flex w-full flex-col items-center justify-center gap-2 px-3 py-4 text-center">
        <p className="text-[10px] font-medium tracking-[1.5px] text-[#9e9e9e]">{label}</p>

        <div ref={ref} style={{ width: "100%", maxWidth: tiles ? 2200 : dims.w }}>
          {count ? (
            <div
              className="relative"
              style={{ height: stageH, overflow: "hidden" }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {running.map((ad, i) => {
                const rel = rels[i];
                const isFront = rel === 0;
                const isSide = tiles && Math.abs(rel) === 1;
                // A tile that wraps round from one end to the other goes there without crossing the stage.
                const jumped = lastRels.current[i] !== undefined && Math.abs(rel - lastRels.current[i]) > 1;

                let transform: string;
                let opacity: number;
                let zIndex: number;
                let transition: string;
                if (tiles) {
                  const out = Math.sign(rel);
                  const x = isFront ? 0 : isSide ? out * sideX : out * sideX * 0.45;
                  const k = isFront ? fit : isSide ? fit * SIDE_SCALE : fit * 0.7;
                  transform = `translateX(${x}px) scale(${k})`;
                  opacity = isFront ? 1 : isSide ? 0.62 : 0;
                  zIndex = isFront ? 3 : isSide ? 2 : 1;
                  transition = jumped ? "none" : `transform ${EASE}, opacity ${EASE}`;
                } else {
                  // One at a time: the new ad fades in over the one it replaces, which stays solid underneath.
                  transform = `scale(${fit})`;
                  const wasFront = i === pos.prev;
                  opacity = isFront || wasFront ? 1 : 0;
                  zIndex = isFront ? 2 : wasFront ? 1 : 0;
                  transition = isFront ? `opacity ${EASE}` : "none";
                }

                const creative = <AdCreative ad={ad} size={size} src={resolveImage(ad.imageUrl)} />;
                const frame: React.CSSProperties = {
                  position: "absolute",
                  left: "50%",
                  top: (stageH - dims.h) / 2,
                  width: dims.w,
                  height: dims.h,
                  marginLeft: -dims.w / 2,
                  transform,
                  opacity,
                  zIndex,
                  transition,
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: isFront ? "0 8px 22px rgba(0,0,0,.28)" : "0 4px 12px rgba(0,0,0,.2)",
                  filter: isFront || !tiles ? "none" : "brightness(.82)",
                  pointerEvents: isFront || isSide ? "auto" : "none",
                };

                // The middle ad opens its link. A neighbour moves to the middle when it is tapped.
                if (isSide) {
                  return (
                    <div
                      key={ad.id}
                      style={{ ...frame, cursor: "pointer" }}
                      role="button"
                      aria-label={`Show ${ad.headline ?? ad.title ?? "advertisement"}`}
                      onClick={() => setPos((p) => ({ active: i, prev: p.active }))}
                    >
                      {creative}
                    </div>
                  );
                }
                return (
                  <div key={ad.id} style={frame} aria-hidden={!isFront}>
                    {ad.linkUrl ? (
                      <a
                        href={ad.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        tabIndex={isFront ? 0 : -1}
                        aria-label={ad.headline ?? ad.title ?? "Advertisement"}
                        onClick={() => reportClick(ad.id)}
                        style={{ display: "block", width: dims.w, height: dims.h }}
                      >
                        {creative}
                      </a>
                    ) : (
                      creative
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="h-px w-full bg-[#e0e0e0]" />
    </div>
  );
}
