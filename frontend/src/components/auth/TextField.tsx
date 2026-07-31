"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const inputBox =
  "flex h-11 w-full items-center gap-3 rounded-xl border-[1.5px] border-border bg-cream-light px-4 focus-within:border-primary";

export function TextField({
  id,
  icon: Icon,
  prefix,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  prefix?: string;
}) {
  return (
    <div className={cn(inputBox, className)}>
      <Icon className="h-[18px] w-[18px] shrink-0 text-primary" />
      {prefix && (
        <span className="text-sm font-semibold text-maroon">{prefix}</span>
      )}
      <input
        id={id}
        name={id}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        {...props}
      />
    </div>
  );
}

export function PasswordField({
  id,
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={inputBox}>
      <Icon className="h-[18px] w-[18px] shrink-0 text-primary" />
      <input
        id={id}
        name={id}
        type={visible ? "text" : "password"}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="shrink-0 text-muted-foreground transition-colors hover:text-maroon"
      >
        {visible ? (
          <EyeOff className="h-[18px] w-[18px]" />
        ) : (
          <Eye className="h-[18px] w-[18px]" />
        )}
      </button>
    </div>
  );
}

export function SubmitButton({
  children,
  pending,
}: {
  children: React.ReactNode;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-[14px] bg-gradient-to-r from-primary to-primary-dark py-3 text-base font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}
