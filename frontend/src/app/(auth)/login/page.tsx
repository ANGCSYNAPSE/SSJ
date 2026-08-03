import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;जय श्री श्याम&rdquo; —
          <br />
          Welcome Back, Devotee
        </>
      }
      quoteSub="Continue your journey of faith, seva, and compassion"
    >
      {/* LoginForm reads ?next= via useSearchParams, which opts the subtree
          out of prerendering unless it sits behind a Suspense boundary. */}
      <Suspense fallback={<div className="min-h-[420px]" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
