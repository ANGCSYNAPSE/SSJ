"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Loader2, X } from "lucide-react";

/** Shows a PDF (receipt or invoice) in place, with a Download button. The file is fetched with the person's sign-in. */
export default function DocumentPreview({
  title,
  load,
  fileName,
  onClose,
}: {
  title: string;
  /** Fetches the PDF as a Blob. */
  load: () => Promise<Blob>;
  fileName: string;
  onClose: () => void;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let revoked: string | null = null;
    let cancelled = false;
    load()
      .then((blob) => {
        if (cancelled) return;
        revoked = URL.createObjectURL(blob);
        setUrl(revoked);
      })
      .catch(() => !cancelled && setError("Could not open this document. Please try again."));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      document.removeEventListener("keydown", onKey);
      if (revoked) URL.revokeObjectURL(revoked);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className="flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-[#d4af37]/30 bg-[#fffaf1] px-5 py-3">
          <h2 className="font-serif text-lg font-bold text-maroon">{title}</h2>
          <div className="flex items-center gap-2">
            {url && (
              <a
                href={url}
                download={`${fileName}.pdf`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#e87722] px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" aria-hidden />
                {"Download PDF"}
              </a>
            )}
            <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-[#8a8580] hover:bg-black/5 hover:text-maroon">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative flex-1 bg-[#f1ece4]">
          {!url && !error && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-[#595656]">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {"Preparing your document…"}
            </div>
          )}
          {error && <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-red-700">{error}</p>}
          {url && <iframe title={title} src={url} className="h-full w-full border-0" />}
        </div>
      </div>
    </div>,
    document.body,
  );
}
