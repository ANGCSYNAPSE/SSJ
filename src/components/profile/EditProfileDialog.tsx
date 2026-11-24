"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, X } from "lucide-react";
import { PLATFORMS } from "@/components/profile/socialLinks";
import { ApiError, meApi, type Dashboard, type LinkKey } from "@/lib/api";

const inputClass =
  "h-12 w-full rounded-xl border border-[#e8ddd0] bg-white px-4 text-sm text-[#3e1815] placeholder-[#a39a92] shadow-sm transition focus:border-[#e87722] focus:outline-none focus:ring-4 focus:ring-[#e87722]/15";

/**
 * Edit the things that show on a profile and card: name, city, a line about yourself, and your links. Each link must be a link
 * on its own platform; the server checks it, and its message is shown beside the field.
 */
export default function EditProfileDialog({ account, onClose, onSaved }: { account: Dashboard["account"]; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(account.fullName);
  const [location, setLocation] = useState(account.location ?? "");
  const [bio, setBio] = useState(account.bio ?? "");
  const [links, setLinks] = useState<Record<LinkKey, string>>(() => Object.fromEntries(PLATFORMS.map((p) => [p.key, account.socialLinks?.[p.key] ?? ""])) as Record<LinkKey, string>);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !saving && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    setError(null);
    setFieldErrors({});
    if (name.trim().length < 2) {
      setError("Please write your name.");
      return;
    }
    setSaving(true);
    try {
      await meApi.update({
        fullName: name.trim(),
        location: location.trim() || null,
        bio: bio.trim() || null,
        socialLinks: Object.fromEntries(PLATFORMS.map((p) => [p.key, links[p.key].trim() || null])),
      });
      onSaved();
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        const map: Record<string, string> = {};
        for (const e of err.errors) map[e.field.replace(/^socialLinks\./, "")] = e.message;
        setFieldErrors(map);
        setError("Please check the highlighted fields.");
      } else {
        setError(err instanceof ApiError ? err.message : "Could not save. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 backdrop-blur-[2px] sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && !saving && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Edit profile" className="gs-rise relative flex max-h-[94vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#f0e6d9] px-6 py-5 sm:px-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#6b1f1f]">{"Edit your profile"}</h2>
            <p className="mt-1 text-sm text-[#6b6b6b]">{"This is what appears on your profile and, if you share it, on your digital card."}</p>
          </div>
          <button type="button" onClick={onClose} disabled={saving} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fdf6ec] text-[#3e1815] transition-colors hover:bg-[#f3e3c3]">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-[#444]">{"Full name"}</span>
              <input ref={first} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} autoComplete="name" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-[#444]">
                {"City / location"}
                <span className="ml-1.5 text-xs font-normal text-[#8c8c8c]">{"(optional)"}</span>
              </span>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Jaipur, Rajasthan" className={inputClass} autoComplete="address-level2" />
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-1.5">
            <span className="flex items-baseline justify-between text-[13px] font-semibold text-[#444]">
              <span>
                {"A line about yourself"}
                <span className="ml-1.5 text-xs font-normal text-[#8c8c8c]">{"(optional)"}</span>
              </span>
              <span className="text-xs font-normal text-[#8c8c8c]">{bio.length}/300</span>
            </span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 300))} rows={3} placeholder="For example: Bhajan singer from Jaipur. Seva is my prayer." className="w-full resize-none rounded-xl border border-[#e8ddd0] bg-white p-4 text-sm leading-relaxed text-[#3e1815] placeholder-[#a39a92] shadow-sm transition focus:border-[#e87722] focus:outline-none focus:ring-4 focus:ring-[#e87722]/15" />
          </label>

          <div className="mt-6">
            <h3 className="font-serif text-lg font-bold text-[#6b1f1f]">{"Your links"}</h3>
            <p className="mb-3 text-sm text-[#6b6b6b]">{"Add the places people can find you. Leave a box empty to skip it."}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLATFORMS.map((p) => (
                <label key={p.key} className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-[#444]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: p.colour }}>
                      <p.icon size={13} />
                    </span>
                    {p.label}
                  </span>
                  <input value={links[p.key]} onChange={(e) => setLinks((l) => ({ ...l, [p.key]: e.target.value }))} placeholder={p.placeholder} inputMode="url" autoCapitalize="none" className={`${inputClass} ${fieldErrors[p.key] ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`} />
                  {fieldErrors[p.key] && <span className="text-xs text-red-600">{fieldErrors[p.key]}</span>}
                </label>
              ))}
            </div>
          </div>

          {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
        </div>

        <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-[#f0e6d9] px-6 py-4 sm:px-8">
          <button type="button" onClick={onClose} disabled={saving} className="rounded-full px-5 py-3 text-sm font-semibold text-[#6b1f1f] transition-colors hover:bg-[#fdf6ec]">
            {"Cancel"}
          </button>
          <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#e87722] px-8 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(232,119,34,0.35)] transition-transform hover:scale-[1.03] disabled:opacity-60">
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {saving ? "Saving…" : "Save changes"}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
