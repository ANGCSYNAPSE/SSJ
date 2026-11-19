"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

/**
 * A page that does not exist is not worth a page of its own: the visitor gets a short message and is
 * taken straight back to where they came from (or the home page when they arrived from elsewhere).
 * The response is still a real 404 for search engines.
 */
export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();
  const handled = useRef(false);

  useEffect(() => {
    // React runs effects twice in development; one message is enough.
    if (handled.current) return;
    handled.current = true;

    toast.show({
      tone: "warning",
      title: "That page does not exist",
      message: `We could not find ${pathname && pathname !== "/" ? `"${pathname}"` : "that page"}. We have taken you back.`,
      duration: 6000,
    });

    let cameFromHere = false;
    try {
      cameFromHere = Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
    } catch {
      /* an unreadable referrer just means "go home" */
    }
    if (cameFromHere && window.history.length > 1) router.back();
    else router.replace("/");
  }, [router, pathname, toast]);

  // Shown for a blink (or without JavaScript): no design, just a way home.
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf6ec] px-6 text-center">
      <noscript>
        <p className="text-[#3e1815]">
          {"This page does not exist. "}
          <Link href="/" className="font-semibold underline">
            {"Go to the home page"}
          </Link>
        </p>
      </noscript>
    </div>
  );
}
