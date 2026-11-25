"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/lib/api";
import type { GalleryFolder } from "@/lib/data/gallery";

interface Item {
  id: string;
  folder: string;
  kind: "photo" | "video";
  url: string;
  caption: string | null;
}

/** A YouTube address, as the id of its video (or null when it is not one). */
const youtubeIdOf = (url: string) => /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/.exec(url)?.[1] ?? null;

/**
 * The folders of a gallery with what members have shared in them. Only items an admin has APPROVED come from the API, so nothing
 * that is waiting or was turned down is ever shown. Until some are approved, a folder is empty and the gallery says so.
 */
export function useApprovedGallery(gallery: "initiatives" | "own-wish", base: GalleryFolder[]): GalleryFolder[] {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/api/v1/gallery?gallery=${gallery}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((payload) => alive && setItems(Array.isArray(payload?.data) ? payload.data : []))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [gallery]);

  return useMemo(
    () =>
      base.map((folder) => {
        const mine = items.filter((i) => i.folder === folder.slug);
        return {
          ...folder,
          photos: [...folder.photos, ...mine.filter((i) => i.kind === "photo").map((i) => ({ src: i.url, alt: i.caption || folder.title }))],
          videos: [
            ...folder.videos,
            ...mine
              .filter((i) => i.kind === "video")
              .map((i) => {
                const id = youtubeIdOf(i.url);
                return id ? { title: i.caption || folder.title, youtubeId: id } : { title: i.caption || folder.title, src: i.url };
              }),
          ],
        };
      }),
    [base, items],
  );
}
