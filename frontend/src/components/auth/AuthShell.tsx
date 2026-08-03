import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Two-panel auth layout from the Figma auth screens: an image panel with the
 * devotional quote on the left, and the form card on the right over a cream
 * background with decorative line art.
 */
export default function AuthShell({
  quote,
  quoteSub,
  children,
}: {
  quote: React.ReactNode;
  quoteSub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-stretch bg-cream">
      {/* Left image panel — hidden on small screens where the form takes over */}
      <div className="relative hidden w-1/2 shrink-0 lg:block">
        <Image
          src="/images/signup/left-panel.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(231deg, rgba(232,119,34,0) 50%, rgba(232,119,34,0.8) 75%)",
          }}
        />
        <Image
          src="/images/signup/pattern.png"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-[0.08]"
        />

        <div className="absolute bottom-[60px] left-[60px] flex w-[600px] max-w-[calc(100%-120px)] flex-col gap-6">
          <div className="flex w-fit items-center gap-2.5 rounded-full border border-white/30 bg-white/15 px-4 py-2.5 backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-primary">
              <BadgeCheck className="h-3.5 w-3.5 text-white" aria-hidden />
            </span>
            <span className="text-[13px] font-semibold text-white">
              Trusted by 5,000+ Devotees
            </span>
          </div>

          <h2 className="font-serif text-4xl font-bold leading-normal text-white">
            {quote}
          </h2>

          <p className="text-sm text-white/90">{quoteSub}</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-cream-light px-4 py-12 lg:w-1/2">
        {/* Decorative line art. These are SVGs, so they bypass the image
            optimizer — it cannot rasterise them and yields a broken image. */}
        <Image
          src="/images/signup/atom.svg"
          alt=""
          width={200}
          height={200}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -left-[60px] -top-[60px] select-none"
        />
        <Image
          src="/images/signup/flower.svg"
          alt=""
          width={240}
          height={240}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -right-10 top-10 select-none"
        />
        <Image
          src="/images/signup/lamp.svg"
          alt=""
          width={120}
          height={120}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-10 hidden select-none lg:block"
        />

        <div className="relative z-10 w-full max-w-[480px] rounded-[28px] bg-white/95 px-8 py-7 shadow-[0_20px_60px_0_rgba(107,31,31,0.12)] backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/images/brand/logo.png"
              alt=""
              width={30}
              height={30}
              aria-hidden
            />
            <span className="font-serif text-[22px] font-bold text-maroon">
              {SITE.name}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Cream-filled input row with a leading icon, shared by both auth forms. */
export function AuthField({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[13px] font-bold text-maroon">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="whitespace-nowrap text-[13px] text-muted-foreground">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border-[1.5px] border-border bg-white py-2.5 transition-colors hover:bg-cream"
    >
      <Image
        src="/images/brand/google.svg"
        alt=""
        width={20}
        height={20}
        unoptimized
        aria-hidden
      />
      <span className="text-[15px] font-semibold text-maroon">{label}</span>
    </button>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {["🔒 100% Secure", "✅ 80G Tax Benefits", "🙏 Free to Join"].map(
        (badge, i) => (
          <span key={badge} className="flex items-center gap-3">
            {i > 0 && <span className="text-xs text-border">•</span>}
            <span className="text-xs text-muted-foreground">{badge}</span>
          </span>
        ),
      )}
    </div>
  );
}

export function AuthSwitchLink({
  prompt,
  href,
  label,
}: {
  prompt: string;
  href: string;
  label: string;
}) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {prompt}{" "}
      <Link href={href} className="font-bold text-primary hover:underline">
        {label}
      </Link>
    </p>
  );
}
