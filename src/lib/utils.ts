/**
 * Merge conditional class names into a single string.
 * Lightweight alternative to clsx — no dependency needed.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
