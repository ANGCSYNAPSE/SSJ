"use client";

import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;जय श्री श्याम&rdquo; —
          <br />
          {"We will help you find your way back"}
        </>
      }
      quoteSub={"Reset your password and continue your journey of faith, seva, and compassion"}
    >
      <Suspense fallback={<div className="min-h-[320px]" />}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
