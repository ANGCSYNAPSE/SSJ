"use client";

import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;सेवा परमो धर्म&rdquo; —
          <br />
          {"Service is the Highest Duty"}
        </>
      }
      quoteSub={"Join our community of faith, seva, and compassion"}
    >
      <SignupForm />
    </AuthShell>
  );
}
