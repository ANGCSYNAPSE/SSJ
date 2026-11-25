"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import GalleryDialog from "@/components/gallery/GalleryDialog";
import { INITIATIVE_FOLDERS } from "@/lib/data/gallery";

/**
 * The gallery of Our Initiatives, opened in a dialog from its own section on the home page: a highlighted button, with a folder
 * for every service and photographs and videos in each. It is a different gallery from the one of Seva of Own Wish.
 */
export default function InitiativesGalleryButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-[#e0b94f] bg-gradient-to-r from-[#fff4d6] to-[#ffe2ad] px-6 py-3 text-sm font-bold text-[#6b1f1f] shadow-[0_12px_28px_rgba(194,87,12,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(194,87,12,0.3)]">
        <span className="gs-glow flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f47700] to-[#ff9417] text-white">
          <Images className="h-[18px] w-[18px]" aria-hidden />
        </span>
        {"Open the Initiatives Gallery"}
      </button>
      <GalleryDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Our Initiatives: photos and videos"
        subtitle="A folder for every seva we work towards"
        folders={INITIATIVE_FOLDERS}
        gallery="initiatives"
        emptyText="Photos and videos will appear here when anyone shares them with us and our team has approved them."
      />
    </>
  );
}
