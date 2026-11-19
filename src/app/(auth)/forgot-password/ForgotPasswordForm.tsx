"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2, Lock, Mail, MailCheck } from "lucide-react";
import { AuthField } from "@/components/auth/AuthShell";
import { PasswordField, SubmitButton, TextField } from "@/components/auth/TextField";
import { ApiError, authApi } from "@/lib/api";

type Step = "email" | "code" | "password" | "done";

function passwordProblem(password: string): string | undefined {
  if (password.length < 8) return "Use at least 8 characters.";
  if (password.length > 72) return "Use at most 72 characters.";
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) return "Include at least one letter and one number.";
  return undefined;
}

const messageOf = (err: unknown, fallback = "Something went wrong. Please try again.") => (err instanceof ApiError ? err.message : fallback);

const BackToSignIn = () => (
  <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
    <ArrowLeft className="h-4 w-4" aria-hidden />
    {"Back to sign in"}
  </Link>
);

/**
 * Forgot password, all on this page: the email, the 6-digit code that was mailed, then the new password.
 * The reset token from the code step lives only in memory, so nothing sensitive sits in the address bar.
 */
export default function ForgotPasswordForm() {
  const params = useSearchParams();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirm?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [wait, setWait] = useState(0);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((n) => n - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setError("Enter the email address of your account.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await authApi.forgotPassword(clean);
      setWait(res?.resendAfterSeconds ?? 45);
      setDigits(Array(6).fill(""));
      setStep("code");
      window.setTimeout(() => boxes.current[0]?.focus(), 60);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  async function checkCode(code: string) {
    setPending(true);
    setError(null);
    try {
      const res = await authApi.verifyResetCode(email.trim(), code);
      setResetToken(res.resetToken);
      setStep("password");
    } catch (err) {
      setError(messageOf(err, "Could not check the code. Please try again."));
      setDigits(Array(6).fill(""));
      boxes.current[0]?.focus();
    } finally {
      setPending(false);
    }
  }

  function setDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, "");
    setError(null);
    if (clean.length > 1) {
      // A pasted or auto-filled code.
      const next = clean.slice(0, 6).split("");
      setDigits([...next, ...Array(6 - next.length).fill("")]);
      if (next.length === 6) void checkCode(next.join(""));
      else boxes.current[next.length]?.focus();
      return;
    }
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < 5) boxes.current[index + 1]?.focus();
    if (next.every(Boolean)) void checkCode(next.join(""));
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    const found: { password?: string; confirm?: string } = {};
    const problem = passwordProblem(password);
    if (problem) found.password = problem;
    if (confirm !== password) found.confirm = "Passwords do not match.";
    setFieldErrors(found);
    if (Object.keys(found).length > 0) return;

    setPending(true);
    setError(null);
    try {
      await authApi.resetPassword({ token: resetToken, password, confirmPassword: confirm });
      setStep("done");
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        const byField = Object.fromEntries(err.errors.map((f) => [f.field, f.message]));
        setFieldErrors({ password: byField.password, confirm: byField.confirmPassword });
      } else if (err instanceof ApiError && err.status === 400) {
        // The reset permission ran out (15 minutes): start again from the code.
        setResetToken("");
        setStep("email");
        setError("That took too long and the reset expired. Please ask for a new code.");
      } else {
        setError(messageOf(err));
      }
    } finally {
      setPending(false);
    }
  }

  const errorBox = error && (
    <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
      {error}
    </p>
  );

  /* ───────────── 4. done ───────────── */
  if (step === "done") {
    return (
      <div className="mt-3.5 flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-serif text-[30px] font-bold leading-tight text-maroon">{"Password updated"}</h1>
        <p className="text-sm text-muted-foreground">
          {"Your new password is set. For your safety you have been signed out on every device, so please sign in again."}
        </p>
        <Link href={`/login?email=${encodeURIComponent(email.trim())}`} className="mt-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-white">
          {"Sign in"}
        </Link>
      </div>
    );
  }

  /* ───────────── 3. new password ───────────── */
  if (step === "password") {
    return (
      <>
        <div className="mt-3.5 flex flex-col items-center gap-1.5 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="h-6 w-6" aria-hidden />
          </span>
          <h1 className="font-serif text-[30px] font-bold leading-tight text-maroon">{"Code verified"}</h1>
          <p className="text-sm text-muted-foreground">{"Now choose a new password for your account."}</p>
        </div>

        <form onSubmit={savePassword} noValidate className="mt-6 flex flex-col gap-4">
          <AuthField label={"New password"} htmlFor="password" error={fieldErrors.password}>
            <PasswordField
              id="password"
              icon={Lock}
              autoComplete="new-password"
              placeholder={"At least 8 characters"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((p) => ({ ...p, password: undefined }));
              }}
            />
          </AuthField>
          <p className="-mt-2 text-xs text-muted-foreground">{"8 or more characters, with at least one letter and one number."}</p>

          <AuthField label={"Confirm password"} htmlFor="confirmPassword" error={fieldErrors.confirm}>
            <PasswordField
              id="confirmPassword"
              icon={Lock}
              autoComplete="new-password"
              placeholder={"Type it again"}
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setFieldErrors((p) => ({ ...p, confirm: undefined }));
              }}
            />
          </AuthField>

          {errorBox}
          <SubmitButton pending={pending}>{"Set new password →"}</SubmitButton>
        </form>
      </>
    );
  }

  /* ───────────── 2. the code ───────────── */
  if (step === "code") {
    return (
      <div className="mt-3.5 flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1D8] text-primary">
          <MailCheck className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-serif text-[30px] font-bold leading-tight text-maroon">{"Enter the code"}</h1>
        <p className="text-sm text-muted-foreground">
          {"If an account exists for "}
          <b className="text-maroon">{email.trim()}</b>
          {", we have emailed it a 6-digit code. It is valid for 15 minutes."}
        </p>

        <div className="mt-1 flex justify-center gap-2">
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
              disabled={pending}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => e.key === "Backspace" && !digits[i] && i > 0 && boxes.current[i - 1]?.focus()}
              className="h-12 w-11 rounded-lg border-[1.5px] border-border bg-cream-light text-center text-lg font-semibold text-maroon focus:border-primary focus:outline-none"
            />
          ))}
        </div>

        <div className="h-5 text-sm text-muted-foreground" aria-live="polite">
          {pending && (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {"Checking…"}
            </span>
          )}
        </div>
        {errorBox}

        <p className="rounded-lg bg-[#FFF4E8] px-3 py-2 text-[13px] text-maroon">
          {"Not there? Look in your spam or promotions folder, and check the address is the one you signed up with."}
        </p>

        <div className="flex items-center gap-4 text-sm">
          <button type="button" onClick={() => void sendCode()} disabled={pending || wait > 0} className="font-semibold text-primary disabled:text-muted-foreground">
            {wait > 0 ? `Send again in ${wait}s` : "Send a new code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setError(null);
            }}
            className="font-semibold text-maroon hover:underline"
          >
            {"Change email"}
          </button>
        </div>
        <BackToSignIn />
      </div>
    );
  }

  /* ───────────── 1. email ───────────── */
  return (
    <>
      <div className="mt-3.5 flex flex-col items-center gap-1.5 text-center">
        <h1 className="font-serif text-[34px] font-bold leading-tight text-maroon">{"Forgot password?"}</h1>
        <p className="text-sm text-muted-foreground">{"Enter your email and we will send you a 6-digit code."}</p>
      </div>

      <form onSubmit={sendCode} noValidate className="mt-6 flex flex-col gap-4">
        <AuthField label={"Email Address"} htmlFor="email">
          <TextField
            id="email"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
        </AuthField>
        {errorBox}
        <SubmitButton pending={pending}>{"Send code →"}</SubmitButton>
      </form>

      <p className="mt-5 text-center">
        <BackToSignIn />
      </p>
    </>
  );
}
