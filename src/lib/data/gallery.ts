import { INITIATIVES } from "@/lib/data/initiatives";
import { findSeva } from "@/lib/data/seva";

/**
 * The two galleries of the site, each with folders, and each folder with photographs and videos:
 *   1. the gallery of Our Initiatives (a folder for every service), opened from the Our Initiatives section of the home page;
 *   2. the gallery of Seva of Own Wish (the photographs and videos shared with the people whose wish it was), opened from the
 *      Seva of Own Wish section.
 * To add a photograph or a video, put it in the `photos` or `videos` of its folder. A video is a YouTube video (`youtubeId`)
 * or a file the site holds (`src`).
 */
export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface GalleryVideo {
  title: string;
  youtubeId?: string;
  src?: string;
}

export interface GalleryFolder {
  slug: string;
  title: string;
  hindi: string;
  tone: [string, string];
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
}

const FALLBACK_TONES: [string, string][] = [
  ["#f59e3b", "#c2570c"],
  ["#4caf50", "#2e6b32"],
  ["#4a7bd8", "#24509a"],
  ["#2fb3b3", "#0d727a"],
  ["#d9577a", "#a02b4e"],
  ["#7b5cc4", "#4e3a94"],
];

/**
 * The gallery of the services on the Our Initiatives page: one folder each. The folders start empty on purpose. A photograph or a
 * video appears in a folder only after a member has shared it and an admin has approved it (see useApprovedGallery).
 */
export const INITIATIVE_FOLDERS: GalleryFolder[] = INITIATIVES.map((item, i) => ({
  slug: item.slug,
  title: item.title.split(" (")[0],
  hindi: item.hindi,
  tone: findSeva(item.slug)?.tone ?? FALLBACK_TONES[i % FALLBACK_TONES.length],
  photos: [],
  videos: [],
}));

/** The gallery of Seva of Own Wish. It has no pictures yet: they are added as wishes are fulfilled and the people agree to share them. */
export const OWN_WISH_FOLDER: GalleryFolder = {
  slug: "own-wish",
  title: "Seva of Own Wish",
  hindi: "अपनी इच्छा की सेवा",
  tone: ["#f2b53f", "#9a5b00"],
  photos: [],
  videos: [],
};
