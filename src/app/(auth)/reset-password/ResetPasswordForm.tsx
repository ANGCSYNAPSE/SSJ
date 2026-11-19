"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Lock, LinkIcon } from "lucide-react";
import { AuthField } from "@/components/auth/AuthShell";
import { PasswordField, SubmitButton } from "@/components/auth/TextField";
import { ApiError, authApi } from "@/lib/api";

type Errors = { password?: string; confirmPassword?: string; form?: string; expired?: boolean };

function passwordProblem(password: string): string | undefined {
  if (password.length < 8) return "Use at least 8 characters.";
  if (password.length > 72) return "Use at most 72 characters.";
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) return "Include at least one letter and one number.";
  return undefined;
}

/** Step two of a password reset: the emailed link (?token=) opens this, and the new password is set here. */
export default function ResetPasswordForm() {
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="mt-3.5 flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <LinkIcon className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-serif text-[28px] font-bold leading-tight text-maroon">{"This link is incomplete"}</h1>
        <p className="text-sm text-muted-foreground">{"Open the link from the email exactly as it was sent, or ask for a new one."}</p>
        <Link href="/forgot-password" className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white">
          {"Get a new link"}
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mt-3.5 flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-serif text-[30px] font-bold leading-tight text-maroon">{"Password updated"}</h1>
        <p className="text-sm text-muted-foreground">{"Your new password is set. For your safety you have been signed out everywhere, so please sign in again."}</p>
        <Link href="/login" className="mt-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-white">
          {"Sign in"}
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    const problem = passwordProblem(password);
    if (problem) found.password = problem;
    if (confirm !== password) found.confirmPassword = "Passwords do not match.";
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setPending(true);
    setErrors({});
    try {
      await authApi.resetPassword({ token, password, confirmPassword: confirm });
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        setErrors(Object.fromEntries(err.errors.map((f) => [f.field, f.message])));
      } else if (err instanceof ApiError && err.status === 400) {
        // A used, replaced or expired link.
        setErrors({ form: err.message, expired: true });
      } else {
        setErrors({ form: err instanceof ApiError ? err.message : "Something went wrong. Please try again." });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="mt-3.5 flex flex-col items-center gap-1.5 text-center">
        <h1 className="font-serif text-[34px] font-bold leading-tight text-maroon">{"New password"}</h1>
        <p className="text-sm text-muted-foreground">{"Choose a password you have not used before."}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <AuthField label={"New password"} htmlFor="password" error={errors.password}>
          <PasswordField
            id="password"
            icon={Lock}
            autoComplete="new-password"
            placeholder={"At least 8 characters"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: undefined, form: undefined }));
            }}
          />
        </AuthField>
        <p className="-mt-2 text-xs text-muted-foreground">{"8 or more characters, with at least one letter and one number."}</p>

        <AuthField label={"Confirm password"} htmlFor="confirmPassword" error={errors.confirmPassword}>
          <PasswordField
            id="confirmPassword"
            icon={Lock}
            autoComplete="new-password"
            placeholder={"Type it again"}
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((p) => ({ ...p, confirmPassword: undefined, form: undefined }));
            }}
          />
        </AuthField>

        {errors.form && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.form}{" "}
            {errors.expired && (
              <Link href="/forgot-password" className="font-semibold underline">
                {"Get a new link"}
              </Link>
            )}
          </p>
        )}

        <SubmitButton pending={pending}>{"Set new password →"}</SubmitButton>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-semibold text-primary hover:underline">
          {"Back to sign in"}
        </Link>
      </p>
    </>
  );
}
