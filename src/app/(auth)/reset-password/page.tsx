"use client";

import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;जय श्री श्याम&rdquo; —
          <br />
          {"A fresh start, with Baba's blessings"}
        </>
      }
      quoteSub={"Choose a new password to get back to your account"}
    >
      {/* The form reads ?token= from the emailed link. */}
      <Suspense fallback={<div className="min-h-[320px]" />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
