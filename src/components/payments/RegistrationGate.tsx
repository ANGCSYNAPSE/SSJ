"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

/** Pages an unpaid member may still read. Everything else sends them to finish registering. */
const OPEN_PATHS = ["/complete-registration", "/terms", "/privacy"];

/**
 * A registration is not finished until at least the minimum fee is paid. Someone signed in who has paid
 * nothing (for example an account made before payment became mandatory) is taken to where they left off:
 * their saved details first if those are incomplete, then the payment page. Part-paid members are not
 * held back: they only get the balance reminder. Admins never owe the fee.
 */
export default function RegistrationGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const unpaid = Boolean(user) && user?.registrationFee === "pending";
  const onOpenPath = OPEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const blocked = unpaid && !onOpenPath;

  useEffect(() => {
    if (loading || !blocked || !user) return;
    const unfinished = user.profiles?.find((p) => p.isComplete === false);
    router.replace(unfinished ? `/complete-profile?category=${unfinished.category}` : "/complete-registration");
  }, [loading, blocked, user, router]);

  // While they are being sent on, show nothing of the site rather than a flash of it.
  if (!loading && blocked) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Taking you to finish your registration…</p>
      </div>
    );
  }
  return <>{children}</>;
}
