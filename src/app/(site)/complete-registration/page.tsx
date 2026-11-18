"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/components/auth/AuthProvider";
import RegistrationFeeCard from "@/components/payments/RegistrationFeeCard";

/** Where someone who is signed in but has not paid the registration fee is sent to finish. */
function CompleteRegistration() {
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();

  return (
    <div className="bg-[#fffaf1] px-6 py-12 lg:px-[88px]">
      <div className="mx-auto flex max-w-[640px] flex-col gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Jai Shri Shyam{user ? `, ${user.fullName.split(" ")[0]}` : ""}</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-maroon">Complete your registration</h1>
          <p className="mx-auto mt-2 max-w-[460px] text-sm text-[#595656]">
            Your registration is not finished until the registration fee is paid. Pay at least the minimum below to start using Shyam Jagat. You can pay the rest later.
          </p>
        </div>

        <RegistrationFeeCard
          onPaid={async () => {
            await refreshUser();
            router.replace("/");
          }}
        />

        <button
          type="button"
          onClick={async () => {
            await logout();
            router.replace("/");
          }}
          className="mx-auto flex items-center gap-2 text-sm font-semibold text-[#595656] hover:text-maroon"
        >
          <LogOut className="h-4 w-4" aria-hidden /> Sign out
        </button>
      </div>
    </div>
  );
}

export default function CompleteRegistrationPage() {
  return (
    <RequireAuth>
      <CompleteRegistration />
    </RequireAuth>
  );
}
