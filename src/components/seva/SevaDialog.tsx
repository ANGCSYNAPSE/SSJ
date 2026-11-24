"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Building2, Check, CreditCard, Lock, Share2, Smartphone, Video, Wallet, X, Zap } from "lucide-react";
import PolicyLink from "@/components/legal/PolicyDialog";
import SevaArt from "@/components/seva/SevaArt";
import { API_URL } from "@/lib/api";
import { SITE } from "@/lib/constants";
import { CheckoutDismissed, openRazorpayCheckout } from "@/lib/razorpay";
import { ATTEND_OPTIONS, OCCASIONS, PAY_METHODS, UPDATE_OPTIONS, WITNESS_OPTIONS, WITNESS_TIMES, type PayMethodKey, type SevaType } from "@/lib/data/seva";

const MIN_AMOUNT = 11;
const MAX_AMOUNT = 1_000_000;

const PAY_ICONS: Record<PayMethodKey, typeof Zap> = { any: Zap, upi: Smartphone, card: CreditCard, netbanking: Building2, wallet: Wallet };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

interface Details {
  name: string;
  phone: string;
  email: string;
  city: string;
  occasion: string;
  message: string;
  dedicatedTo: string;
  gotra: string;
  instructions: string;
  date: string;
}
const EMPTY: Details = { name: "", phone: "", email: "", city: "", occasion: OCCASIONS[0], message: "", dedicatedTo: "", gotra: "", instructions: "", date: "" };

const inputClass =
  "h-12 w-full rounded-xl border border-[#e8ddd0] bg-white px-4 text-sm text-[#3e1815] placeholder-[#a39a92] shadow-sm transition focus:border-[#e87722] focus:outline-none focus:ring-4 focus:ring-[#e87722]/15";
const areaClass =
  "w-full resize-none rounded-xl border border-[#e8ddd0] bg-white p-4 text-sm leading-relaxed text-[#3e1815] placeholder-[#a39a92] shadow-sm transition focus:border-[#e87722] focus:outline-none focus:ring-4 focus:ring-[#e87722]/15";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-[#444]">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-[#8c8c8c]">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Chips<T extends string>({ options, value, onChange }: { options: readonly { key: T; label: string }[]; value: T | ""; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          aria-pressed={value === o.key}
          className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${value === o.key ? "border-[#e87722] bg-[#e87722] text-white shadow-md" : "border-[#eadfd2] bg-[#fffaf3] text-[#6b1f1f] hover:border-[#e87722]"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** The two steps: Sankalp (the intention) and Arpan (the offering). */
const STEPS = [
  { hindi: "संकल्प", name: "Sankalp", sub: "Your intention" },
  { hindi: "अर्पण", name: "Arpan", sub: "Your offering" },
] as const;

/**
 * The dialog a seva card opens. Nothing is asked for money first. The devotee begins with their Sankalp: who they are, why
 * they give, and how they would like the seva done. Only then comes the Arpan: the amount and how to offer it. It all happens
 * here, in one dialog, with no page of its own.
 */
export default function SevaDialog({ seva, onClose }: { seva: SevaType | null; onClose: () => void }) {
  if (!seva) return null;
  return createPortal(<DialogBody key={seva.slug} seva={seva} onClose={onClose} />, document.body);
}

function DialogBody({ seva, onClose }: { seva: SevaType; onClose: () => void }) {
  const isChoice = !!seva.special;
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<Details>(EMPTY);
  const [wish, setWish] = useState("");
  const [attend, setAttend] = useState<"yes" | "maybe" | "no" | "">("");
  const [updates, setUpdates] = useState<"whatsapp" | "call" | "email" | "none" | "">("");
  const [witness, setWitness] = useState<"none" | "photos" | "video" | "live" | "">("");
  const [witnessTime, setWitnessTime] = useState<"morning" | "afternoon" | "evening" | "">("");
  const [videoNumber, setVideoNumber] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState<PayMethodKey>("any");
  const [anonymous, setAnonymous] = useState(false);
  const [wantReceipt, setWantReceipt] = useState(true);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState<{ amount: number; email: string; receipt: boolean; witness: string } | null>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const payingRef = useRef(false);
  payingRef.current = paying;

  const close = () => !payingRef.current && onClose();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, done]);

  const set = (key: keyof Details) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails((d) => ({ ...d, [key]: e.target.value }));

  const finalAmount = useMemo(() => {
    if (custom.trim()) {
      const n = Math.round(Number(custom) * 100) / 100;
      return Number.isFinite(n) ? n : null;
    }
    return amount;
  }, [amount, custom]);

  function checkSankalp(): string {
    const digits = details.phone.replace(/\D/g, "");
    if (isChoice && wish.trim().length < 3) return "Please tell us what you would like your seva to go towards.";
    if (details.name.trim().length < 2) return "Please write your name.";
    if (digits.length < 10 || digits.length > 13) return "Please write a phone number we can reach you on (10 digits).";
    if (!/^\S+@\S+\.\S+$/.test(details.email.trim())) return "Please write a valid email address, so we can send your receipt.";
    if (details.date && details.date < todayISO()) return "The day you would like the seva done cannot be in the past.";
    if (witness === "live") {
      if (!details.date) return "For a live video call, please choose the day you would like the seva done.";
      if (!witnessTime) return "For a live video call, please choose a time of day that suits you.";
      if (videoNumber.trim() && !/^[+\d][\d\s-]{6,19}$/.test(videoNumber.trim())) return "Please write the WhatsApp number for the call, or leave it empty to use your phone number.";
    }
    return "";
  }
  function checkArpan(): string {
    if (finalAmount === null || finalAmount < MIN_AMOUNT) return `Please choose an amount, or write your own (at least ${inr(MIN_AMOUNT)}).`;
    if (finalAmount > MAX_AMOUNT) return `For an offering above ${inr(MAX_AMOUNT)}, please call us and we will arrange it with you.`;
    return "";
  }

  const toArpan = () => {
    const problem = checkSankalp();
    setError(problem);
    if (!problem) setStep(1);
  };

  async function offer() {
    const problem = checkSankalp() || checkArpan();
    if (problem || finalAmount === null) {
      setError(problem);
      if (checkSankalp()) setStep(0);
      return;
    }
    setError("");
    setPaying(true);
    try {
      const reason = isChoice ? `Seva wish: ${wish.trim()}${details.message.trim() ? `\n${details.message.trim()}` : ""}` : details.message.trim();
      const orderRes = await fetch(`${API_URL}/api/v1/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          cause: seva.title,
          sevaType: seva.slug,
          donorName: details.name.trim(),
          email: details.email.trim(),
          phone: details.phone.trim(),
          anonymous,
          wantReceipt,
          occasion: details.occasion === OCCASIONS[0] ? undefined : details.occasion,
          dedicatedTo: details.dedicatedTo.trim() || undefined,
          gotra: details.gotra.trim() || undefined,
          message: reason.slice(0, 500) || undefined,
          instructions: details.instructions.trim() || undefined,
          attend: attend || undefined,
          witness: witness || undefined,
          witnessTime: witness === "live" ? witnessTime || undefined : undefined,
          videoNumber: witness === "live" && videoNumber.trim() ? videoNumber.trim() : undefined,
          updates: updates || undefined,
          preferredDate: details.date || undefined,
          city: details.city.trim() || undefined,
          payMethod: method,
        }),
      });
      const orderPayload = await orderRes.json().catch(() => null);
      if (!orderRes.ok) throw new Error(orderPayload?.message ?? "We could not start the offering. Please try again.");
      const order = orderPayload.data as { orderId: string; amount: number; currency: string; keyId: string };

      const response = await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        label: `Arpan: ${seva.title}`,
        prefill: { name: details.name.trim(), email: details.email.trim(), contact: details.phone.trim() },
        method: method === "any" ? undefined : method,
      });

      const verifyRes = await fetch(`${API_URL}/api/v1/donations/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
      const verified = await verifyRes.json().catch(() => null);
      if (!verifyRes.ok || !verified?.data?.verified) {
        throw new Error("We could not confirm the offering just now. If money was taken from your account, please call us with your payment reference and we will trace it.");
      }
      setDone({ amount: finalAmount, email: details.email.trim(), receipt: wantReceipt, witness: witness || "none" });
    } catch (err) {
      if (err instanceof CheckoutDismissed) setError("The payment window was closed. Nothing was charged. Press the button when you are ready.");
      else setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  const ink = isChoice ? "text-[#4a2a05]" : "text-white";
  const inkSoft = isChoice ? "text-[#6b4a14]" : "text-white/85";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div role="dialog" aria-modal="true" aria-label={seva.title} className="gs-rise relative flex h-[94vh] w-full max-w-[1020px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-[min(780px,92vh)] sm:rounded-3xl md:flex-row">
        <button type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#3e1815] shadow transition-colors hover:bg-white">
          <X className="h-5 w-5" />
        </button>

        {/* The seva: its art, its name, what the offering goes towards, and the offering so far */}
        <aside className="relative h-[150px] shrink-0 overflow-hidden md:h-auto md:w-[330px]">
          <SevaArt seva={seva} className="absolute inset-0" />
          <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-6 ${ink}`} style={{ background: isChoice ? "linear-gradient(to top, #f1d58c 55%, transparent)" : `linear-gradient(to top, ${seva.tone[1]} 55%, transparent)` }}>
            <p className="font-serif text-[26px] font-bold leading-tight">{seva.title}</p>
            <p className={`notranslate hindi-sub text-sm font-medium ${inkSoft}`} translate="no">{seva.hindi}</p>
            <p className={`hidden text-[13px] leading-relaxed md:block ${inkSoft}`}>{seva.about}</p>
            {!done && finalAmount !== null && finalAmount > 0 && step === 1 && (
              <p className={`mt-1 hidden items-baseline justify-between rounded-xl px-4 py-3 md:flex ${isChoice ? "bg-white/70" : "bg-white/15"}`}>
                <span className={`text-xs ${inkSoft}`}>{"Your arpan"}</span>
                <span className="font-serif text-2xl font-bold">{inr(finalAmount)}</span>
              </p>
            )}
          </div>
        </aside>

        <div className="flex min-h-0 flex-1 flex-col">
          {done ? (
            <Thanks seva={seva} done={done} onClose={onClose} />
          ) : (
            <>
              {/* Sankalp, then Arpan */}
              <ol className="flex shrink-0 items-center gap-3 border-b border-[#f0e6d9] py-4 pl-6 pr-16 sm:pl-8" aria-label="Steps">
                {STEPS.map((s, i) => {
                  const state = i < step ? "done" : i === step ? "now" : "next";
                  return (
                    <li key={s.name} className="flex flex-1 items-center gap-3 last:flex-none">
                      <button type="button" disabled={i > step || paying} onClick={() => i < step && setStep(i)} aria-current={state === "now" ? "step" : undefined} className="flex items-center gap-2.5 text-left disabled:cursor-default">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${state === "done" ? "border-[#e87722] bg-[#e87722] text-white" : state === "now" ? "gs-glow border-[#e87722] bg-white text-[#e87722]" : "border-[#e8ddd0] bg-white text-[#b3a89d]"}`}>
                          {state === "done" ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                        </span>
                        <span className="leading-tight">
                          <span className={`block text-sm font-bold ${state === "next" ? "text-[#b3a89d]" : "text-[#6b1f1f]"}`}>
                            <span className="notranslate hindi-sub" translate="no">{s.hindi} · </span>{s.name}
                          </span>
                          <span className="hidden text-xs text-[#8c8c8c] sm:block">{s.sub}</span>
                        </span>
                      </button>
                      {i < STEPS.length - 1 && <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#eadfd2]"><span className="absolute inset-y-0 left-0 rounded-full bg-[#e87722] transition-all duration-500" style={{ width: step > i ? "100%" : "0%" }} /></span>}
                    </li>
                  );
                })}
              </ol>

              <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                {step === 0 && (
                  <div key="sankalp" className="gs-slide flex flex-col gap-6">
                    <header className="flex flex-col gap-1.5">
                      <h2 className="font-serif text-[28px] font-bold leading-tight text-[#6b1f1f]">{"Make your Sankalp"}</h2>
                      <p className="text-sm leading-relaxed text-[#6b6b6b]">{"Tell us a little about yourself and how you would like this seva to be done. Nothing is charged until the next step."}</p>
                    </header>

                    {isChoice && (
                      <Field label="What would you like your seva to go towards?">
                        <textarea value={wish} onChange={(e) => setWish(e.target.value.slice(0, 300))} rows={3} placeholder="For example: blankets for people on the roadside this winter" className={areaClass} />
                      </Field>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your full name">
                        <input ref={firstField} value={details.name} onChange={set("name")} placeholder="e.g. Rahul Sharma" autoComplete="name" className={inputClass} />
                      </Field>
                      <Field label="Phone number">
                        <input value={details.phone} onChange={set("phone")} placeholder="+91 00000 00000" inputMode="tel" autoComplete="tel" className={inputClass} />
                      </Field>
                      <Field label="Email address" hint="(your receipt comes here)">
                        <input value={details.email} onChange={set("email")} type="email" placeholder="rahul@example.com" autoComplete="email" className={inputClass} />
                      </Field>
                      <Field label="City" hint="(optional)">
                        <input value={details.city} onChange={set("city")} placeholder="e.g. Jaipur" autoComplete="address-level2" className={inputClass} />
                      </Field>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl bg-[#fffaf3] p-4 sm:p-5">
                      <p className="text-[13px] font-semibold text-[#6b1f1f]">{"Why are you giving this seva? (optional)"}</p>
                      <div className="flex flex-wrap gap-2">
                        {OCCASIONS.map((o) => (
                          <button key={o} type="button" onClick={() => setDetails((d) => ({ ...d, occasion: o }))} aria-pressed={details.occasion === o} className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${details.occasion === o ? "border-[#e87722] bg-[#e87722] text-white shadow-md" : "border-[#eadfd2] bg-white text-[#6b1f1f] hover:border-[#e87722]"}`}>
                            {o}
                          </button>
                        ))}
                      </div>
                      <textarea value={details.message} onChange={set("message")} maxLength={400} rows={2} placeholder="Your prayer, or the reason in your own words (optional)" className={areaClass} />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="In the name of" hint="(optional)">
                          <input value={details.dedicatedTo} onChange={set("dedicatedTo")} maxLength={120} placeholder="e.g. my mother, Kamla Devi" className={inputClass} />
                        </Field>
                        <Field label="Gotra" hint="(optional, for the sankalp)">
                          <input value={details.gotra} onChange={set("gotra")} maxLength={60} placeholder="e.g. Kashyap" className={inputClass} />
                        </Field>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <Field label="How would you like this seva to be done?" hint="(optional)">
                        <textarea value={details.instructions} onChange={set("instructions")} maxLength={800} rows={3} placeholder="Any instructions for us: for example, serve the meal on Ekadashi, give it to the elders, use it at the temple near me." className={areaClass} />
                      </Field>
                      <Field label="A day you would like it done" hint="(optional)">
                        <input value={details.date} onChange={set("date")} type="date" min={todayISO()} className={`${inputClass} sm:max-w-[260px]`} />
                      </Field>
                      <div className="flex flex-col gap-2">
                        <p className="text-[13px] font-semibold text-[#444]">{"Would you like to be present, or take part?"}</p>
                        <Chips options={ATTEND_OPTIONS} value={attend} onChange={setAttend} />
                      </div>
                      <div className="flex flex-col gap-3 rounded-2xl border border-[#e0b94f]/60 bg-gradient-to-br from-[#fffdf8] to-[#fdf3dc] p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e87722] text-white"><Video className="h-5 w-5" aria-hidden /></span>
                          <div>
                            <p className="text-[14px] font-bold text-[#6b1f1f]">{"Cannot be there? See your seva"}</p>
                            <p className="text-[12.5px] leading-relaxed text-[#7a5a3a]">{"Watch it from where you are. Choose how you would like to see it."}</p>
                          </div>
                        </div>
                        <Chips options={WITNESS_OPTIONS} value={witness} onChange={setWitness} />
                        {witness === "live" && (
                          <div className="gs-rise flex flex-col gap-3 rounded-xl bg-white/80 p-3.5">
                            <p className="text-[13px] font-semibold text-[#444]">{"What time of day suits you?"}</p>
                            <Chips options={WITNESS_TIMES} value={witnessTime} onChange={setWitnessTime} />
                            <Field label="WhatsApp number for the call" hint="(leave empty to use your phone number)">
                              <input value={videoNumber} onChange={(e) => setVideoNumber(e.target.value)} inputMode="tel" placeholder="+91 00000 00000" className={inputClass} />
                            </Field>
                            <p className="text-[12px] leading-relaxed text-[#7a5a3a]">{"Please also choose the day you would like it done, above. A live call depends on our volunteers at the place and on the network, so our team will call you to confirm the time. If it cannot be done on the day, we will send you a short video of your seva instead."}</p>
                          </div>
                        )}
                        {witness === "video" && <p className="gs-rise text-[12px] leading-relaxed text-[#7a5a3a]">{"A volunteer will record a short video of your seva being done, and we will send it to you the way you choose below."}</p>}
                        {witness === "photos" && <p className="gs-rise text-[12px] leading-relaxed text-[#7a5a3a]">{"We will send you a few photographs of your seva being done, the way you choose below."}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-[13px] font-semibold text-[#444]">{"How should we tell you when it is done?"}</p>
                        <Chips options={UPDATE_OPTIONS} value={updates} onChange={setUpdates} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2.5 text-sm text-[#444]">
                        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-[18px] w-[18px] rounded accent-[#e87722]" />
                        {"Keep my name private (do not show it on the website)"}
                      </label>
                      <label className="flex items-center gap-2.5 text-sm text-[#444]">
                        <input type="checkbox" checked={wantReceipt} onChange={(e) => setWantReceipt(e.target.checked)} className="h-[18px] w-[18px] rounded accent-[#e87722]" />
                        {"Email me a receipt"}
                      </label>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div key="arpan" className="gs-slide flex flex-col gap-6">
                    <header className="flex flex-col gap-1.5">
                      <h2 className="font-serif text-[28px] font-bold leading-tight text-[#6b1f1f]">{"Make your Arpan"}</h2>
                      <p className="text-sm leading-relaxed text-[#6b6b6b]">{"Arpan means an offering made with devotion. Give what your heart says: the amounts below are only a guide."}</p>
                    </header>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {seva.offerings.map((o) => {
                        const selected = !custom.trim() && amount === o.amount;
                        return (
                          <button key={o.amount} type="button" onClick={() => { setAmount(o.amount); setCustom(""); setError(""); }} aria-pressed={selected} className={`relative flex flex-col gap-1.5 overflow-hidden rounded-2xl border-2 px-5 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e87722]/30 ${selected ? "gs-pop border-transparent text-white shadow-xl" : "border-[#eadfd2] bg-[#fffaf3] text-[#3e1815]"}`} style={selected ? { background: `linear-gradient(150deg, ${seva.tone[0]}, ${seva.tone[1]})` } : undefined}>
                            <span className="font-serif text-[40px] font-bold leading-none tracking-tight">{inr(o.amount)}</span>
                            <span className={`text-[14px] font-medium leading-snug ${selected ? "text-white/90" : "text-[#6b6b6b]"}`}>{o.label}</span>
                            {selected && <Check className="absolute right-4 top-4 h-5 w-5" aria-hidden />}
                          </button>
                        );
                      })}
                    </div>
                    <Field label="Or offer as you wish" hint={`(from ${inr(MIN_AMOUNT)})`}>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl font-bold text-[#6b1f1f]">₹</span>
                        <input inputMode="decimal" value={custom} onChange={(e) => { const v = e.target.value.replace(/[^\d.]/g, "").slice(0, 9); setCustom(v); if (v) setAmount(null); setError(""); }} placeholder="Your own amount" className={`${inputClass} pl-9 font-semibold`} />
                      </div>
                    </Field>
                    <p className="rounded-xl bg-[#fff3e0] px-4 py-3 text-[13px] leading-relaxed text-[#7a4a12]">{"The lines under each amount say what it goes towards. Real costs change with the place and the season, so they are a guide, not a promise of an exact result."}</p>

                    <div className="flex flex-col gap-3">
                      <p className="text-[13px] font-semibold text-[#444]">{"How would you like to make your Arpan?"}</p>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                        {PAY_METHODS.map((m) => {
                          const Icon = PAY_ICONS[m.key];
                          const selected = method === m.key;
                          return (
                            <button key={m.key} type="button" onClick={() => setMethod(m.key)} aria-pressed={selected} className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3.5 text-center transition-all ${selected ? "border-[#e87722] bg-[#fff3e0] shadow-md" : "border-[#eadfd2] bg-[#fffaf3] hover:border-[#e87722]"}`}>
                              <Icon className={`h-5 w-5 ${selected ? "text-[#e87722]" : "text-[#9b5a12]"}`} aria-hidden />
                              <span className="text-[13px] font-bold text-[#3e1815]">{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <dl className="flex flex-col gap-2 rounded-2xl border border-[#f0e6d9] bg-[#fffaf3] p-4 text-sm">
                      <div className="flex justify-between gap-3"><dt className="text-[#8c8c8c]">{"Seva"}</dt><dd className="text-right font-medium text-[#3e1815]">{seva.title}</dd></div>
                      <div className="flex justify-between gap-3"><dt className="text-[#8c8c8c]">{"From"}</dt><dd className="text-right font-medium text-[#3e1815]">{anonymous ? `${details.name.trim()} (private)` : details.name.trim()}</dd></div>
                      {witness && witness !== "none" && (
                        <div className="flex justify-between gap-3"><dt className="text-[#8c8c8c]">{"See your seva"}</dt><dd className="text-right font-medium text-[#3e1815]">{witness === "live" ? `Live video call (${witnessTime || "time to be confirmed"})` : witness === "video" ? "A short video afterwards" : "Photos"}</dd></div>
                      )}
                      {(details.dedicatedTo.trim() || details.occasion !== OCCASIONS[0]) && (
                        <div className="flex justify-between gap-3"><dt className="text-[#8c8c8c]">{"For"}</dt><dd className="text-right font-medium text-[#3e1815]">{[details.occasion !== OCCASIONS[0] ? details.occasion : "", details.dedicatedTo.trim() ? `in the name of ${details.dedicatedTo.trim()}` : ""].filter(Boolean).join(" · ")}</dd></div>
                      )}
                    </dl>
                  </div>
                )}

                {error && <p role="alert" className="gs-rise mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
              </div>

              <div className="shrink-0 border-t border-[#f0e6d9] bg-white px-6 py-4 sm:px-8">
                {step === 0 ? (
                  <div className="flex items-center justify-end">
                    <button type="button" onClick={toArpan} className="inline-flex items-center gap-2 rounded-full bg-[#e87722] px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(232,119,34,0.35)] transition-transform hover:scale-[1.03]">
                      {"Continue to Arpan"}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => { setError(""); setStep(0); }} disabled={paying} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-[#6b1f1f] transition-colors hover:bg-[#fdf6ec] disabled:opacity-50">
                        <ArrowLeft className="h-4 w-4" aria-hidden />
                        {"Back"}
                      </button>
                      <button type="button" onClick={offer} disabled={paying} className="gs-shimmer flex h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl text-base font-bold text-white shadow-[0_12px_26px_rgba(232,119,34,0.35)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                        {paying ? (
                          "Opening the offering window…"
                        ) : (
                          <>
                            <Lock className="h-4 w-4" aria-hidden />
                            {finalAmount !== null && finalAmount > 0 ? `Arpan Karein · ${inr(finalAmount)}` : "Arpan Karein"}
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-center text-[11.5px] leading-relaxed text-[#8c8c8c]">
                      {"Your card or bank details never reach us. By offering you agree to our "}
                      <PolicyLink doc="terms" with={["privacy", "refund"]}>{"Terms of Service"}</PolicyLink>
                      {", "}
                      <PolicyLink doc="privacy" with={["terms", "refund"]}>{"Privacy Policy"}</PolicyLink>
                      {" and "}
                      <PolicyLink doc="refund" with={["terms", "privacy"]}>{"Refund Policy"}</PolicyLink>
                      {"."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** After a successful Arpan: a quiet thank-you, with a way to share it. */
function Thanks({ seva, done, onClose }: { seva: SevaType; done: { amount: number; email: string; receipt: boolean; witness: string }; onClose: () => void }) {
  const text = `I made an arpan for ${seva.title} through Shyam Jagat. Jai Shree Shyam! ${SITE.url}`;
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-y-auto px-8 py-10 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 28 }, (_, i) => {
          const angle = (i / 28) * Math.PI * 2;
          const reach = 120 + ((i * 53) % 150);
          return (
            <span key={i} className="absolute rounded-[3px]" style={{ width: 8 + (i % 3) * 4, height: 14 + (i % 4) * 3, background: ["#e87722", "#e0b94f", "#9b2335", "#f6dc8c", "#c2570c"][i % 5], animation: "gs-burst 1.6s cubic-bezier(0.2, 0.8, 0.3, 1) both", animationDelay: `${(i % 6) * 0.04}s`, ["--dx" as string]: `${Math.cos(angle) * reach}px`, ["--dy" as string]: `${Math.sin(angle) * reach * 0.8}px`, ["--rot" as string]: `${(i * 47) % 360}deg` }} />
          );
        })}
      </div>
      <span className="gs-pop gs-glow relative flex h-24 w-24 items-center justify-center rounded-full bg-[#e87722] shadow-xl">
        <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
          <path d="M12 25l9 9 16-19" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="gs-draw" />
        </svg>
      </span>
      <h2 className="gs-rise relative font-serif text-4xl font-bold text-[#6b1f1f]">{"Jai Shree Shyam"}</h2>
      <p className="gs-rise relative max-w-[460px] text-base leading-relaxed text-[#444]" style={{ animationDelay: "0.1s" }}>
        {"Thank you. Your arpan of "}<strong>{inr(done.amount)}</strong>{" for "}<strong>{seva.title}</strong>{" has been received with gratitude."}
      </p>
      <p className="gs-rise relative max-w-[460px] text-sm leading-relaxed text-[#6b6b6b]" style={{ animationDelay: "0.2s" }}>
        {done.receipt && done.email ? `Your receipt is on its way to ${done.email}. ` : ""}
        {done.witness === "live" ? "Our team will call you to fix the time of your live video call. " : done.witness === "video" ? "We will send you a short video of your seva. " : done.witness === "photos" ? "We will send you photographs of your seva. " : ""}
        {"Our team aims to put your seva to the purpose you chose, and will reach out in the way you told us. If you have any question, you can write or call us any time."}
      </p>
      <div className="gs-rise relative mt-2 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.3s" }}>
        <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#e87722] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]">
          <Share2 className="h-4 w-4" aria-hidden />
          {"Share on WhatsApp"}
        </a>
        <button type="button" onClick={onClose} className="rounded-full border-2 border-[#e8ddd0] px-6 py-3 text-sm font-bold text-[#6b1f1f] transition-colors hover:bg-[#fdf6ec]">
          {"Close"}
        </button>
      </div>
    </div>
  );
}
