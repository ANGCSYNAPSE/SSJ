"use client";

import { useEffect, useState } from "react";
import { Download, Eye, FileText, ReceiptText } from "lucide-react";
import DocumentPreview from "@/components/payments/DocumentPreview";
import { ACCOUNT_CHANGED } from "@/components/notifications/NotificationBell";
import { paymentsApi, type PaymentHistoryItem } from "@/lib/api";

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const day = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

type Open = { id: string; kind: "receipt" | "invoice"; title: string; fileName: string };

/** The member's receipts (one per payment) and registration-fee invoice: preview in place or download as PDF. */
export default function PaymentDocuments() {
  const [paid, setPaid] = useState<PaymentHistoryItem[] | null>(null);
  const [open, setOpen] = useState<Open | null>(null);

  useEffect(() => {
    const load = () =>
      paymentsApi
        .me()
        .then((d) => setPaid((d.history ?? []).filter((p) => p.status === "paid")))
        .catch(() => setPaid([]));
    void load();
    window.addEventListener(ACCOUNT_CHANGED, load);
    return () => window.removeEventListener(ACCOUNT_CHANGED, load);
  }, []);

  // Nothing to show until there is a payment.
  if (!paid || paid.length === 0) return null;

  const invoiceFor = paid[paid.length - 1]; // history is newest first; any paid payment identifies the person's invoice
  const download = async (item: Open) => {
    const blob = await paymentsApi.document(item.id, item.kind);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.fileName}.pdf`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const buttonClass = "inline-flex items-center gap-1.5 rounded-lg border border-[#d4af37]/50 bg-white px-3 py-1.5 text-xs font-semibold text-maroon transition-colors hover:bg-[#fff1d8]";

  return (
    <section className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-maroon">
          <ReceiptText className="h-5 w-5 text-[#e47105]" aria-hidden />
          {"Receipts & invoice"}
        </h2>
        <div className="flex gap-2">
          <button type="button" className={buttonClass} onClick={() => setOpen({ id: invoiceFor.id, kind: "invoice", title: "Registration fee invoice", fileName: "Shyam-Jagat-Invoice" })}>
            <Eye className="h-3.5 w-3.5" aria-hidden />
            {"Preview invoice"}
          </button>
          <button type="button" className={buttonClass} onClick={() => void download({ id: invoiceFor.id, kind: "invoice", title: "", fileName: "Shyam-Jagat-Invoice" })}>
            <Download className="h-3.5 w-3.5" aria-hidden />
            {"Invoice PDF"}
          </button>
        </div>
      </div>

      <ul className="mt-3 divide-y divide-[#d4af37]/20">
        {paid.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1d8] text-[#e47105]">
                <FileText className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-maroon">
                  {rupees(p.amount)}
                  {p.refunded > 0 && <span className="ml-2 text-xs font-semibold text-red-600">{`${rupees(p.refunded)} refunded`}</span>}
                </p>
                <p className="truncate text-xs text-[#8a8580]">{`${p.receipt} · ${day(p.paidAt ?? p.createdAt)}`}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className={buttonClass} onClick={() => setOpen({ id: p.id, kind: "receipt", title: `Receipt ${p.receipt}`, fileName: `Shyam-Jagat-Receipt-${p.receipt}` })}>
                <Eye className="h-3.5 w-3.5" aria-hidden />
                {"Preview"}
              </button>
              <button type="button" className={buttonClass} onClick={() => void download({ id: p.id, kind: "receipt", title: "", fileName: `Shyam-Jagat-Receipt-${p.receipt}` })}>
                <Download className="h-3.5 w-3.5" aria-hidden />
                {"Receipt PDF"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {open && <DocumentPreview title={open.title} fileName={open.fileName} load={() => paymentsApi.document(open.id, open.kind)} onClose={() => setOpen(null)} />}
    </section>
  );
}
