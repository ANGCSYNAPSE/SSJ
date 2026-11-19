import { BadgeCheck, CircleDashed, Mail, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Flags = {
  emailVerified?: boolean;
  mobileVerified?: boolean;
  isVerified?: boolean;
  adminVerifiedAt?: string | null;
};

function Row({ icon: Icon, label, ok, yes, no }: { icon: LucideIcon; label: string; ok: boolean; yes: string; no: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          ok ? "bg-green-100 text-green-700" : "bg-[#fff1d8] text-amber-700",
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#8a8580]">{label}</p>
        <p className={cn("text-sm font-semibold", ok ? "text-green-700" : "text-amber-700")}>{ok ? yes : no}</p>
      </div>
      {ok ? (
        <BadgeCheck className="h-5 w-5 shrink-0 text-green-600" aria-label="Verified" />
      ) : (
        <CircleDashed className="h-5 w-5 shrink-0 text-amber-500" aria-label="Not verified yet" />
      )}
    </div>
  );
}

/** The three separate marks on an account: email, phone, and Shyam Jagat's own check of the person's details. */
export default function VerificationStatus({ account, className }: { account: Flags; className?: string }) {
  return (
    <div className={cn("divide-y divide-[#d4af37]/20", className)}>
      <Row icon={Mail} label="Email" ok={Boolean(account.emailVerified)} yes="Email verified" no="Email not verified" />
      <Row icon={Smartphone} label="Phone" ok={Boolean(account.mobileVerified)} yes="Phone verified" no="Phone not verified yet" />
      <Row
        icon={ShieldCheck}
        label="Shyam Jagat team"
        ok={Boolean(account.isVerified)}
        yes="Verified by the team"
        no="Awaiting team verification"
      />
    </div>
  );
}
