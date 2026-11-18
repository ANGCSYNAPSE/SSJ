"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, MailCheck, ShieldCheck, Wallet } from "lucide-react";
import { ApiError, authApi, type AuthResult, type CodeChannel, type SignupFee, type SignupStart } from "@/lib/api";
import { CheckoutDismissed, openRazorpayCheckout } from "@/lib/razorpay";
import { cn } from "@/lib/utils";

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const errorText = (err: unknown, fallback: string) => (err instanceof ApiError ? err.message : fallback);

/**
 * Two steps of registration, shown in place of the form. `otp`: the 6-digit code that was sent
 * (by email, or by SMS if they ask), which comes right after the first form step; the form then
 * carries on. `full` (default): the code and then the payment. In both, the account is created, and
 * the person signed in, only when a payment of at least the minimum succeeds.
 */
export default function VerifyAndPay({
  start,
  mode = "full",
  onVerified,
  onCreated,
  onBack,
}: {
  start: SignupStart;
  /** "otp" stops after the code is verified and calls onVerified. */
  mode?: "otp" | "full";
  onVerified?: (next: SignupStart) => void;
  onCreated: (result: AuthResult) => void;
  onBack: () => void;
}) {
  const [stage, setStage] = useState<"otp" | "pay">(start.emailVerified ? "pay" : "otp");
  const [fee, setFee] = useState<SignupFee>(start.fee);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-maroon">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> {mode === "otp" ? "Change my details" : "Back to the form"}
        </button>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
          <span className={cn("h-1.5 w-8 rounded-full", "bg-primary")} />
          {mode === "full" && <span className={cn("h-1.5 w-8 rounded-full", stage === "pay" ? "bg-primary" : "bg-border")} />}
        </div>
      </div>

      {stage === "otp" ? (
        <OtpStep
          start={start}
          error={error}
          setError={setError}
          onVerified={(next) => {
            setFee(next.fee);
            setError(null);
            if (mode === "otp") onVerified?.(next);
            else setStage("pay");
          }}
        />
      ) : (
        <PayStep start={start} fee={fee} setFee={setFee} error={error} setError={setError} onCreated={onCreated} />
      )}
    </div>
  );
}

function OtpStep({
  start,
  error,
  setError,
  onVerified,
}: {
  start: SignupStart;
  error: string | null;
  setError: (message: string | null) => void;
  onVerified: (next: SignupStart) => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(start.resendAfterSeconds);
  const [resending, setResending] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  // Where the latest code went; the first one is always sent by email.
  const [sentTo, setSentTo] = useState<CodeChannel>("email");
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    boxes.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (wait <= 0) return;
    const timer = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [wait]);

  async function verify(code: string) {
    setBusy(true);
    setError(null);
    try {
      onVerified(await authApi.signupVerifyOtp(start.pendingId, code));
    } catch (err) {
      setError(errorText(err, "Could not verify the code. Please try again."));
      setDigits(Array(6).fill(""));
      boxes.current[0]?.focus();
    } finally {
      setBusy(false);
    }
  }

  function setAt(index: number, value: string) {
    const clean = value.replace(/\D/g, "");
    if (clean.length > 1) {
      // A pasted code fills every box.
      const next = clean.slice(0, 6).split("");
      const filled = [...next, ...Array(6 - next.length).fill("")];
      setDigits(filled);
      boxes.current[Math.min(next.length, 5)]?.focus();
      if (next.length === 6) void verify(next.join(""));
      return;
    }
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    setInfo(null);
    if (clean && index < 5) boxes.current[index + 1]?.focus();
    if (next.every(Boolean)) void verify(next.join(""));
  }

  async function resend(channel: CodeChannel) {
    setResending(true);
    setError(null);
    try {
      const result = await authApi.signupResend(start.pendingId, channel);
      setWait(result.resendAfterSeconds);
      setSentTo(channel);
      setInfo(channel === "sms" ? `A new code has been sent to ${start.mobile}.` : channel === "both" ? "A new code has been sent by email and SMS." : `A new code has been sent to ${start.email}.`);
      setDigits(Array(6).fill(""));
      boxes.current[0]?.focus();
    } catch (err) {
      setError(errorText(err, "Could not send a new code. Please try again."));
    } finally {
      setResending(false);
    }
  }

  const code = digits.join("");

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1d8] text-primary">
        <MailCheck className="h-7 w-7" aria-hidden />
      </span>
      <h1 className="font-serif text-2xl font-bold text-maroon">Verify your email</h1>
      <p className="max-w-[340px] text-sm text-muted-foreground">
        We sent a 6-digit code to <b className="text-maroon">{sentTo === "sms" ? start.mobile : start.email}</b>
        {sentTo === "both" && <> and <b className="text-maroon">{start.mobile}</b></>}. It works for {start.otpMinutes} minutes.
      </p>

      <div className="mt-1 flex justify-center gap-2" role="group" aria-label="6-digit code">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              boxes.current[i] = el;
            }}
            value={digit}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) boxes.current[i - 1]?.focus();
            }}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            disabled={busy}
            className="h-12 w-10 rounded-xl border-[1.5px] border-border bg-cream-light text-center text-xl font-bold text-maroon outline-none transition-colors focus:border-primary focus:bg-white sm:w-11"
          />
        ))}
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      {info && !error && <p className="text-sm font-medium text-green-700">{info}</p>}

      <button
        type="button"
        onClick={() => void verify(code)}
        disabled={busy || code.length !== 6}
        className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-2.5 text-base font-semibold text-white disabled:opacity-60"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Verify & continue
      </button>

      <div className="mt-1 w-full rounded-xl border border-border bg-cream-light p-3 text-left">
        <p className="text-xs font-semibold text-maroon">Did not get the code? Send it again:</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => resend("email")}
            disabled={resending || wait > 0}
            className="flex flex-col items-center rounded-lg border border-border bg-white px-2 py-2 text-xs font-semibold text-maroon transition-colors hover:border-primary disabled:opacity-50"
          >
            By email
            <span className="max-w-full truncate text-[10px] font-normal text-muted-foreground">{start.email}</span>
          </button>
          <button
            type="button"
            onClick={() => resend("sms")}
            disabled={resending || wait > 0 || !start.channels.sms}
            className="relative flex flex-col items-center rounded-lg border border-border bg-white px-2 py-2 text-xs font-semibold text-maroon transition-colors hover:border-primary disabled:opacity-50"
          >
            By SMS
            <span className="text-[10px] font-normal text-muted-foreground">{start.mobile}</span>
            {!start.channels.sms && (
              <span className="absolute -right-1 -top-2 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">Soon</span>
            )}
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          {wait > 0 ? `You can ask for another code in ${wait}s.` : resending ? "Sending…" : "The newest code is the one that works."}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">Check your spam folder too.</p>
    </div>
  );
}

function PayStep({
  start,
  fee,
  setFee,
  error,
  setError,
  onCreated,
}: {
  start: SignupStart;
  fee: SignupFee;
  setFee: (fee: SignupFee) => void;
  error: string | null;
  setError: (message: string | null) => void;
  onCreated: (result: AuthResult) => void;
}) {
  const [amount, setAmount] = useState(String(fee.nextMax));
  const [busy, setBusy] = useState(false);

  const value = Number(amount);
  const valid = Number.isInteger(value) && value >= fee.nextMin && value <= fee.nextMax;
  const mustPayAll = fee.nextMin === fee.nextMax;

  async function createAccount() {
    setBusy(true);
    setError(null);
    try {
      onCreated(await authApi.signupComplete(start.pendingId));
    } catch (err) {
      setError(errorText(err, "Could not create your account. Please try again."));
      setBusy(false);
    }
  }

  async function pay() {
    setBusy(true);
    setError(null);
    try {
      const order = await authApi.signupPayOrder(start.pendingId, value);
      const response = await openRazorpayCheckout(order);
      // The server checks the signature, creates the account and signs the person in.
      onCreated(await authApi.signupPayVerify(start.pendingId, response));
    } catch (err) {
      if (!(err instanceof CheckoutDismissed)) {
        setError(errorText(err, err instanceof Error ? err.message : "The payment did not go through. You can try again."));
      }
      setBusy(false);
    }
  }

  // Already paid (they came back): nothing to pay, just create the account.
  if (fee.canComplete) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <ShieldCheck className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-serif text-2xl font-bold text-maroon">Payment received</h1>
        <p className="max-w-[340px] text-sm text-muted-foreground">
          {rupees(fee.paid)} has been received. Create your account to finish.
        </p>
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <button
          type="button"
          onClick={createAccount}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-2.5 text-base font-semibold text-white disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Create my account
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1d8] text-primary">
        <Wallet className="h-7 w-7" aria-hidden />
      </span>
      <h1 className="font-serif text-2xl font-bold text-maroon">Complete your registration</h1>
      <p className="max-w-[360px] text-sm text-muted-foreground">
        Email verified. The registration fee is <b className="text-maroon">{rupees(fee.total)}</b>. Pay at least{" "}
        <b className="text-maroon">{rupees(fee.minimum)}</b> now and the rest whenever you like. Your account is created as soon as
        the payment succeeds.
      </p>

      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {!mustPayAll && (
          <button
            type="button"
            onClick={() => setAmount(String(fee.nextMin))}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
              value === fee.nextMin ? "border-primary bg-[#fff1d8] text-maroon" : "border-border text-muted-foreground hover:bg-cream",
            )}
          >
            Minimum {rupees(fee.nextMin)}
          </button>
        )}
        <button
          type="button"
          onClick={() => setAmount(String(fee.nextMax))}
          className={cn(
            "rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
            value === fee.nextMax ? "border-primary bg-[#fff1d8] text-maroon" : "border-border text-muted-foreground hover:bg-cream",
          )}
        >
          Full {rupees(fee.nextMax)}
        </button>
        {!mustPayAll && (
          <label className="flex items-center gap-1 text-sm text-muted-foreground">
            or
            <span className="flex items-center rounded-lg border border-border bg-cream-light px-2">
              ₹
              <input
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                aria-label="Amount to pay"
                className="w-16 bg-transparent px-1 py-2 text-sm font-semibold text-maroon outline-none"
              />
            </span>
          </label>
        )}
      </div>
      {!valid && amount !== "" && (
        <p className="text-xs text-red-600">
          Enter an amount between {rupees(fee.nextMin)} and {rupees(fee.nextMax)}.
        </p>
      )}
      {valid && value < fee.total && (
        <p className="text-xs text-amber-700">
          {rupees(fee.total - value)} will stay pending. We will remind you, and you can pay it from your profile.
        </p>
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="button"
        onClick={pay}
        disabled={busy || !valid}
        className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-2.5 text-base font-semibold text-white disabled:opacity-60"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Pay {valid ? rupees(value) : ""} & create account
      </button>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" aria-hidden /> Payments are processed securely by Razorpay.
      </p>
    </div>
  );
}
