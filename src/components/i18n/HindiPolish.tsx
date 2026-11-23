"use client";

import { useEffect } from "react";
import { polishHindi } from "@/lib/hindiFixes";

const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "NOSCRIPT", "CODE"]);

/** Google marks a translated page in more than one way (cookie value, <html lang>); any of them means Hindi. */
const inHindi = () =>
  document.documentElement.lang === "hi" ||
  /(?:^|;\s*)googtrans=\/[^/;]+\/hi(?:;|$)/.test(document.cookie);

function polishTree(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || SKIP.has(parent.tagName) || parent.isContentEditable) continue;
    const before = node.nodeValue ?? "";
    const after = polishHindi(before);
    if (after !== before) node.nodeValue = after;
  }
}

/**
 * The automatic Hindi translation renders some words in a way that does not suit a seva platform ("Events" as
 * "घटनाएँ", meaning incidents). After it has translated, this swaps those words for the right ones (the list is in
 * lib/hindiFixes.ts) and keeps doing so for text that appears later: pages opening, lists loading, dialogs.
 * It only touches text, never the elements React owns, and does nothing in other languages.
 */
export default function HindiPolish() {
  useEffect(() => {
    let frame = 0;
    const pending = new Set<Node>();

    const flush = () => {
      frame = 0;
      if (!inHindi()) {
        pending.clear();
        return;
      }
      const nodes = [...pending];
      pending.clear();
      for (const node of nodes) {
        if (!node.isConnected) continue;
        if (node.nodeType === Node.TEXT_NODE) {
          const after = polishHindi(node.nodeValue ?? "");
          if (after !== node.nodeValue) node.nodeValue = after;
        } else {
          polishTree(node);
        }
      }
    };
    const queue = (node: Node) => {
      pending.add(node);
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") queue(m.target);
        else m.addedNodes.forEach(queue);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    queue(document.body); // whatever is already on the page
    // Safety net: the translation can rewrite text in ways the observer does not report, so sweep now and then.
    const sweep = window.setInterval(() => inHindi() && queue(document.body), 2000);

    return () => {
      window.clearInterval(sweep);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
