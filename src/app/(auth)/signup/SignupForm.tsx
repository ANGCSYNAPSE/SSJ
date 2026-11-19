"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  BadgeCheck,
  Lock,
  Mail,
  Phone,
  User,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { RESUME_KEY, useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import VerifyAndPay from "@/components/auth/signup/VerifyAndPay";
import MemberDetails, { type MemberDetailsValue } from "@/components/auth/signup/MemberDetails";
import { authApi, meApi, uploadsApi, type SignupResume, type SignupStart } from "@/lib/api";
import {
  AuthField,
  AuthDivider,
  GoogleButton,
  AuthSwitchLink,
} from "@/components/auth/AuthShell";
import { TextField, PasswordField, SubmitButton } from "@/components/auth/TextField";
import CategoryWizard from "@/components/auth/signup/CategoryWizard";
import { CATEGORIES, categoryByKey } from "@/components/auth/signup/categories";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>> & { form?: string };
type Stage = "choose" | "categories" | "member" | "wizard";

const initial = {
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

/** Mirrors the backend validator so users get feedback before the round trip. */
function validate(v: typeof initial, accept: boolean): Errors {
  const found: Errors = {};

  if (v.fullName.trim().length < 2) found.fullName = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(v.mobile.trim())) found.mobile = "Enter a valid 10-digit Indian mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) found.email = "Enter a valid email address.";
  if (v.password.length < 8) {
    found.password = "Password must be at least 8 characters.";
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(v.password)) {
    found.password = "Include at least one letter and one number.";
  }
  if (v.confirmPassword !== v.password) found.confirmPassword = "Passwords do not match.";
  if (!accept) found.acceptTerms = "Please accept the Terms of Service to continue.";

  return found;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-fit items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
      {"Back"}
    </button>
  );
}

function CheckRow({
  checked,
  onToggle,
  label,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={onToggle}
        className={cn(
          "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded",
          checked ? "bg-primary" : "border-[1.5px] border-border bg-white",
        )}
      >
        {checked && <Check className="h-2.5 w-2.5 text-white" />}
      </button>
      <p className="text-[13px] text-muted-foreground">{children}</p>
    </div>
  );
}

/**
 * One of the two first-screen options. `names` renders a row of short labels
 * separated by "|"; `tint` gives the card a very light brand-colour wash.
 */
function ChoiceCard({
  icon: Icon,
  title,
  desc,
  names,
  onClick,
  tint,
}: {
  icon: LucideIcon;
  title: string;
  desc?: string;
  names?: string[];
  onClick: () => void;
  tint?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left transition-colors",
        tint
          ? "border-primary/30 bg-[#FFF4E8] hover:border-primary/60 hover:bg-[#FFEEDC]"
          : "border-border bg-white hover:border-primary/50 hover:bg-cream-light",
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
        <Icon className="h-[18px] w-[18px] text-primary" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-bold leading-tight text-maroon">{title}</span>
        {desc && <span className="text-[11px] leading-snug text-muted-foreground">{desc}</span>}
        {names && (
          <span className="flex flex-wrap items-center text-[11px] font-semibold leading-snug text-primary">
            {names.map((name, i) => (
              <span key={name} className="flex items-center">
                {name}
                {i < names.length - 1 && (
                  <span className="mx-1 font-normal text-primary/40" aria-hidden>
                    {"|"}
                  </span>
                )}
              </span>
            ))}
          </span>
        )}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
    </button>
  );
}

export default function SignupForm() {
  const router = useRouter();
  const { user, loading, adopt } = useAuth();
  const toast = useToast();
  const [verify, setVerify] = useState<SignupStart | null>(null);
  // The code comes first; then step 2 (where they live); then the payment, which creates the account.
  const [verifyMode, setVerifyMode] = useState<"otp" | "pay">("otp");
  const [signup, setSignup] = useState<SignupStart | null>(null);
  const [details, setDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [savingDetails, setSavingDetails] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("choose");
  const [categoryKey, setCategoryKey] = useState<string | null>(null);
  // An unfinished signup picked up from the login screen: the wizard continues from its stage.
  const [resume, setResume] = useState<SignupResume | null>(null);
  const [values, setValues] = useState(initial);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [becomeMember, setBecomeMember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  // Signed in at the login screen with an unfinished signup: carry on from the step they had reached.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.sessionStorage.getItem(RESUME_KEY);
      window.sessionStorage.removeItem(RESUME_KEY);
    } catch {
      /* storage blocked */
    }
    if (!saved) return;
    let cancelled = false;
    (async () => {
      try {
        const stored = JSON.parse(saved!) as SignupResume;
        // Re-read the state: it may have moved on (a payment made, a code expired) since the login.
        const current = await authApi.signupResume(stored.pendingId);
        if (cancelled) return;
        toast.show({ tone: "info", title: "Welcome back", message: "Your registration is not finished yet. Let's carry on where you stopped." });
        if (current.stage === "complete") {
          // Already paid: only the account is left to create.
          setVerifyMode("pay");
          setVerify({ ...current, emailVerified: true });
        } else if (current.category) {
          setCategoryKey(current.category);
          setResume(current);
          setStage("wizard");
        } else {
          setStage("member");
          setSignup(current);
          if (current.stage === "otp") {
            setVerifyMode("otp");
            setVerify(current);
          } else if (current.stage === "details") {
            setDetails(true);
          } else {
            setVerifyMode("pay");
            setVerify({ ...current, emailVerified: true });
          }
        }
      } catch {
        /* the signup expired or was finished meanwhile: the person starts again from the form */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Someone already signed in has no business on this page — except mid-registration:
  // the category wizard signs the person in, then uploads files and shows its own confirmation.
  useEffect(() => {
    if (!loading && user && !pending && !done && stage !== "wizard") router.replace("/");
  }, [loading, user, pending, done, stage, router]);

  const update =
    (field: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let next = e.target.value;
      if (field === "mobile") {
        // Pasted/autofilled values like "+91 98765 43210" must still fit the 10-digit field.
        next = next.replace(/\D/g, "");
        if (next.length > 10 && next.startsWith("91")) next = next.slice(2);
        next = next.slice(0, 10);
      }
      setValues((v) => ({ ...v, [field]: next }));
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
        // A stale "do not match" error must not outlive an edit to either password field.
        ...(field === "password" ? { confirmPassword: undefined } : {}),
        form: undefined,
      }));
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
      // Nothing is created yet: a code is emailed, then the payment, then the account.
      const started = await authApi.signupStart({ ...values, acceptTerms, becomeMember });
      // They may have verified their email on an earlier visit: no new code, go to where they were.
      if (started.stage === "details") {
        setSignup(started);
        setDetails(true);
      } else if (started.stage === "pay" || started.stage === "complete") {
        setSignup(started);
        setVerifyMode("pay");
        setVerify({ ...started, emailVerified: true });
      } else {
        setVerifyMode("otp");
        setVerify(started);
      }
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        if (err.status === 409 && err.errors.some((f) => f.field === "email" || f.field === "mobile")) {
          toast.show({
            tone: "warning",
            title: "Already registered",
            message: "This email or mobile number already has an account. Please sign in instead.",
            action: { label: "Sign in", href: `/login?email=${encodeURIComponent(values.email.trim().toLowerCase())}` },
          });
        }
        setErrors(Object.fromEntries(err.errors.map((f) => [f.field, f.message])));
      } else {
        setErrors({
          form: err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
        });
      }
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
        <h1 className="font-serif text-2xl font-bold text-maroon">{"Welcome to the Family"}</h1>
        <p className="max-w-[340px] text-sm text-muted-foreground">
          {"Your account is ready. Jai Shree Shyam!"}
        </p>
        <Link
          href="/"
          className="mt-2 w-full rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-2 text-center text-base font-semibold text-white"
        >
          {"Continue"}
        </Link>
      </div>
    );
  }

  if (verify) {
    return (
      <VerifyAndPay
        start={verify}
        mode={verifyMode === "otp" ? "otp" : "full"}
        onBack={() => {
          setVerify(null);
          if (verifyMode === "pay") setDetails(true);
        }}
        onVerified={(next) => {
          // Email verified: step 2 (their details) comes next, then the payment.
          setSignup(next);
          setVerify(null);
          setDetails(true);
        }}
        onCreated={(result) => {
          // done first, so the "already signed in" redirect does not fire before the welcome screen.
          setDone(true);
          setVerify(null);
          adopt(result);
          toast.show({ tone: "success", title: "Account created", message: "Welcome to Shyam Jagat. Jai Shri Shyam!" });
          // The photo can only go up now that there is an account; a failure never undoes the registration.
          if (photo) {
            uploadsApi
              .upload(photo)
              .then(({ url }) => meApi.update({ avatarUrl: url }))
              .catch(() => undefined);
          }
        }}
      />
    );
  }

  if (details && signup) {
    return (
      <MemberDetails
        pending={savingDetails}
        error={detailsError}
        onBack={() => setDetails(false)}
        onSubmit={async (value: MemberDetailsValue) => {
          setSavingDetails(true);
          setDetailsError(null);
          try {
            const saved = await authApi.signupSetProfile(signup.pendingId, { city: value.city, state: value.state });
            setSignup(saved);
            setPhoto(value.photo);
            setDetails(false);
            setVerifyMode("pay");
            setVerify({ ...saved, emailVerified: true });
          } catch (err) {
            setDetailsError(err instanceof ApiError ? err.message : "Could not save your details. Please try again.");
          } finally {
            setSavingDetails(false);
          }
        }}
      />
    );
  }

  if (stage === "choose") {
    return (
      <>
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">{"Join Our Sacred Family"}</h1>
          <p className="text-xs text-muted-foreground">{"How would you like to join?"}</p>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <ChoiceCard
            icon={UserRound}
            title={"As a User"}
            desc={"Create an account to join the devotee community."}
            onClick={() => setStage("member")}
          />
          <ChoiceCard
            tint
            icon={BadgeCheck}
            title={"Register As"}
            names={["Artist", "Musician", "Temple", "Dharamshala", "Mandal" , "Dancer"]}
            onClick={() => setStage("categories")}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <AuthDivider label={"— or continue with —"} />
          <GoogleButton label={"Continue with Google"} />
          <AuthSwitchLink prompt={"Already have an account?"} href="/login" label={"Sign In"} />
        </div>
      </>
    );
  }

  if (stage === "categories") {
    return (
      <>
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">{"Register As"}</h1>
          <p className="text-xs text-muted-foreground">
            {"Choose one and you'll fill in the form made for it."}
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          <BackButton onClick={() => setStage("choose")} />
          <div className="flex flex-col gap-2">
            {CATEGORIES.map(({ key, label, blurb, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setCategoryKey(key);
                  setStage("wizard");
                }}
                className="flex items-center gap-3 rounded-xl border-[1.5px] border-primary/40 bg-primary/5 px-3.5 py-2.5 text-left transition-colors hover:border-primary hover:bg-primary/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Icon className="h-5 w-5 text-white" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-base font-bold leading-tight text-maroon">{label}</span>
                  <span className="text-[13px] leading-snug text-muted-foreground">{blurb}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              </button>
            ))}
          </div>
          <AuthSwitchLink prompt={"Already have an account?"} href="/login" label={"Sign In"} />
        </div>
      </>
    );
  }

  const chosen = categoryByKey(categoryKey);
  if (stage === "wizard" && chosen) {
    return <CategoryWizard category={chosen} resume={resume ?? undefined} onBack={() => setStage("categories")} />;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">{"Join Our Sacred Family"}</h1>
        <p className="text-xs text-muted-foreground">{"Create your account and begin your journey of seva."}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-3 flex flex-col gap-3">
        <BackButton onClick={() => setStage("choose")} />

        <div className="flex flex-col gap-5">
          <AuthField label={"Full Name"} htmlFor="fullName" error={errors.fullName}>
            <TextField
              id="fullName"
              icon={User}
              autoComplete="name"
              placeholder={"Enter your full name"}
              value={values.fullName}
              onChange={update("fullName")}
            />
          </AuthField>

          <AuthField label={"Mobile Number"} htmlFor="mobile" error={errors.mobile}>
            <TextField
              id="mobile"
              icon={Phone}
              prefix="+91"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={"Mobile number"}
              value={values.mobile}
              onChange={update("mobile")}
            />
          </AuthField>

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
              autoComplete="new-password"
              placeholder={"Create a password"}
              value={values.password}
              onChange={update("password")}
            />
          </AuthField>

          <AuthField label={"Confirm Password"} htmlFor="confirmPassword" error={errors.confirmPassword}>
            <PasswordField
              id="confirmPassword"
              icon={Lock}
              autoComplete="new-password"
              placeholder={"Confirm your password"}
              value={values.confirmPassword}
              onChange={update("confirmPassword")}
            />
          </AuthField>

          <div className="flex flex-col gap-2.5">
            {/* "Become a Member of Shyam Jagat (optional)" checkbox: hidden for now
            <CheckRow
              checked={becomeMember}
              onToggle={() => setBecomeMember((v) => !v)}
              label="Become a Member"
            >
              {"Become a Member of Shyam Jagat (optional)"}
            </CheckRow>
            */}
            <CheckRow
              checked={acceptTerms}
              onToggle={() => {
                setAcceptTerms((v) => !v);
                setErrors((p) => ({ ...p, acceptTerms: undefined }));
              }}
              label="I agree to the Terms of Service and Privacy Policy"
            >
              {"I agree to the"}{" "}
              <Link href="/terms" className="text-primary underline">
                {"Terms of Service"}
              </Link>{" "}
              {"and"}{" "}
              <Link href="/privacy" className="text-primary underline">
                {"Privacy Policy"}
              </Link>
            </CheckRow>
            {errors.acceptTerms && <p className="text-xs text-red-600">{errors.acceptTerms}</p>}
          </div>
        </div>

        {errors.form && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.form}
          </p>
        )}

        <SubmitButton pending={pending}>{"Create My Account →"}</SubmitButton>
      </form>

      <div className="mt-2 flex flex-col gap-3">
        <AuthDivider label={"— or continue with —"} />
        <GoogleButton label={"Continue with Google"} />
        <AuthSwitchLink prompt={"Already have an account?"} href="/login" label={"Sign In"} />
      </div>
    </>
  );
}
