"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  ApiError,
  registrationsApi,
  uploadsApi,
  type CategoryKey,
  type SignupInput,
} from "@/lib/api";

/**
 * Shared plumbing for the six category registration pages. Each page keeps its
 * own form; on submit it hands its values here, and this creates the login
 * account together with the category profile (POST /auth/signup), or just adds
 * the profile when the visitor is already signed in.
 */

const CATEGORY_LABEL: Record<CategoryKey, string> = {
  artist: "artist",
  dancer: "dancer",
  musician: "musician",
  temple: "temple",
  dharamshala: "dharamshala",
  mandal: "mandal",
  volunteer: "volunteer",
};

/** "+91 98765-43210", "098765 43210" and "9876543210" all become "9876543210". */
export function normalizeMobile(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** "25/12/1990" -> "1990-12-25". Anything else comes back undefined. */
export function toIsoDate(ddmmyyyy: string): string | undefined {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(ddmmyyyy.trim());
  return match ? `${match[3]}-${match[2]}-${match[1]}` : undefined;
}

/** First run of digits as a number ("45 Rooms" -> 45, "Rs. 500 / Day" -> 500). */
export function firstNumber(text: string): number | undefined {
  const match = /\d+(\.\d+)?/.exec(text.replace(/,/g, ""));
  return match ? Number(match[0]) : undefined;
}

/** Drops blank values so optional fields are simply absent from the request. */
export function compact(profile: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(profile).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }),
  );
}

/** Artists, dancers and musicians submit the same details; only the labels differ. */
export function buildPerformerProfile(v: {
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  state?: string;
  primarySpecialty?: string;
  secondarySpecialty?: string;
  experience?: string;
  guruName?: string;
  bio?: string;
  portfolioLink?: string;
  availableEvents: string[];
  regions: string[];
  honorarium?: string;
  travelWillingness?: string;
  consentContact: boolean;
}) {
  const unset = (value?: string) => (!value || value.startsWith("Select") ? undefined : value);
  return compact({
    ...v,
    dateOfBirth: toIsoDate(v.dateOfBirth ?? ""),
    gender: unset(v.gender),
    secondarySpecialty: unset(v.secondarySpecialty),
  });
}

interface LoginState {
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface SubmitArgs {
  fullName: string;
  /** Falls back to the login card's own field when the form has none (e.g. dharamshala). */
  email?: string;
  mobile?: string;
  acceptTerms: boolean;
  /** Shown when `acceptTerms` is false; defaults to the Terms of Service prompt. */
  acceptMessage?: string;
  profile: Record<string, unknown>;
  /** Optional image sent after the account exists, saved to `photoKey`. */
  photo?: { file: File | null | undefined; key: string };
}

function messageFor(error: unknown): string[] {
  if (error instanceof ApiError) {
    const details = error.errors?.map((e) => e.message).filter(Boolean);
    return details?.length ? details : [error.message];
  }
  return ["Something went wrong. Please try again."];
}

export function useRegistrationSubmit(category: CategoryKey) {
  const { user, signup } = useAuth();
  const [login, setLogin] = useState<LoginState>({ email: "", mobile: "", password: "", confirmPassword: "" });
  const [loginErrors, setLoginErrors] = useState<Partial<Record<keyof LoginState, string>>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ photoFailed: boolean } | null>(null);

  const signedIn = Boolean(user);

  function setLoginField(key: keyof LoginState, value: string) {
    setLogin((prev) => ({ ...prev, [key]: value }));
    setLoginErrors((prev) => ({ ...prev, [key]: undefined }));
    setErrors([]);
  }

  async function submit({ fullName, email, mobile, acceptTerms, acceptMessage, profile, photo }: SubmitArgs) {
    const problems: string[] = [];
    const fieldProblems: Partial<Record<keyof LoginState, string>> = {};

    if (!acceptTerms) problems.push(acceptMessage ?? "Please accept the Terms of Service to continue.");

    const accountEmail = (email ?? login.email).trim().toLowerCase();
    const accountMobile = normalizeMobile(mobile ?? login.mobile);

    if (!user) {
      if (fullName.trim().length < 2) problems.push("Please enter your full name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail)) problems.push("Enter a valid email address.");
      if (!/^[6-9]\d{9}$/.test(accountMobile)) problems.push("Enter a valid 10-digit Indian mobile number.");
      if (login.password.length < 8) {
        fieldProblems.password = "Password must be at least 8 characters.";
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(login.password)) {
        fieldProblems.password = "Include at least one letter and one number.";
      }
      if (login.confirmPassword !== login.password) fieldProblems.confirmPassword = "Passwords do not match.";
    }

    if (problems.length > 0 || Object.keys(fieldProblems).length > 0) {
      setErrors(problems);
      setLoginErrors(fieldProblems);
      return;
    }

    setPending(true);
    setErrors([]);
    try {
      if (user) {
        await registrationsApi.add(category, profile);
      } else {
        const body: SignupInput = {
          fullName: fullName.trim(),
          email: accountEmail,
          mobile: accountMobile,
          password: login.password,
          confirmPassword: login.confirmPassword,
          acceptTerms: true,
          category,
          profile,
        };
        await signup(body);
      }

      // The photo goes up once the account exists; a failure never undoes the registration.
      let photoFailed = false;
      if (photo?.file) {
        try {
          const { url } = await uploadsApi.upload(photo.file);
          await registrationsApi.updateMine(category, { [photo.key]: url });
        } catch {
          photoFailed = true;
        }
      }
      setDone({ photoFailed });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErrors(messageFor(error));
    } finally {
      setPending(false);
    }
  }

  return { submit, pending, errors, done, signedIn, login, loginErrors, setLoginField, category };
}

export type RegistrationSubmit = ReturnType<typeof useRegistrationSubmit>;

const fieldClass = (hasError?: boolean) =>
  `h-12 w-full rounded-lg border px-4 text-sm text-[#444] placeholder:text-[#9ca3af] focus:outline-none ${
    hasError ? "border-red-500 bg-red-50" : "border-[#e5e7eb] focus:border-primary"
  }`;

function LoginField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 text-sm font-semibold text-maroon">
        <p>{label}</p>
        <p className="font-bold text-primary">*</p>
      </div>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  hasError,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasError?: boolean;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass(hasError)} pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-maroon"
      >
        {visible ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}

/**
 * The one extra block every category form gets: a password so the person can
 * sign in later. `fields` lists any contact detail the page's own form lacks.
 */
export function LoginDetailsCard({
  reg,
  fields = [],
}: {
  reg: RegistrationSubmit;
  fields?: ("email" | "mobile")[];
}) {
  if (reg.signedIn) return null;
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0px_12px_16px_rgba(139,0,0,0.03)] sm:p-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl font-semibold text-maroon sm:text-[28px]">{"Create Your Login"}</h2>
        <div className="h-[2px] w-[60px] bg-primary" />
        <p className="text-sm text-[#595656]">
          {"Your account is created with this registration. Use your email and this password to sign in any time."}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.includes("email") && (
          <LoginField label={"Email Address"}>
            <input
              type="email"
              autoComplete="email"
              placeholder={"you@example.com"}
              value={reg.login.email}
              onChange={(e) => reg.setLoginField("email", e.target.value)}
              className={fieldClass()}
            />
          </LoginField>
        )}
        {fields.includes("mobile") && (
          <LoginField label={"Mobile Number"}>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={"10-digit mobile number"}
              value={reg.login.mobile}
              onChange={(e) => reg.setLoginField("mobile", e.target.value)}
              className={fieldClass()}
            />
          </LoginField>
        )}
        <LoginField label={"Password"} error={reg.loginErrors.password}>
          <PasswordInput
            autoComplete="new-password"
            placeholder={"Create a password"}
            value={reg.login.password}
            onChange={(v) => reg.setLoginField("password", v)}
            hasError={Boolean(reg.loginErrors.password)}
          />
        </LoginField>
        <LoginField label={"Confirm Password"} error={reg.loginErrors.confirmPassword}>
          <PasswordInput
            autoComplete="new-password"
            placeholder={"Confirm your password"}
            value={reg.login.confirmPassword}
            onChange={(v) => reg.setLoginField("confirmPassword", v)}
            hasError={Boolean(reg.loginErrors.confirmPassword)}
          />
        </LoginField>
      </div>
    </div>
  );
}

/** Sits just above the submit button. */
export function RegistrationErrors({ reg }: { reg: RegistrationSubmit }) {
  const messages = [...reg.errors, ...Object.values(reg.loginErrors).filter(Boolean)] as string[];
  if (messages.length === 0) return null;
  return (
    <div role="alert" className="w-full rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {messages.length === 1 ? (
        messages[0]
      ) : (
        <ul className="list-disc pl-5">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Replaces the page once the registration has gone through. */
export function SubmittedNotice({ reg }: { reg: RegistrationSubmit }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-20">
      <div className="flex max-w-[520px] flex-col items-center gap-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-10 text-center shadow-[0px_12px_16px_rgba(139,0,0,0.05)]">
        <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden />
        <h1 className="font-serif text-3xl font-semibold text-maroon">{"Registration Submitted"}</h1>
        <p className="text-[#595656]">
          {`Thank you! Your ${CATEGORY_LABEL[reg.category]} registration is with our seva team. They usually review it within 24–48 hours, and you can sign in any time with your email and password.`}
        </p>
        {reg.done?.photoFailed && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {"Your photo couldn't be uploaded, but everything else was saved. You can add it later."}
          </p>
        )}
        <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex-1 rounded-lg bg-primary py-3 text-center font-bold text-white transition hover:bg-primary-dark"
          >
            {"Go to Home"}
          </Link>
          {!reg.signedIn && (
            <Link
              href="/login"
              className="flex-1 rounded-lg border border-maroon py-3 text-center font-bold text-maroon transition hover:bg-cream"
            >
              {"Sign In"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
