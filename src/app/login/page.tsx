import type { Metadata } from "next";
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
      <LoginForm />
    </AuthShell>
  );
}
