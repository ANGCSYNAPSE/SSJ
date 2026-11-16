"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/api";

type AdSize = "leaderboard" | "banner" | "rectangle";

interface Ad {
  id: string;
  placement: AdSize;
  page: string | null;
  imageUrl: string;
  linkUrl: string | null;
  title: string | null;
  priority?: "low" | "medium" | "high";
}

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
};

const priorityRank = { high: 0, medium: 1, low: 2 } as const;

function matchesPage(ad: Ad, pathname: string): boolean {
  if (!ad.page || ad.page === "All Pages" || ad.page === "Site-wide Popup") return true;
  const routes = pageRoutes[ad.page];
  // An area the site does not know about is treated as site-wide rather than hidden.
  if (!routes) return true;
  return routes.some((route) => (route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`)));
}

function resolveImage(url: string): string {
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

// One request shared by every slot on the page (and across navigations).
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

/** Advertisement placement — shows the live campaign for this slot size and page, or the reserved space when none is running. */
export default function AdSlot({
  size,
  cta,
}: {
  size: AdSize;
  cta?: string;
}) {
  const pathname = usePathname() ?? "/";
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    let cancelled = false;
    loadAds().then((list) => {
      if (!cancelled) setAds(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const ad = ads
    .filter((a) => a.placement === size && matchesPage(a, pathname))
    .sort((a, b) => priorityRank[a.priority ?? "medium"] - priorityRank[b.priority ?? "medium"])[0];

  const dims =
    size === "leaderboard"
      ? { w: 728, h: 90, label: "728 × 90" }
      : size === "banner"
        ? { w: 970, h: 250, label: "970 × 250" }
        : { w: 300, h: 250, label: "300 × 250" };

  const creative = ad && (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolveImage(ad.imageUrl)}
      alt={ad.title ?? "Advertisement"}
      className="size-full object-cover"
    />
  );

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#f7f7f7] py-8">
      <div className="h-px w-full bg-[#e0e0e0]" />
      <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
        <p className="text-[10px] font-medium tracking-[1.5px] text-[#9e9e9e]">
          {"ADVERTISEMENT"}
        </p>
        <div
          className="flex max-w-full flex-col items-center justify-center gap-2 overflow-hidden rounded border border-[#e0e0e0] bg-[#ebebeb]"
          style={{ width: dims.w, height: dims.h, maxWidth: "92vw" }}
        >
          {ad ? (
            ad.linkUrl ? (
              <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer sponsored" className="block size-full">
                {creative}
              </a>
            ) : (
              creative
            )
          ) : (
            <>
              <p className="text-sm text-[#9e9e9e]">{dims.label}</p>
              <p className="text-[11px] text-[#b4b4b4]">{"Ad Space"}</p>
              {cta && (
                <span className="rounded bg-maroon px-4 py-1.5 text-[11px] font-semibold text-white">
                  {cta}
                </span>
              )}
            </>
          )}
        </div>
      </div>
      <div className="h-px w-full bg-[#e0e0e0]" />
    </div>
  );
}
