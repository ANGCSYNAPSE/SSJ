"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Check, Info } from "lucide-react";
import { RESUME_KEY, SignupInProgress, useAuth } from "@/components/auth/AuthProvider";
import {
  AuthField,
  AuthDivider,
  GoogleButton,
  TrustBadges,
  AuthSwitchLink,
} from "@/components/auth/AuthShell";
import { TextField, PasswordField, SubmitButton } from "@/components/auth/TextField";
import { ApiError } from "@/lib/api";

type Errors = Partial<Record<string, string>> & { form?: string };

const initial = { email: "", password: "" };

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, login } = useAuth();
  // The signup form sends people here with their email filled in (?email=)
  // and the reason they were sent (?reason=exists|incomplete).
  const [values, setValues] = useState({ ...initial, email: searchParams.get("email") ?? "" });
  const reason = searchParams.get("reason");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);

  function validate(v: typeof initial): Errors {
    const found: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
      found.email = "Enter a valid email address.";
    }
    if (v.password.length === 0) {
      found.password = "Please enter your password.";
    }
    return found;
  }

  // After signing in, people always land on the home page (the ?next= pointer that guarded
  // pages add is deliberately ignored, so logging in never drops someone onto the dashboard).
  const destination = "/";

  // Someone already signed in has no business on this page.
  useEffect(() => {
    if (!loading && user) router.replace(destination);
  }, [loading, user, destination, router]);

  const update =
    (field: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setPending(true);
    setErrors({});

    try {
      await login({ ...values, remember });
      router.replace(destination);
    } catch (err) {
      if (err instanceof SignupInProgress) {
        // Their registration is not finished (no account yet): carry on from the step they had reached.
        try {
          window.sessionStorage.setItem(RESUME_KEY, JSON.stringify(err.resume));
        } catch {
          /* storage blocked: the signup page will ask them to start again */
        }
        router.replace("/signup");
        return;
      }
      if (err instanceof ApiError && err.errors?.length) {
        setErrors(
          Object.fromEntries(err.errors.map((f) => [f.field, f.message])),
        );
      } else {
        setErrors({
          form:
            err instanceof ApiError
              ? err.message
              : "Something went wrong. Please try again.",
        });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="mt-3.5 flex flex-col items-center gap-1.5 text-center">
        <h1 className="font-serif text-[34px] font-bold leading-tight text-maroon">
          {"Welcome Back"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {"Sign in to continue your journey of seva."}
        </p>
      </div>

      {(reason === "exists" || reason === "incomplete") && (
        <p
          role="status"
          className="mt-4 flex items-start gap-2 rounded-xl border border-primary/30 bg-[#FFF4E8] px-3.5 py-2.5 text-[13px] text-maroon"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          {reason === "incomplete"
            ? "You started registering with this email but didn't finish. Sign in and we'll take you straight back to complete your profile."
            : "This email is already registered. Please sign in with your password."}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <AuthField label={"Email Address"} htmlFor="email" error={errors.email}>
            <TextField
              id="email"
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder={"your@email.com"}
              value={values.email}
              onChange={update("email")}
            />
          </AuthField>

          <AuthField label={"Password"} htmlFor="password" error={errors.password}>
            <PasswordField
              id="password"
              icon={Lock}
              autoComplete="current-password"
              placeholder={"Enter your password"}
              value={values.password}
              onChange={update("password")}
            />
          </AuthField>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                role="checkbox"
                aria-checked={remember}
                aria-label={"Remember me"}
                onClick={() => setRemember((v) => !v)}
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded ${
                  remember
                    ? "bg-primary"
                    : "border-[1.5px] border-border bg-white"
                }`}
              >
                {remember && <Check className="h-2.5 w-2.5 text-white" />}
              </button>
              <span className="text-[13px] text-muted-foreground">
                {"Remember me"}
              </span>
            </div>
            <Link
              href="/forgot-password"
              className="text-[13px] font-semibold text-primary hover:underline"
            >
              {"Forgot password?"}
            </Link>
          </div>
        </div>

        {errors.form && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {errors.form}
          </p>
        )}

        <SubmitButton pending={pending}>{"Sign In →"}</SubmitButton>
      </form>

      <div className="mt-4 flex flex-col gap-4">
        <AuthDivider label={"— or continue with —"} />
        <GoogleButton label={"Continue with Google"} />
        <AuthSwitchLink
          prompt={"New to Shyam Jagat?"}
          href="/signup"
          label={"Create an account"}
        />
        {/* <TrustBadges /> */}
      </div>
    </>
  );
}
