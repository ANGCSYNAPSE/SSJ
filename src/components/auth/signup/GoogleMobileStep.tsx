"use client";

import { useState } from "react";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { AuthField } from "@/components/auth/AuthShell";
import { SubmitButton, TextField } from "@/components/auth/TextField";
import PolicyLink from "@/components/legal/PolicyDialog";
import { useToast } from "@/components/ui/Toast";
import { ApiError, authApi, type SignupResume } from "@/lib/api";

export interface GoogleNewAccount {
  credential: string;
  fullName: string;
  email: string;
}

/** Where the login page leaves a brand-new Google person for the signup page to pick up. */
export const GOOGLE_NEW_KEY = "ssj-google-new";

/**
 * The one thing Google cannot tell us: the mobile number. The email is already proven by Google, so there is
 * no password and no emailed code; the next screen is the person's details, then the payment.
 */
export default function GoogleMobileStep({
  account,
  initialMobile = "",
  onStarted,
  onCancel,
}: {
  account: GoogleNewAccount;
  /** Filled in when the person comes back to this step from a later one. */
  initialMobile?: string;
  onStarted: (resume: SignupResume) => void;
  onCancel: () => void;
}) {
  const toast = useToast();
  const [mobile, setMobile] = useState(initialMobile);
  const [accept, setAccept] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!accept) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      onStarted(await authApi.googleStart(account.credential, mobile));
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        toast.show({
          tone: "warning",
          title: "Already registered",
          message: "This email or mobile number already has an account. Please sign in instead.",
          action: { label: "Sign in", href: `/login?email=${encodeURIComponent(account.email)}` },
        });
        setError(err.errors?.[0]?.message ?? err.message);
      } else if (err instanceof ApiError && err.status === 401) {
        setError("Your Google sign-in has expired. Please go back and choose Continue with Google again.");
      } else {
        setError(err instanceof ApiError ? (err.errors?.[0]?.message ?? err.message) : "Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  const first = account.fullName.trim().split(/\s+/)[0] || "friend";

  return (
    <>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">{`Welcome, ${first}`}</h1>
        <p className="text-sm text-muted-foreground">
          {"Google has confirmed "}
          <b className="text-maroon">{account.email}</b>
          {". Add your mobile number to continue."}
        </p>
      </div>

      <form onSubmit={submit} noValidate className="mt-5 flex flex-col gap-4">
        <button type="button" onClick={onCancel} className="flex w-fit items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          {"Back"}
        </button>

        <AuthField label={"Mobile Number"} htmlFor="mobile">
          <TextField
            id="mobile"
            icon={Phone}
            prefix="+91"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={"10-digit mobile number"}
            value={mobile}
            onChange={(e) => {
              let next = e.target.value.replace(/\D/g, "");
              if (next.length > 10 && next.startsWith("91")) next = next.slice(2);
              setMobile(next.slice(0, 10));
              setError(null);
            }}
          />
        </AuthField>

        <div className="flex items-start gap-2.5">
          <button
            type="button"
            role="checkbox"
            aria-checked={accept}
            aria-label="I agree to the Terms of Service and Privacy Policy"
            onClick={() => {
              setAccept((v) => !v);
              setError(null);
            }}
            className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded ${accept ? "bg-primary" : "border-[1.5px] border-border bg-white"}`}
          >
            {accept && <Check className="h-2.5 w-2.5 text-white" />}
          </button>
          <p className="text-[13px] text-muted-foreground">
            {"I agree to the "}
            <PolicyLink doc="terms" with={["privacy"]}>
              {"Terms of Service"}
            </PolicyLink>
            {" and "}
            <PolicyLink doc="privacy" with={["terms"]}>
              {"Privacy Policy"}
            </PolicyLink>
          </p>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <SubmitButton pending={pending}>{"Continue →"}</SubmitButton>
        <p className="text-center text-xs text-muted-foreground">{"You will sign in with Google next time. You can also set a password later with Forgot password."}</p>
      </form>
    </>
  );
}
