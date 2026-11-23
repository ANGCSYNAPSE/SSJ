"use client";

import { useState } from "react";
import { HandHeart, Loader2, Pencil } from "lucide-react";
import { ApiError, meApi, type VolunteerRecord } from "@/lib/api";
import { VOLUNTEER_AVAILABILITY, VOLUNTEER_INTERESTS, VOLUNTEER_SKILLS } from "@/components/auth/signup/categories";
import { cn } from "@/lib/utils";

const STATUS: Record<VolunteerRecord["status"], { label: string; style: string }> = {
  pending: { label: "With our team", style: "bg-amber-100 text-amber-800" },
  approved: { label: "Approved", style: "bg-green-100 text-green-800" },
  rejected: { label: "Not approved yet", style: "bg-red-100 text-red-700" },
  blocked: { label: "Paused", style: "bg-gray-200 text-gray-700" },
};

/** One tick box in a list of choices. */
function Choice({ label, checked, onChange }: { label: string; checked: boolean; onChange: (on: boolean) => void }) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors", checked ? "border-primary bg-[#fff1d8] text-maroon" : "border-[#d4af37]/40 text-[#595656] hover:bg-[#fff8ec]")}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#e47105]" />
      {label}
    </label>
  );
}

const toggle = (list: string[], item: string, on: boolean) => (on ? [...list, item] : list.filter((x) => x !== item));

/**
 * What a volunteer sees of their own volunteer record on their profile: the seva they chose, their skills and
 * availability, and where the team's review stands. They can change any of it.
 */
export default function VolunteerCard({ volunteer }: { volunteer: VolunteerRecord }) {
  const [saved, setSaved] = useState(volunteer);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(volunteer);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  async function save() {
    if (draft.interests.length === 0) return setMessage({ kind: "error", text: "Choose at least one seva you would like to help with." });
    setBusy(true);
    setMessage(null);
    try {
      const next = await meApi.updateVolunteer({
        interests: draft.interests,
        skills: draft.skills,
        availability: draft.availability ?? undefined,
        about: draft.about ?? "",
      });
      setSaved(next);
      setDraft(next);
      setEditing(false);
      setMessage({ kind: "info", text: "Saved. Thank you!" });
    } catch (err) {
      setMessage({ kind: "error", text: err instanceof ApiError ? err.message : "Could not save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const status = STATUS[saved.status];

  return (
    <section className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e47105] text-white">
          <HandHeart className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-lg font-bold text-maroon">{"You are a Volunteer"}</h2>
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", status.style)}>{status.label}</span>
          </div>
          <p className="text-sm text-[#595656]">
            {"Your volunteer account is free. We will be in touch when seva begins in your area ("}
            {saved.city}
            {", "}
            {saved.state}
            {")."}
          </p>
        </div>
        {!editing && (
          <button type="button" onClick={() => { setDraft(saved); setEditing(true); setMessage(null); }} className="flex items-center gap-1.5 rounded-lg border border-[#d4af37]/50 px-3 py-1.5 text-sm font-semibold text-maroon hover:bg-[#fff8ec]">
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            {"Edit"}
          </button>
        )}
      </div>

      {!editing ? (
        <div className="mt-4 flex flex-col gap-3 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8580]">{"Seva I would like to help with"}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {saved.interests.map((item) => (
                <span key={item} className="rounded-full bg-[#fff1d8] px-3 py-1 text-xs font-semibold text-maroon">{item}</span>
              ))}
            </div>
          </div>
          {saved.skills.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8580]">{"My skills"}</p>
              <p className="mt-1 text-[#3e1815]">{saved.skills.join(", ")}</p>
            </div>
          )}
          {saved.availability && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a8580]">{"I can help"}</p>
              <p className="mt-1 text-[#3e1815]">{saved.availability}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          <fieldset>
            <legend className="text-sm font-semibold text-[#3e1815]">{"Seva I would like to help with"}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {VOLUNTEER_INTERESTS.map((item) => (
                <Choice key={item} label={item} checked={draft.interests.includes(item)} onChange={(on) => setDraft({ ...draft, interests: toggle(draft.interests, item, on) })} />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold text-[#3e1815]">{"My skills"}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {VOLUNTEER_SKILLS.map((item) => (
                <Choice key={item} label={item} checked={draft.skills.includes(item)} onChange={(on) => setDraft({ ...draft, skills: toggle(draft.skills, item, on) })} />
              ))}
            </div>
          </fieldset>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#3e1815]">
            {"When can you help?"}
            <select value={draft.availability ?? ""} onChange={(e) => setDraft({ ...draft, availability: e.target.value })} className="h-10 rounded-lg border border-[#d4af37]/50 bg-white px-3 text-sm font-normal">
              {VOLUNTEER_AVAILABILITY.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#3e1815]">
            {"Anything you would like us to know"}
            <textarea value={draft.about ?? ""} maxLength={500} onChange={(e) => setDraft({ ...draft, about: e.target.value })} className="min-h-[80px] rounded-lg border border-[#d4af37]/50 bg-white px-3 py-2 text-sm font-normal" />
          </label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={save} disabled={busy} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-5 py-2 text-sm font-bold text-white shadow disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {"Save"}
            </button>
            <button type="button" onClick={() => { setEditing(false); setMessage(null); }} className="text-sm font-semibold text-maroon hover:underline">
              {"Cancel"}
            </button>
          </div>
        </div>
      )}

      {message && <p className={cn("mt-3 text-sm", message.kind === "error" ? "text-red-600" : "text-green-700")}>{message.text}</p>}
    </section>
  );
}
