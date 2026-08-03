"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Lock, Check } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
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

const initial = {
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

/** Mirrors the backend validator so users get feedback before the round trip. */
function validate(values: typeof initial, acceptTerms: boolean): Errors {
  const errors: Errors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!/^[6-9]\d{9}$/.test(values.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(values.password)) {
    errors.password = "Include at least one letter and one number.";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (!acceptTerms) {
    errors.acceptTerms = "Please accept the Terms of Service to continue.";
  }

  return errors;
}

export default function SignupForm() {
  const router = useRouter();
  const { user, loading, signup } = useAuth();
  const [values, setValues] = useState(initial);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);

  // Someone already signed in has no business on this page.
  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user, router]);

  const update =
    (field: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found = validate(values, acceptTerms);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setPending(true);
    setErrors({});

    try {
      await signup({ ...values, acceptTerms });
      router.replace("/");
    } catch (err) {
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
          Join Our Sacred Family
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your account and begin your journey of seva.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-3.5 flex flex-col gap-3.5">
        <div className="flex flex-col gap-3">
          <AuthField label="Full Name" htmlFor="fullName" error={errors.fullName}>
            <TextField
              id="fullName"
              icon={User}
              autoComplete="name"
              placeholder="Enter your full name"
              value={values.fullName}
              onChange={update("fullName")}
            />
          </AuthField>

          <AuthField label="Mobile Number" htmlFor="mobile" error={errors.mobile}>
            <TextField
              id="mobile"
              icon={Phone}
              prefix="+91"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              placeholder="Mobile number"
              value={values.mobile}
              onChange={update("mobile")}
            />
          </AuthField>

          <AuthField label="Email Address" htmlFor="email" error={errors.email}>
            <TextField
              id="email"
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={values.email}
              onChange={update("email")}
            />
          </AuthField>

          <AuthField label="Password" htmlFor="password" error={errors.password}>
            <PasswordField
              id="password"
              icon={Lock}
              autoComplete="new-password"
              placeholder="Create a password"
              value={values.password}
              onChange={update("password")}
            />
          </AuthField>

          <AuthField
            label="Confirm Password"
            htmlFor="confirmPassword"
            error={errors.confirmPassword}
          >
            <PasswordField
              id="confirmPassword"
              icon={Lock}
              autoComplete="new-password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={update("confirmPassword")}
            />
          </AuthField>

          <div className="flex items-start gap-2.5">
            <button
              type="button"
              role="checkbox"
              aria-checked={acceptTerms}
              aria-label="I agree to the Terms of Service and Privacy Policy"
              onClick={() => {
                setAcceptTerms((v) => !v);
                setErrors((p) => ({ ...p, acceptTerms: undefined }));
              }}
              className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded ${
                acceptTerms ? "bg-primary" : "border-[1.5px] border-border bg-white"
              }`}
            >
              {acceptTerms && <Check className="h-2.5 w-2.5 text-white" />}
            </button>
            <p className="text-[13px] text-muted-foreground">
              I agree to the{" "}
              <Link href="/terms" className="text-primary underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-red-600">{errors.acceptTerms}</p>
          )}
        </div>

        {errors.form && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {errors.form}
          </p>
        )}

        <SubmitButton pending={pending}>Create My Account →</SubmitButton>
      </form>

      <div className="mt-3.5 flex flex-col gap-3.5">
        <AuthDivider label="— or continue with —" />
        <GoogleButton label="Continue with Google" />
        <AuthSwitchLink
          prompt="Already have an account?"
          href="/login"
          label="Sign In"
        />
        <TrustBadges />
      </div>
    </>
  );
}
