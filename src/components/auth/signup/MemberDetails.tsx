"use client";

import { useState } from "react";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { AuthField } from "@/components/auth/AuthShell";
import { SubmitButton } from "@/components/auth/TextField";
import { STATES } from "./categories";
import CityField, { selectClass } from "./CityField";

export interface MemberDetailsValue {
  city: string;
  state: string;
  photo: File | null;
}

/**
 * Step 2 of a plain member's sign-up, after the email is verified: where they live, and an optional
 * photo. Submitting leads to the payment; the account is created when the payment succeeds.
 */
export default function MemberDetails({
  pending,
  error,
  onSubmit,
  onBack,
}: {
  pending: boolean;
  error: string | null;
  onSubmit: (value: MemberDetailsValue) => void;
  onBack: () => void;
}) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ city?: string; state?: string; photo?: string }>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found: typeof errors = {};
    if (!state) found.state = "Please choose your state.";
    if (state && !city.trim()) found.city = "Please choose your city.";
    if (photo && !["image/jpeg", "image/png", "image/webp"].includes(photo.type)) found.photo = "Please choose a JPG, PNG or WebP image.";
    if (photo && photo.size > 4 * 1024 * 1024) found.photo = "The photo must be under 4 MB.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({ city: city.trim(), state, photo });
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <button type="button" onClick={onBack} className="flex w-fit items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-maroon">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back
      </button>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Step 2 of 2 · Email verified</p>
        <h1 className="font-serif text-2xl font-bold leading-tight text-maroon">Tell us about yourself</h1>
        <p className="max-w-[320px] text-sm text-muted-foreground">One more step, then the registration fee, and your account is ready.</p>
      </div>

      <AuthField label="State *" htmlFor="state" error={errors.state}>
        <select
          id="state"
          value={state}
          onChange={(e) => {
            // A different state has different cities, so the city is chosen again.
            setState(e.target.value);
            setCity("");
          }}
          className={selectClass}
        >
          <option value="">Select your state</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </AuthField>

      <AuthField label="City *" htmlFor="city" error={errors.city}>
        <CityField id="city" state={state} value={city} onChange={setCity} />
      </AuthField>

      <AuthField label="Profile photo (optional)" htmlFor="photo" error={errors.photo}>
        <label className="flex h-9 w-full cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-dashed border-border bg-cream-light px-4 text-sm text-muted-foreground hover:border-primary">
          <Camera className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden />
          <span className="truncate">{photo ? photo.name : "Choose a photo"}</span>
          <input id="photo" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
        </label>
      </AuthField>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <SubmitButton pending={pending}>{"Continue to payment →"}</SubmitButton>
    </form>
  );
}
