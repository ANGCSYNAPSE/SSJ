"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import RequireAuth from "@/components/auth/RequireAuth";
import CategoryWizard from "@/components/auth/signup/CategoryWizard";
import { categoryByKey } from "@/components/auth/signup/categories";
import { ApiError, registrationsApi, type MyProfile } from "@/lib/api";

/** Reopens a saved registration so its owner can add what's missing. */
function CompleteProfile() {
  const router = useRouter();
  const params = useSearchParams();
  const [profiles, setProfiles] = useState<MyProfile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(params.get("category"));

  useEffect(() => {
    let cancelled = false;
    registrationsApi
      .mine()
      .then((list) => !cancelled && setProfiles(list))
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Could not load your registration.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p className="py-6 text-center text-sm text-red-600">{error}</p>;
  if (!profiles) return <p className="py-10 text-center text-sm text-muted-foreground">Loading your registration…</p>;

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <h1 className="font-serif text-2xl font-bold text-maroon">{"Nothing to complete yet"}</h1>
        <p className="max-w-[320px] text-sm text-muted-foreground">
          {"You haven't registered as an artist, temple, dharamshala or mandal. You can do that any time."}
        </p>
        <Link
          href="/register"
          className="mt-2 w-full rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-2 text-center text-base font-semibold text-white"
        >
          {"See registration options"}
        </Link>
      </div>
    );
  }

  const profile =
    profiles.find((p) => p.category === chosen) ??
    (profiles.length === 1 ? profiles[0] : undefined);
  const category = categoryByKey(profile?.category);

  if (!profile || !category) {
    return (
      <>
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">{"Your registrations"}</h1>
          <p className="text-xs text-muted-foreground">{"Choose one to complete."}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {profiles.map((p) => {
            const label = categoryByKey(p.category)?.label ?? p.category;
            const left = p.missingFields?.length ?? 0;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setChosen(p.category)}
                className="flex items-center gap-3 rounded-xl border-[1.5px] border-primary/40 bg-primary/5 px-3.5 py-3 text-left transition-colors hover:border-primary hover:bg-primary/10"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-base font-bold text-maroon">{label}</span>
                  <span className="text-[13px] text-muted-foreground">
                    {left > 0 ? `${left} detail${left > 1 ? "s" : ""} still to add` : "Complete"}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              </button>
            );
          })}
        </div>
      </>
    );
  }

  return <CategoryWizard key={profile.id} category={category} existing={profile} onBack={() => router.push("/")} />;
}

export default function CompleteProfilePage() {
  return (
    <AuthShell
      quote={
        <>
          &ldquo;सेवा ही परम धर्म है&rdquo; —
          <br />
          {"Almost there"}
        </>
      }
      quoteSub={"Finish your profile so our team can review and list it"}
    >
      <RequireAuth>
        {/* useSearchParams (?category=) needs a Suspense boundary. */}
        <Suspense fallback={<div className="min-h-[320px]" />}>
          <CompleteProfile />
        </Suspense>
      </RequireAuth>
    </AuthShell>
  );
}
