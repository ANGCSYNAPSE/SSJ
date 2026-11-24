"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lets the page build itself as you scroll: the blocks of each section rise and fade in as they come into view, and the
 * cards of a grid follow one after another. It works on the page as it is (nothing has to be wrapped), skips the first
 * screen, skips decoration, and takes its classes off again once a block has arrived, so it never leaves a transform
 * behind. Nothing is hidden if the browser lacks IntersectionObserver, or if the visitor asked for less motion.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          seen.unobserve(el);
          el.classList.add("rv-in");
          window.setTimeout(() => {
            el.classList.remove("rv", "rv-in");
            el.style.removeProperty("--rv-d");
          }, 1200);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const arm = (el: HTMLElement, index = 0) => {
      if (el.classList.contains("rv") || el.dataset.noReveal !== undefined) return;
      if (el.getAttribute("aria-hidden") === "true" || /\b(absolute|fixed|sticky)\b/.test(el.className)) return;
      const rect = el.getBoundingClientRect();
      if (rect.height < 8 || rect.top < window.innerHeight * 0.92) return; // already on the first screen, or above it
      el.classList.add("rv");
      if (index) el.style.setProperty("--rv-d", `${Math.min(index, 5) * 0.08}s`);
      seen.observe(el);
    };

    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("main section").forEach((section, i) => {
        if (i === 0) return; // the hero is already there
        Array.from(section.children).forEach((child) => {
          const block = child as HTMLElement;
          // A row or grid of cards: the cards arrive one after another instead of the whole row at once.
          const kids = Array.from(block.children) as HTMLElement[];
          const isGrid = kids.length >= 2 && kids.length <= 14 && /\b(grid|flex)\b/.test(block.className) && /\bgrid-cols|\bgap-/.test(block.className) && !/\bflex-col\b/.test(block.className);
          if (isGrid) kids.forEach((k, n) => arm(k, n));
          else arm(block);
        });
      });
    }, 250);

    return () => {
      window.clearTimeout(timer);
      seen.disconnect();
      document.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.remove("rv", "rv-in"));
    };
  }, [pathname]);

  return null;
}
