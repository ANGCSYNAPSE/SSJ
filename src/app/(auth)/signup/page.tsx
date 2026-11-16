"use client";

import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;हारे का सहारा, बाबा श्याम हमारा&rdquo; —
          <br />
          
        </>
      }
      quoteSub={"Join our community of faith, seva, and compassion"}
    >
      <SignupForm />
    </AuthShell>
  );
}
