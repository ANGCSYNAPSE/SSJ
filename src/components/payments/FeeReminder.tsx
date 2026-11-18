"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellRing, X } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { paymentsApi, type FeeStatus } from "@/lib/api";

const EVERY_MS = 12 * 60 * 60 * 1000;
const CHECK_EVERY_MS = 5 * 60 * 1000;
const FIRST_DELAY_MS = 6000;

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const keyFor = (userId: string) => `ssj-fee-reminder:${userId}`;

function lastShown(userId: string): number {
  try {
    return Number(window.localStorage.getItem(keyFor(userId)) ?? 0);
  } catch {
    return 0;
  }
}

function markShown(userId: string) {
  try {
    window.localStorage.setItem(keyFor(userId), String(Date.now()));
  } catch {
    /* storage blocked: the popup may come back on the next page, which is acceptable */
  }
}

/**
 * A reminder for a member who still owes part of the registration fee (for example paid ₹501 of
 * ₹1100). It opens after sign-in, then again every 12 hours while they use the site, and never
 * covers the profile page where the payment card already is.
 */
export default function FeeReminder() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [fee, setFee] = useState<FeeStatus | null>(null);

  const owes = user && (user.registrationFee === "partial" || user.registrationFee === "pending");
  const onProfile = pathname === "/profile";

  useEffect(() => {
    if (!user || !owes || onProfile) {
      setFee(null);
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const check = async () => {
      if (cancelled || Date.now() - lastShown(user.id) < EVERY_MS) return;
      try {
        const { fee: latest } = await paymentsApi.me();
        if (cancelled || latest.status === "paid" || typeof latest.balance !== "number") return;
        markShown(user.id);
        setFee(latest);
      } catch {
        /* a reminder is never worth an error message */
      }
    };

    timer = setTimeout(check, FIRST_DELAY_MS);
    const interval = setInterval(check, CHECK_EVERY_MS);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      clearInterval(interval);
    };
  }, [user, owes, onProfile]);

  if (!fee) return null;

  const partial = fee.status === "partial";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#12060a]/60 p-4 backdrop-blur-sm" onClick={() => setFee(null)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Registration fee reminder"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[400px] rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#fff8ec] to-[#fde9c8] p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <button
          type="button"
          onClick={() => setFee(null)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-maroon hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e87722] text-white">
          <BellRing className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-3 font-serif text-xl font-bold text-maroon">
          {partial ? `₹${fee.balance.toLocaleString("en-IN")} of your registration fee is pending` : "Your registration fee is pending"}
        </h2>
        <p className="mt-1.5 text-sm text-[#595656]">
          {partial
            ? `Thank you for paying ${rupees(fee.paid)}. Please complete the remaining ${rupees(fee.balance)} when you can.`
            : `Please pay the registration fee of ${rupees(fee.total)} to complete your membership.`}
        </p>

        <div className="mt-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#f47700] to-[#ffb347]"
              style={{ width: `${Math.round((fee.paid / fee.total) * 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs font-semibold">
            <span className="text-green-700">Paid {rupees(fee.paid)}</span>
            <span className="text-red-600">Pending {rupees(fee.balance)}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/profile"
            onClick={() => setFee(null)}
            className="rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            {partial ? "Pay the balance" : "Pay now"}
          </Link>
          <button
            type="button"
            onClick={() => setFee(null)}
            className="rounded-xl border border-[#d4af37]/50 bg-white/70 px-6 py-2.5 text-sm font-semibold text-maroon hover:bg-white"
          >
            Remind me later
          </button>
        </div>
        <p className="mt-3 text-[11px] text-[#8a8580]">We will remind you again in 12 hours.</p>
      </div>
    </div>
  );
}
