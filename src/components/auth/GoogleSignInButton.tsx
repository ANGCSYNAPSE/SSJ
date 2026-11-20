"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/Toast";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

interface GoogleIdApi {
  initialize: (config: { client_id: string; callback: (response: { credential?: string }) => void; auto_select?: boolean; cancel_on_tap_outside?: boolean }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
}
declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleIdApi } };
  }
}

let scriptPromise: Promise<void> | null = null;
/** Loads Google's sign-in script once for the whole site. */
function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null; // allow another try
      reject(new Error("Google script blocked"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/** The look-alike used when Google's own button is unavailable (not set up, blocked, or still loading). */
function PlainButton({ label, onClick, busy }: { label: string; onClick?: () => void; busy?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="flex w-full items-center justify-center gap-3 rounded-xl border-[1.5px] border-border bg-white py-2 transition-colors hover:bg-cream disabled:opacity-60"
    >
      <Image src="/images/brand/google.svg" alt="" width={20} height={20} unoptimized aria-hidden />
      <span className="text-[15px] font-semibold text-maroon">{label}</span>
    </button>
  );
}

/**
 * "Continue with Google". Google's own button is drawn (so it is always the approved design); when a person
 * picks an account, `onCredential` gets Google's signed ID token, which the backend verifies.
 */
export default function GoogleSignInButton({
  label = "Continue with Google",
  onCredential,
  disabled,
}: {
  label?: string;
  onCredential: (credential: string) => void;
  disabled?: boolean;
}) {
  const toast = useToast();
  const holder = useRef<HTMLDivElement>(null);
  const latest = useRef(onCredential);
  latest.current = onCredential;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;
    loadGoogleScript()
      .then(() => {
        const api = window.google?.accounts?.id;
        const node = holder.current;
        if (cancelled || !api || !node) return;
        api.initialize({
          client_id: CLIENT_ID,
          callback: (response) => response.credential && latest.current(response.credential),
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        const width = Math.min(400, Math.max(200, Math.round(node.getBoundingClientRect().width)));
        node.innerHTML = "";
        api.renderButton(node, { type: "standard", theme: "outline", size: "large", text: "continue_with", shape: "rectangular", logo_alignment: "center", width });
        setReady(true);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!CLIENT_ID) {
    return (
      <PlainButton
        label={label}
        onClick={() => toast.show({ tone: "info", title: "Google sign-in is not switched on yet", message: "Please use your email and password for now." })}
      />
    );
  }
  if (failed) {
    return (
      <PlainButton
        label={label}
        onClick={() =>
          toast.show({
            tone: "warning",
            title: "Google could not load",
            message: "Your browser or network may be blocking it. Please try again, or use your email and password.",
          })
        }
      />
    );
  }

  return (
    <div className={disabled ? "pointer-events-none opacity-60" : undefined} aria-busy={!ready}>
      {/* Google draws its button here; the plain one shows for the instant before it is ready. */}
      <div ref={holder} className="flex min-h-[44px] w-full justify-center" />
      {!ready && <PlainButton label={label} busy />}
    </div>
  );
}
