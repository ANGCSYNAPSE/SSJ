"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CheckCircle2, Info, Lock, Mail, Phone, TriangleAlert, User } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthField } from "@/components/auth/AuthShell";
import { PasswordField, TextField } from "@/components/auth/TextField";
import { useToast } from "@/components/ui/Toast";
import VerifyAndPay from "./VerifyAndPay";
import PendingPreview from "./PendingPreview";
import {
  ApiError,
  type SignupResume,
  authApi,
  registrationsApi,
  uploadsApi,
  type AuthResult,
  type Availability,
  type MyProfile,
  type SignupInput,
  type SignupStart,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Category, Field, Step } from "./categories";
import FieldGrid, {
  allFields,
  buildPayload,
  declarationErrors,
  emptyValues,
  fileProblem,
  formatErrors,
  missingRequired,
  uploadedFromProfile,
  valuesFromProfile,
  type FieldErrors,
  type FieldValue,
  type FileValues,
  type FormValues,
} from "./FieldInputs";

type AccountErrors = Partial<
  Record<"fullName" | "mobile" | "email" | "password" | "confirmPassword" | "acceptTerms", string>
>;

const emptyAccount = { fullName: "", mobile: "", email: "", password: "", confirmPassword: "" };

/** The login can't be left blank — an account needs these to exist. Everything after is optional. */
function validateAccount(a: typeof emptyAccount, acceptTerms: boolean): AccountErrors {
  const found: AccountErrors = {};
  if (a.fullName.trim().length < 2) found.fullName = "Please enter a name (at least 2 characters).";
  if (!/^[6-9]\d{9}$/.test(a.mobile.trim())) found.mobile = "Enter a valid 10-digit Indian mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) found.email = "Enter a valid email address.";
  if (a.password.length < 8) found.password = "Password must be at least 8 characters.";
  else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(a.password)) found.password = "Include at least one letter and one number.";
  if (a.confirmPassword !== a.password) found.confirmPassword = "Passwords do not match.";
  if (!acceptTerms) found.acceptTerms = "Please accept the Terms of Service to continue.";
  return found;
}

const ACCOUNT_STEP = "Create Your Login";

/** Small pill buttons; Next gently zooms in and out in place (switched off for people who prefer reduced motion). */
const buttonBase = "rounded-full text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

const cleanLabel = (field: Field) => field.label.replace(/\s*\(Optional\)/, "");

/**
 * A category's registration form, run as steps inside a card.
 *
 * New registration: step 1 creates the login (after checking the email and
 * mobile aren't already taken), every step after is optional — Next always
 * moves on, and anything left blank marks the profile incomplete so it can be
 * finished later. Only values that are *wrong* (a bad PIN code, a broken link)
 * hold a person back.
 *
 * With `existing`, the same steps reopen a saved profile so its owner can add
 * what is missing; there is no login step and Save updates the profile.
 */
export default function CategoryWizard({
  category,
  onBack,
  existing,
  resume,
}: {
  category: Category;
  onBack: () => void;
  existing?: MyProfile;
  /** An unfinished signup picked up after signing in: its saved account details and the step it had reached. */
  resume?: SignupResume;
}) {
  const { adopt, refreshUser } = useAuth();
  const toast = useToast();
  const complete = Boolean(existing);
  const steps: (Step | "account")[] = complete ? [...category.steps] : ["account", ...category.steps];
  const firstProfileStep = complete ? 0 : 1;
  const profileFields = allFields(category);
  const uploaded = useMemo(() => (existing ? uploadedFromProfile(category, existing) : {}), [category, existing]);

  // Resuming after the email was verified: the first step is already done, so start at the next one.
  const [index, setIndex] = useState(resume && resume.stage !== "otp" ? 1 : 0);
  const [account, setAccount] = useState(resume ? { ...emptyAccount, ...resume.account } : emptyAccount);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [accountErrors, setAccountErrors] = useState<AccountErrors>({});
  const [taken, setTaken] = useState<Availability | null>(null);
  const [checking, setChecking] = useState(false);
  const [values, setValues] = useState<FormValues>(() =>
    existing ? valuesFromProfile(category, existing) : emptyValues(category),
  );
  const [files, setFiles] = useState<FileValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [done, setDone] = useState<{ failedUploads: number } | null>(null);
  // The code and payment screens show in place of the form.
  const [verify, setVerify] = useState<SignupStart | null>(resume && (resume.stage === "otp" || resume.stage === "pay") ? resume : null);
  // "otp" right after the first step, "pay" after the last one.
  const [verifyMode, setVerifyMode] = useState<"otp" | "pay">(resume?.stage === "pay" ? "pay" : "otp");
  // The verified signup, so the rest of the form can attach to it; and which account details it was verified for.
  const [signup, setSignup] = useState<SignupStart | null>(resume ?? null);
  const verifiedFor = useRef<string | null>(null);
  const profileRef = useRef<Record<string, unknown>>({});
  const top = useRef<HTMLDivElement>(null);

  const last = index === steps.length - 1;
  const current = steps[index];
  const title = current === "account" ? ACCOUNT_STEP : current.title;
  const missing = missingRequired(profileFields, values, files, uploaded);
  const busy = Boolean(pending) || checking;

  function go(next: number) {
    setIndex(next);
    setFormError([]);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setAccountField(key: keyof typeof emptyAccount, value: string) {
    let next = value;
    if (key === "mobile") {
      next = value.replace(/\D/g, "");
      if (next.length > 10 && next.startsWith("91")) next = next.slice(2);
      next = next.slice(0, 10);
    }
    setAccount((a) => ({ ...a, [key]: next }));
    setAccountErrors((e) => ({ ...e, [key]: undefined, ...(key === "password" ? { confirmPassword: undefined } : {}) }));
    // Editing the email or number is the answer to "already registered".
    if (key === "email" || key === "mobile") setTaken(null);
    setFormError([]);
  }

  function setField(key: string, value: FieldValue) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFormError([]);
  }

  function setFieldFiles(field: Field, picked: File[]) {
    const accepted: File[] = [];
    const problems: string[] = [];
    for (const file of picked) {
      const problem = fileProblem(field, file);
      if (problem) problems.push(problem);
      else accepted.push(file);
    }
    setFiles((f) => ({ ...f, [field.key]: accepted }));
    setErrors((e) => ({ ...e, [field.key]: problems[0] }));
  }

  /** The step that holds a given backend field name, so errors send people to the right place. */
  function stepOf(field: string): number {
    if (["fullName", "mobile", "email", "password", "confirmPassword"].includes(field)) return 0;
    const key = field.replace(/^profile\./, "");
    const found = category.steps.findIndex((step) => step.fields.some((f) => f.key === key));
    return found === -1 ? 0 : found + firstProfileStep;
  }

  /** Wrong (not missing) values anywhere in the profile steps: jumps to the first one and reports whether any exist. */
  function profileFormatProblems(): boolean {
    for (let i = firstProfileStep; i < steps.length; i += 1) {
      const found = formatErrors((steps[i] as Step).fields, values);
      if (Object.keys(found).length > 0) {
        setErrors((prev) => ({ ...prev, ...found }));
        if (i !== index) go(i);
        return true;
      }
    }
    return false;
  }

  /** Where to send someone whose email already has an account. */
  function signInLink(availability: Availability): string {
    const params = new URLSearchParams({ email: account.email.trim().toLowerCase() });
    if (availability.emailTaken && availability.incomplete) {
      params.set("reason", "incomplete");
      params.set("next", "/complete-profile");
    } else if (availability.emailTaken) {
      params.set("reason", "exists");
    }
    return `/login?${params.toString()}`;
  }

  /** Reacts to "this email / number already has an account": inline message, a toast, and a way to sign in. */
  function reportTaken(availability: Availability) {
    const found: AccountErrors = {};
    if (availability.emailTaken) found.email = "This email is already registered.";
    if (availability.mobileTaken) found.mobile = "This mobile number is already registered.";
    setAccountErrors(found);
    setTaken(availability);

    const unfinished = availability.emailTaken ? availability.incomplete : null;
    toast.show({
      tone: "warning",
      title: unfinished ? "You've already started registering" : "Already registered",
      message: unfinished
        ? `This email has an unfinished ${category.label.toLowerCase()} registration. Sign in to complete it.`
        : availability.emailTaken
          ? "This email already has an account. Sign in, or try a different email."
          : "This mobile number already has an account. Sign in, or use a different number.",
      action: { label: unfinished ? "Sign in & finish" : "Sign in", href: signInLink(availability) },
      duration: 9000,
    });
  }

  /** Uploads the chosen files and saves them on the profile, then shows the confirmation. */
  async function finish(profile: Record<string, unknown>) {
      // Files go up once the account exists; a failed upload never undoes the registration.
      let failedUploads = 0;
      const filePatch: Record<string, unknown> = {};
      const fileFields = profileFields.filter((f) => f.type === "file" || f.type === "files");
      const total = fileFields.reduce((n, f) => n + (files[f.key]?.length ?? 0), 0);
      let uploadedCount = 0;
      for (const field of fileFields) {
        const urls: string[] = [];
        for (const file of files[field.key] ?? []) {
          setPending(`Uploading files (${uploadedCount + 1} of ${total})…`);
          try {
            urls.push((await uploadsApi.upload(file)).url);
          } catch {
            failedUploads += 1;
          }
          uploadedCount += 1;
        }
        if (urls.length > 0) filePatch[field.key] = field.type === "files" ? urls : urls[0];
      }

      if (complete) {
        await registrationsApi.updateMine(category.key, { ...profile, ...filePatch });
        await refreshUser();
      } else if (Object.keys(filePatch).length > 0) {
        try {
          await registrationsApi.updateMine(category.key, filePatch);
        } catch {
          failedUploads += Object.keys(filePatch).length;
        }
      }

      setDone({ failedUploads });
      top.current?.scrollIntoView({ block: "start" });
  }

  /** The payment went through: the account exists and is signed in. Carry on with the files. */
  async function afterCreated(result: AuthResult) {
    adopt(result);
    toast.show({ tone: "success", title: "Account created", message: "Welcome to Shyam Jagat. Jai Shri Shyam!" });
    setVerify(null);
    setPending("Saving your registration…");
    try {
      await finish(profileRef.current);
    } catch {
      setDone({ failedUploads: 0 });
    } finally {
      setPending(null);
    }
  }

  async function submit() {
    setPending("Saving…");
    setFormError([]);
    try {
      const profile = buildPayload(category, values);
      if (!complete) {
        for (const [key, source] of Object.entries(category.fromAccount)) {
          profile[key] = account[source];
        }
        // The email was verified after step 1. Save the finished form on that pending signup, then the
        // payment (mandatory) creates the account.
        if (!signup) throw new ApiError("Please verify your email first.", 400);
        profileRef.current = profile;
        const saved = await authApi.signupSetProfile(signup.pendingId, profile);
        setSignup(saved);
        setVerifyMode("pay");
        setVerify({ ...saved, emailVerified: true });
        return;
      }

      await finish(profile);
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        const mapped: FieldErrors = {};
        const mappedAccount: AccountErrors = {};
        let earliest = steps.length;
        const messages: string[] = [];
        for (const { field, message } of err.errors) {
          earliest = Math.min(earliest, stepOf(field));
          messages.push(message);
          const isAccountField = ["fullName", "mobile", "email", "password", "confirmPassword"].includes(field);
          if (!complete && isAccountField) (mappedAccount as Record<string, string>)[field] = message;
          else mapped[field.replace(/^profile\./, "")] = message;
        }
        setErrors(mapped);
        setAccountErrors(mappedAccount);
        setFormError(messages);
        setIndex(Math.min(earliest, steps.length - 1));
      } else {
        setFormError([err instanceof ApiError ? err.message : "Something went wrong. Please try again."]);
      }
    } finally {
      setPending(null);
    }
  }

  async function onNext(e: React.FormEvent) {
    e.preventDefault();

    if (current === "account") {
      const found = validateAccount(account, acceptTerms);
      setAccountErrors(found);
      if (Object.keys(found).length > 0) return;

      // Before they fill in a long form: is this email / number already someone's?
      setChecking(true);
      try {
        const availability = await authApi.checkAvailability({
          email: account.email.trim().toLowerCase(),
          mobile: account.mobile.trim(),
        });
        if (availability.emailTaken || availability.mobileTaken) {
          reportTaken(availability);
          return;
        }
      } catch {
        // If the check itself can't run, carry on — starting the signup checks again.
      } finally {
        setChecking(false);
      }

      const email = account.email.trim().toLowerCase();
      const snapshot = JSON.stringify([account.fullName.trim(), email, account.mobile.trim(), account.password]);
      // Already verified for exactly these details (they went Back and forward): do not ask again.
      const unchangedSinceResume = resume && signup?.emailVerified && email === resume.account.email && account.mobile.trim() === resume.account.mobile;
      if (signup && (verifiedFor.current === snapshot || unchangedSinceResume)) {
        go(index + 1);
        return;
      }

      // Right after step 1: send the code. Nothing is created yet.
      setChecking(true);
      try {
        const early: Record<string, unknown> = {};
        for (const [key, source] of Object.entries(category.fromAccount)) early[key] = account[source];
        const started = await authApi.signupStart({
          fullName: account.fullName.trim(),
          mobile: account.mobile.trim(),
          email,
          password: account.password,
          confirmPassword: account.confirmPassword,
          acceptTerms: true,
          category: category.key,
          profile: early,
        });
        verifiedFor.current = snapshot;
        if (started.emailVerified) {
          // Verified on an earlier visit: no new code, carry on with the form.
          setSignup(started);
          go(index + 1);
        } else {
          setVerifyMode("otp");
          setVerify(started);
        }
      } catch (err) {
        if (err instanceof ApiError && err.errors?.length) {
          const mappedAccount: AccountErrors = {};
          for (const { field, message } of err.errors) {
            if (["fullName", "mobile", "email", "password", "confirmPassword"].includes(field)) {
              (mappedAccount as Record<string, string>)[field] = message;
            }
          }
          setAccountErrors(mappedAccount);
          setFormError(err.errors.map((e) => e.message));
        } else {
          setFormError([err instanceof ApiError ? err.message : "Could not send the code. Please try again."]);
        }
      } finally {
        setChecking(false);
      }
      return;
    }

    const here = formatErrors(current.fields, values);
    if (Object.keys(here).length > 0) {
      setErrors((prev) => ({ ...prev, ...here }));
      return;
    }
    if (!last) {
      go(index + 1);
      return;
    }

    // Final step: declarations must be ticked (when registering); blanks are fine.
    if (!complete) {
      const declarations = declarationErrors(current.fields, values);
      if (Object.keys(declarations).length > 0) {
        setErrors((prev) => ({ ...prev, ...declarations }));
        return;
      }
    }
    if (profileFormatProblems()) return;
    await submit();
  }

  /** "Submit now, finish later" from a middle step: sends what's filled in; the rest is flagged as missing. */
  async function submitEarly() {
    if (profileFormatProblems()) return;
    await submit();
  }

  if (verify) {
    return (
      <div ref={top}>
        <VerifyAndPay
          start={verify}
          mode={verifyMode === "otp" ? "otp" : "full"}
          onBack={() => setVerify(null)}
          onVerified={(next) => {
            // Email verified: carry on with the rest of the form.
            setSignup(next);
            setVerify(null);
            go(index + 1);
          }}
          onCreated={afterCreated}
        />
      </div>
    );
  }

  if (done) {
    const stillMissing = missing.map(cleanLabel);
    return (
      <div ref={top} className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
        <h1 className="font-serif text-2xl font-bold text-maroon">
          {complete ? "Profile Saved" : "Registration Submitted"}
        </h1>
        <p className="max-w-[340px] text-sm text-muted-foreground">
          {complete
            ? "Thank you! Your changes are saved and our seva team will see the updated details."
            : `Thank you! Your ${category.label.toLowerCase()} registration is with our seva team. They usually review it within 24–48 hours, and you can sign in any time with your email and password.`}
        </p>
        {stillMissing.length > 0 ? (
          <PendingPreview items={stillMissing} categoryKey={category.key} title={`${category.label} details still to add`} />
        ) : (
          complete && (
            <p className="max-w-[340px] rounded-lg bg-green-50 px-3 py-2 text-xs text-green-800">
              {"Your profile is complete. Thank you!"}
            </p>
          )
        )}
        {done.failedUploads > 0 && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {`${done.failedUploads} file${done.failedUploads > 1 ? "s" : ""} couldn't be uploaded, but everything else was saved. You can add them later.`}
          </p>
        )}
        <Link
          href="/"
          className="mt-2 w-full rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-2 text-center text-base font-semibold text-white"
        >
          {"Continue"}
        </Link>
      </div>
    );
  }

  const unfinished = taken?.emailTaken ? taken.incomplete : null;

  return (
    <>
      <div ref={top} className="flex flex-col items-center gap-0.5 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          {complete ? `Complete your ${category.label} profile` : `Register as ${category.label}`}
        </p>
        <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">{title}</h1>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>{`Step ${index + 1} of ${steps.length}`}</span>
          <span>{`${Math.round(((index + 1) / steps.length) * 100)}%`}</span>
        </div>
        <div className="flex gap-1" aria-hidden>
          {steps.map((_, i) => (
            <span key={i} className={cn("h-1.5 flex-1 rounded-full", i <= index ? "bg-primary" : "bg-border")} />
          ))}
        </div>
      </div>

      <form onSubmit={onNext} noValidate className="mt-4 flex flex-col gap-4">
        {current === "account" ? (
          <div className="flex flex-col gap-5">
            <p className="text-[13px] text-muted-foreground">
              {"This is the login you'll use to sign in later. It's created together with your registration."}
            </p>
            <AuthField label={`${category.accountLabels.name} *`} htmlFor="fullName" error={accountErrors.fullName}>
              <TextField
                id="fullName"
                icon={User}
                autoComplete="name"
                placeholder={category.accountLabels.namePlaceholder}
                value={account.fullName}
                onChange={(e) => setAccountField("fullName", e.target.value)}
              />
            </AuthField>
            <AuthField label={`${category.accountLabels.mobile} *`} htmlFor="mobile" error={accountErrors.mobile}>
              <TextField
                id="mobile"
                icon={Phone}
                prefix="+91"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={"10-digit mobile number"}
                value={account.mobile}
                onChange={(e) => setAccountField("mobile", e.target.value)}
              />
            </AuthField>
            <AuthField label={`${category.accountLabels.email} *`} htmlFor="email" error={accountErrors.email}>
              <TextField
                id="email"
                icon={Mail}
                type="email"
                autoComplete="email"
                placeholder={"your@email.com"}
                value={account.email}
                onChange={(e) => setAccountField("email", e.target.value)}
              />
            </AuthField>

            {taken && (
              <div role="alert" className="flex flex-col gap-3 rounded-xl border border-primary/40 bg-[#FFF4E8] p-3.5">
                <p className="flex items-start gap-2 text-[13px] text-maroon">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {unfinished
                    ? `You already started registering as ${unfinished.category} with this email but didn't finish. Sign in to pick up where you left off.`
                    : taken.emailTaken
                      ? "This email already has an account. Sign in with it, or try a different email."
                      : "This mobile number already belongs to an account. Use a different number, or sign in if it's yours."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={signInLink(taken)}
                    className={cn(buttonBase, "bg-primary px-4 py-1.5 text-white hover:opacity-90")}
                  >
                    {unfinished ? "Sign in & finish" : "Sign in"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setTaken(null);
                      const field = document.getElementById(taken.emailTaken ? "email" : "mobile") as HTMLInputElement | null;
                      field?.focus();
                      field?.select();
                    }}
                    className={cn(buttonBase, "border-[1.5px] border-border bg-white px-4 py-1.5 text-maroon hover:bg-cream")}
                  >
                    {taken.emailTaken ? "Use a different email" : "Use a different number"}
                  </button>
                </div>
              </div>
            )}

            <AuthField label={"Password *"} htmlFor="password" error={accountErrors.password}>
              <PasswordField
                id="password"
                icon={Lock}
                autoComplete="new-password"
                placeholder={"Create a password"}
                value={account.password}
                onChange={(e) => setAccountField("password", e.target.value)}
              />
            </AuthField>
            <AuthField label={"Confirm Password *"} htmlFor="confirmPassword" error={accountErrors.confirmPassword}>
              <PasswordField
                id="confirmPassword"
                icon={Lock}
                autoComplete="new-password"
                placeholder={"Confirm your password"}
                value={account.confirmPassword}
                onChange={(e) => setAccountField("confirmPassword", e.target.value)}
              />
            </AuthField>
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={acceptTerms}
                  aria-label="I agree to the Terms of Service and Privacy Policy"
                  onClick={() => {
                    setAcceptTerms((v) => !v);
                    setAccountErrors((e) => ({ ...e, acceptTerms: undefined }));
                  }}
                  className={cn(
                    "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded",
                    acceptTerms ? "bg-primary" : "border-[1.5px] border-border bg-white",
                  )}
                >
                  {acceptTerms && <Check className="h-2.5 w-2.5 text-white" />}
                </button>
                <p className="text-[13px] text-muted-foreground">
                  {"I agree to the"}{" "}
                  <Link href="/terms" className="text-primary underline">
                    {"Terms of Service"}
                  </Link>{" "}
                  {"and"}{" "}
                  <Link href="/privacy-policy" className="text-primary underline">
                    {"Privacy Policy"}
                  </Link>
                </p>
              </div>
              {accountErrors.acceptTerms && <p className="text-xs text-red-600">{accountErrors.acceptTerms}</p>}
            </div>
          </div>
        ) : (
          <>
            <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <Info className="mt-px h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              {"Fields marked * are needed for a complete profile. Skip any you like and add them later."}
            </p>
            <FieldGrid
              fields={current.fields}
              values={values}
              files={files}
              uploaded={uploaded}
              errors={errors}
              onChange={setField}
              onFiles={setFieldFiles}
            />
            {last && missing.length > 0 && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                {`Still empty: ${missing.map(cleanLabel).join(", ")}. You can ${complete ? "save" : "submit"} now — your profile will be marked incomplete until you add them.`}
              </p>
            )}
          </>
        )}

        {formError.length > 0 && (
          <div role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError.length === 1 ? (
              formError[0]
            ) : (
              <ul className="list-disc pl-5">
                {[...new Set(formError)].map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => (index === 0 ? onBack() : go(index - 1))}
            disabled={busy}
            className={cn(
              buttonBase,
              "flex items-center gap-1.5 border-[1.5px] border-border bg-white px-3.5 py-1.5 text-maroon hover:bg-cream",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {"Back"}
          </button>
          <button
            type="submit"
            disabled={busy}
            className={cn(
              buttonBase,
              "bg-gradient-to-r from-primary to-primary-dark px-6 py-1.5 text-white shadow-sm hover:shadow-md",
              !busy && "motion-safe:animate-soft-zoom hover:[animation-play-state:paused]",
            )}
          >
            {pending ?? (checking ? "Checking…" : last ? (complete ? "Save Profile →" : "Submit Registration →") : "Next →")}
          </button>
        </div>

        {current !== "account" && !last && (
          <button
            type="button"
            onClick={submitEarly}
            disabled={busy}
            className="mx-auto text-xs text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-primary disabled:opacity-60"
          >
            {complete ? "Save now, finish my profile later" : "Submit now, finish my profile later"}
          </button>
        )}

        {last && !complete && (
          <p className="text-center text-xs text-muted-foreground">
            {"Our seva team reviews every registration, usually within 24–48 hours."}
          </p>
        )}
      </form>
    </>
  );
}
