"use client";

import { useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import FieldGrid, {
  buildPayload,
  fileProblem,
  formatErrors,
  missingRequired,
  uploadedFromProfile,
  valuesFromProfile,
  type FieldErrors,
  type FieldValue,
  type FileValues,
  type FormValues,
} from "@/components/auth/signup/FieldInputs";
import type { Category, Field } from "@/components/auth/signup/categories";
import { ApiError, registrationsApi, uploadsApi } from "@/lib/api";

/**
 * Fills in (or changes) a registration right on the profile page, with the same fields the registration form uses, so the person
 * never has to leave. Every step's fields are shown one under another. Saving sends only what was filled in; new files are
 * uploaded first. Nothing is lost if they cancel.
 */
export default function RegistrationEditor({
  category,
  data,
  onCancel,
  onSaved,
}: {
  category: Category;
  data: Record<string, unknown>;
  onCancel: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const [values, setValues] = useState<FormValues>(() => valuesFromProfile(category, data));
  const [files, setFiles] = useState<FileValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const uploaded = useMemo(() => uploadedFromProfile(category, data), [category, data]);
  // A declaration ("I confirm all this is true") belongs to the first registration, not to a later edit.
  const steps = useMemo(() => category.steps.map((s) => ({ ...s, fields: s.fields.filter((f) => !f.local) })).filter((s) => s.fields.length > 0), [category]);
  const fields = useMemo(() => steps.flatMap((s) => s.fields), [steps]);
  const missing = missingRequired(fields, values, files, uploaded);

  function setField(key: string, value: FieldValue) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFormError([]);
  }

  function setFieldFiles(field: Field, picked: File[]) {
    const accepted: File[] = [];
    let problem: string | undefined;
    for (const file of picked) {
      const p = fileProblem(field, file);
      if (p) problem = problem ?? p;
      else accepted.push(file);
    }
    setFiles((f) => ({ ...f, [field.key]: accepted }));
    setErrors((e) => ({ ...e, [field.key]: problem }));
  }

  async function save() {
    setFormError([]);
    const wrong = formatErrors(fields, values);
    if (Object.keys(wrong).length > 0) {
      setErrors(wrong);
      setFormError(["Please correct the highlighted details."]);
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    try {
      // New files go up first; their addresses are saved with the rest.
      const filePatch: Record<string, unknown> = {};
      const fileFields = fields.filter((f) => f.type === "file" || f.type === "files");
      const total = fileFields.reduce((n, f) => n + (files[f.key]?.length ?? 0), 0);
      let done = 0;
      let failed = 0;
      for (const field of fileFields) {
        const urls: string[] = [];
        for (const file of files[field.key] ?? []) {
          setPending(`Uploading files (${done + 1} of ${total})…`);
          try {
            urls.push((await uploadsApi.upload(file)).url);
          } catch {
            failed += 1;
          }
          done += 1;
        }
        if (urls.length > 0) filePatch[field.key] = field.type === "files" ? urls : urls[0];
      }
      if (failed > 0) {
        setFormError([`${failed} file${failed === 1 ? "" : "s"} could not be uploaded. Please try again.`]);
        setPending(null);
        return;
      }

      setPending("Saving…");
      await registrationsApi.updateMine(category.key, { ...buildPayload({ ...category, steps } as Category, values), ...filePatch });
      await onSaved();
    } catch (err) {
      if (err instanceof ApiError && err.errors?.length) {
        const mapped: FieldErrors = {};
        for (const { field, message } of err.errors) mapped[field.replace(/^profile\./, "")] = message;
        setErrors(mapped);
        setFormError(err.errors.map((e) => e.message));
      } else {
        setFormError([err instanceof ApiError ? err.message : "Something went wrong. Please try again."]);
      }
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setPending(null);
    }
  }

  const busy = Boolean(pending);

  return (
    <div ref={top} className="scroll-mt-28 px-5 py-6 sm:px-6">
      <p className="mb-5 rounded-xl bg-[#fff8ec] px-4 py-3 text-sm text-[#595656]">
        {missing.length > 0
          ? `Fill in what you can; ${missing.length} required detail${missing.length === 1 ? " is" : "s are"} still missing. You can save now and finish later.`
          : "Everything required is filled in. Change anything you like, then save."}
      </p>

      <div className="flex flex-col gap-8">
        {steps.map((step) => (
          <section key={step.title}>
            <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-primary">{step.title}</h4>
            <FieldGrid fields={step.fields} values={values} files={files} uploaded={uploaded} errors={errors} onChange={setField} onFiles={setFieldFiles} />
          </section>
        ))}
      </div>

      {formError.length > 0 && (
        <div role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {formError.map((m) => (
            <p key={m}>{m}</p>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[#d4af37]/25 pt-5">
        <button type="button" onClick={onCancel} disabled={busy} className="rounded-full px-5 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-[#fff1d8] disabled:opacity-50">
          {"Cancel"}
        </button>
        <button type="button" onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f47700] to-[#ff9417] px-7 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(244,119,0,0.35)] transition-transform hover:-translate-y-0.5 disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {pending ?? "Save details"}
        </button>
      </div>
    </div>
  );
}
