"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import InitiativeDialog from "@/components/initiatives/InitiativeDialog";
import type { Initiative } from "@/lib/data/initiatives";

/**
 * The card's picture. A service with one picture fills the card with it; a service with two or three shows them together
 * (side by side, or one large with two small), so every picture is seen without the service appearing twice.
 */
function Pictures({ item, sizes }: { item: Initiative; sizes: string }) {
  const [first, ...rest] = item.images;
  const tile = "relative overflow-hidden";
  const cover = "object-cover transition-transform duration-500 group-hover:scale-105";
  if (rest.length === 0) {
    return (
      <Image src={first} alt={item.title} fill sizes={sizes} style={item.focus ? { objectPosition: item.focus } : undefined} className={cover} />
    );
  }
  if (rest.length === 1) {
    return (
      <div className="absolute inset-0 grid grid-cols-2 gap-0.5 bg-white">
        {item.images.map((src) => (
          <div key={src} className={tile}>
            <Image src={src} alt={item.title} fill sizes={sizes} className={cover} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="absolute inset-0 grid grid-cols-[1.7fr_1fr] grid-rows-2 gap-0.5 bg-white">
      <div className={`${tile} row-span-2`}>
        <Image src={first} alt={item.title} fill sizes={sizes} className={cover} />
      </div>
      {rest.slice(0, 2).map((src) => (
        <div key={src} className={tile}>
          <Image src={src} alt="" fill sizes="20vw" className={cover} />
        </div>
      ))}
    </div>
  );
}

/** One card: the picture, the label, the name and a line about it. Pressing it opens the dialog. */
function Card({ item, height, onOpen, large = false }: { item: Initiative; height: string; onOpen: (item: Initiative) => void; large?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`${item.title}: read more`}
      className={`group relative block ${height} w-full overflow-hidden rounded-[20px] text-left shadow-[0_10px_24px_-8px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e87722]/50`}
    >
      <Pictures item={item} sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/0 via-maroon/10 to-maroon/85" />
      <span className="absolute left-5 top-5 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-maroon shadow">{item.tag}</span>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-5 pt-4 text-white">
        <div className={`font-serif font-semibold leading-[1.2] ${large ? "text-[28px] lg:text-[32px]" : "text-[24px]"}`}>{item.title}</div>
        <div className="text-sm opacity-90">{item.desc}</div>
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          {"Learn more"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </div>
      </div>
    </button>
  );
}

/**
 * The initiative cards, in the home page's bento layout (the first two large, the last one wide, the rest in rows of three) or as an even grid, with the
 * dialog that opens when a card is pressed.
 */
export default function InitiativeShowcase({ items, layout }: { items: Initiative[]; layout: "bento" | "grid" }) {
  const [open, setOpen] = useState<Initiative | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      {layout === "bento" ? (
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 lg:grid-cols-[1.78fr_1fr]">
            {items.slice(0, 2).map((item) => (
              <Card key={item.slug} item={item} height="h-[380px]" onOpen={setOpen} large />
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(2, -1).map((item) => (
              <Card key={item.slug} item={item} height="h-[300px]" onOpen={setOpen} />
            ))}
          </div>
          <div className="grid">
            {items.slice(-1).map((item) => (
              <Card key={item.slug} item={item} height="h-[260px]" onOpen={setOpen} large />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.slug} item={item} height="h-[320px]" onOpen={setOpen} />
          ))}
        </div>
      )}
      <InitiativeDialog item={open} onClose={close} />
    </>
  );
}
