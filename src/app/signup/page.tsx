import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "./SignupForm";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignupPage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;सेवा परमो धर्म&rdquo; —
          <br />
          Service is the Highest Duty
        </>
      }
      quoteSub="Join our community of faith, seva, and compassion"
    >
      <SignupForm />
    </AuthShell>
  );
}
