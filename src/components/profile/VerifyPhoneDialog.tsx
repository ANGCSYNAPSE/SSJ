"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Smartphone, X } from "lucide-react";
import { ApiError, meApi } from "@/lib/api";

/** Texts a 6-digit code to the person's own number and checks it. Calls `onVerified` when the phone is confirmed. */
export default function VerifyPhoneDialog({ onClose, onVerified }: { onClose: () => void; onVerified: () => void }) {
  const [sent, setSent] = useState<{ mobile: string; minutes: number } | null>(null);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wait, setWait] = useState(0);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((n) => n - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  async function send() {
    setBusy(true);
    setError(null);
    try {
      const res = await meApi.sendMobileOtp();
      if (res.alreadyVerified) {
        onVerified();
        return;
      }
      setSent({ mobile: res.mobile ?? "", minutes: res.minutes ?? 10 });
      setWait(res.resendAfterSeconds ?? 45);
      setDigits(Array(6).fill(""));
      window.setTimeout(() => boxes.current[0]?.focus(), 50);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Could not send the code. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function confirm(code: string) {
    setBusy(true);
    setError(null);
    try {
      await meApi.verifyMobileOtp(code);
      onVerified();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Could not check the code. Please try again.");
      setDigits(Array(6).fill(""));
      boxes.current[0]?.focus();
    } finally {
      setBusy(false);
    }
  }

  function setDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, "");
    if (clean.length > 1) {
      // A pasted or auto-filled code.
      const next = clean.slice(0, 6).split("");
      setDigits([...next, ...Array(6 - next.length).fill("")]);
      if (next.length === 6) void confirm(next.join(""));
      else boxes.current[next.length]?.focus();
      return;
    }
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < 5) boxes.current[index + 1]?.focus();
    if (next.every(Boolean)) void confirm(next.join(""));
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Verify your phone">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1d8] text-[#e87722]">
            <Smartphone className="h-5 w-5" aria-hidden />
          </span>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[#8a8580] hover:text-maroon">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mt-3 font-serif text-xl font-bold text-maroon">Verify your phone</h2>

        {!sent ? (
          <>
            <p className="mt-1 text-sm text-[#595656]">{"We will text a 6-digit code to the mobile number on your account. Standard message rates may apply."}</p>
            {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button
              type="button"
              onClick={() => void send()}
              disabled={busy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#e87722] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {"Send code"}
            </button>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-[#595656]">
              {"Enter the code we texted to "}
              <b className="text-maroon">{sent.mobile}</b>
              {`. It is valid for ${sent.minutes} minutes.`}
            </p>
            <div className="mt-4 flex justify-between gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    boxes.current[i] = el;
                  }}
                  value={d}
                  inputMode="numeric"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  aria-label={`Digit ${i + 1}`}
                  disabled={busy}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => e.key === "Backspace" && !digits[i] && i > 0 && boxes.current[i - 1]?.focus()}
                  className="h-12 w-11 rounded-lg border border-[#d4af37]/50 text-center text-lg font-semibold text-maroon focus:border-[#e87722] focus:outline-none"
                />
              ))}
            </div>
            {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => void send()}
                disabled={busy || wait > 0}
                className="font-semibold text-[#e87722] disabled:text-[#8a8580]"
              >
                {wait > 0 ? `Send again in ${wait}s` : "Send a new code"}
              </button>
              {busy && <Loader2 className="h-4 w-4 animate-spin text-[#e87722]" aria-label="Checking" />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
