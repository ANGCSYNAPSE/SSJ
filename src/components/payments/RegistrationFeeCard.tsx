"use client";

import { useEffect, useState } from "react";
import PolicyLink from "@/components/legal/PolicyDialog";
import { ACCOUNT_CHANGED } from "@/components/notifications/NotificationBell";
import { BadgeCheck, CircleAlert, Loader2, ShieldCheck } from "lucide-react";
import { ApiError, paymentsApi, type FeeStatus } from "@/lib/api";
import { CheckoutDismissed, openRazorpayCheckout } from "@/lib/razorpay";
import { cn } from "@/lib/utils";

const rupees = (n: number | null | undefined) => `₹${(n ?? 0).toLocaleString("en-IN")}`;
const day = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/**
 * The registration fee on the dashboard. It is one fee (₹1100) that can be paid in parts: at
 * least ₹501 first and the balance whenever the member likes. The card shows what is paid and
 * what is pending, and lets them pay the minimum, the whole amount, or their own amount in
 * between. Checkout is Razorpay's own window; the server checks the signature.
 */
export default function RegistrationFeeCard({ onPaid }: { onPaid?: () => void }) {
  const [fee, setFee] = useState<FeeStatus | null>(null);
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  const apply = (next: FeeStatus) => {
    setFee(next);
    // Suggest paying everything that is due; the member can lower it to the minimum.
    setAmount(String(next.nextMax));
  };

  useEffect(() => {
    const load = () =>
      paymentsApi
        .me()
        .then((d) => {
          // An older backend answers with a different shape; show nothing rather than break the page.
          if (typeof d.fee?.total !== "number" || typeof d.fee?.paid !== "number") return;
          apply(d.fee);
        })
        .catch(() => setMessage({ kind: "error", text: "Could not load your payment status." }));
    void load();
    // A payment or refund message arrived: the amounts change on screen without a reload.
    window.addEventListener(ACCOUNT_CHANGED, load);
    return () => window.removeEventListener(ACCOUNT_CHANGED, load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fee) return null;

  const value = Number(amount);
  const valid = Number.isInteger(value) && value >= fee.nextMin && value <= fee.nextMax;
  const mustPayAll = fee.nextMin === fee.nextMax;

  async function pay() {
    setMessage(null);
    setBusy(true);
    try {
      const order = await paymentsApi.createOrder(value);
      const response = await openRazorpayCheckout(order);
      const result = await paymentsApi.verify(response);
      apply(result.fee);
      if (result.confirming) {
        // Razorpay has not confirmed the money yet: it is not counted until it does, and nothing is charged twice.
        setMessage({ kind: "info", text: "Your payment is being confirmed. It will appear here shortly. Please do not pay again." });
        return;
      }
      setMessage({ kind: "info", text: "Payment received. Thank you!" });
      onPaid?.();
    } catch (err) {
      if (!(err instanceof CheckoutDismissed)) {
        setMessage({
          kind: "error",
          text: err instanceof ApiError ? err.message : err instanceof Error ? err.message : "The payment did not go through. You can try again.",
        });
      }
    } finally {
      setBusy(false);
    }
  }

  if (fee.status === "paid") {
    return (
      <section className="flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
          <BadgeCheck className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2 className="font-serif text-lg font-bold text-green-900">Registration fee paid in full</h2>
          <p className="text-sm text-green-800">
            {rupees(fee.paid)} received{fee.lastPaidAt && ` · last payment ${day(fee.lastPaidAt)}`}
            {fee.receipt && ` · Receipt ${fee.receipt}`}
          </p>
        </div>
      </section>
    );
  }

  const partial = fee.status === "partial";
  // A volunteer who has paid nothing: nothing is owed. This is only an offer to become a member, in a calm, optional tone.
  const free = fee.status === "free";

  return (
    <section className={cn("rounded-2xl border bg-white p-5 shadow-sm", free ? "border-[#d4af37]/40" : partial ? "border-amber-300" : "border-red-200")}>
      <div className="flex items-start gap-3">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", free ? "bg-[#fff1d8] text-[#e47105]" : partial ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600")}>
          <CircleAlert className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-lg font-bold text-maroon">
            {free ? "Become a member (optional)" : partial ? `Balance of ${rupees(fee.balance)} pending` : "Registration fee pending"}
          </h2>
          <p className="text-sm text-[#595656]">
            {free
              ? `Your volunteer account is free, and nothing is due. If you would also like to become a member, the registration fee is ${rupees(fee.total)}. You can start with ${rupees(fee.minimum)} and pay the rest later.`
              : partial
              ? "Thank you for your payment. You can pay the rest whenever you like."
              : `The registration fee is ${rupees(fee.total)}. You can start with just ${rupees(fee.minimum)} and pay the rest later.`}
          </p>
        </div>
      </div>

      {/* paid / pending bar (not for a volunteer: there is nothing pending) */}
      {!free && (
      <div className="mt-4">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f3e3c3]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#f47700] to-[#ffb347] transition-all duration-700" style={{ width: `${Math.round((fee.paid / fee.total) * 100)}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-xs font-semibold">
          <span className="text-green-700">Paid {rupees(fee.paid)}</span>
          <span className="text-red-600">Pending {rupees(fee.balance)}</span>
        </div>
      </div>
      )}

      {/* what to pay now */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!mustPayAll && (
          <button
            type="button"
            onClick={() => setAmount(String(fee.nextMin))}
            className={cn("rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors", value === fee.nextMin ? "border-primary bg-[#fff1d8] text-maroon" : "border-[#d4af37]/40 text-[#595656] hover:bg-[#fff8ec]")}
          >
            Pay minimum {rupees(fee.nextMin)}
          </button>
        )}
        <button
          type="button"
          onClick={() => setAmount(String(fee.nextMax))}
          className={cn("rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors", value === fee.nextMax ? "border-primary bg-[#fff1d8] text-maroon" : "border-[#d4af37]/40 text-[#595656] hover:bg-[#fff8ec]")}
        >
          {partial ? `Pay balance ${rupees(fee.nextMax)}` : `Pay in full ${rupees(fee.nextMax)}`}
        </button>
        {!mustPayAll && (
          <label className="flex items-center gap-1.5 text-sm text-[#595656]">
            or
            <span className="flex items-center rounded-lg border border-[#d4af37]/40 bg-[#fffaf1] px-2">
              ₹
              <input
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                aria-label="Amount to pay"
                className="w-20 bg-transparent px-1 py-1.5 text-sm font-semibold text-[#3e1815] outline-none"
              />
            </span>
          </label>
        )}
      </div>
      {!valid && amount !== "" && (
        <p className="mt-2 text-xs text-red-600">
          Enter an amount between {rupees(fee.nextMin)} and {rupees(fee.nextMax)}.
        </p>
      )}

      {message && <p className={cn("mt-3 text-sm", message.kind === "error" ? "text-red-600" : "text-green-700")}>{message.text}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={pay}
          disabled={busy || !valid}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Pay {valid ? rupees(value) : ""}
        </button>
        <span className="flex items-center gap-1.5 text-xs text-[#8a8580]">
          <ShieldCheck className="h-4 w-4" aria-hidden /> Payments are processed securely by Razorpay.
        </span>
      </div>
      <p className="mt-3 text-xs text-[#8a8580]">
        {"By paying you agree to our "}
        <PolicyLink doc="terms" with={["refund"]}>{"Terms of Service"}</PolicyLink>
        {" and "}
        <PolicyLink doc="refund" with={["terms"]}>{"Refund Policy"}</PolicyLink>
        {"."}
      </p>
    </section>
  );
}
