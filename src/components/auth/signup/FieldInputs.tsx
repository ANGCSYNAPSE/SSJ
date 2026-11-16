"use client";

import { useRef } from "react";
import { Camera, Check, ChevronDown, FileText, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthField } from "@/components/auth/AuthShell";
import { MAX_FILE_MB, type Category, type Field } from "./categories";

export type FieldValue = string | string[] | boolean;
export type FormValues = Record<string, FieldValue>;
export type FileValues = Record<string, File[]>;
export type FieldErrors = Partial<Record<string, string>>;
/** URLs of files already saved on a profile, by field key (a list for multi-file fields). */
export type UploadedFiles = Partial<Record<string, string | string[] | null>>;

const box =
  "w-full rounded-xl border-[1.5px] border-border bg-cream-light px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export const allFields = (category: Category): Field[] => category.steps.flatMap((step) => step.fields);

/** Blank values for every field, so inputs are always controlled. */
export function emptyValues(category: Category): FormValues {
  const values: FormValues = {};
  for (const field of allFields(category)) {
    if (field.type === "file" || field.type === "files") continue;
    values[field.key] = field.type === "multi" ? [] : field.type === "checkbox" ? false : "";
  }
  return values;
}

/** Form values for a profile that already exists, so a person can carry on where they stopped. */
export function valuesFromProfile(category: Category, profile: Record<string, unknown>): FormValues {
  const values = emptyValues(category);
  for (const field of allFields(category)) {
    if (field.type === "file" || field.type === "files" || field.local) continue;
    const saved = profile[field.key];
    if (saved === null || saved === undefined) continue;
    if (field.type === "multi") values[field.key] = Array.isArray(saved) ? saved.map(String) : [];
    else if (field.type === "checkbox") values[field.key] = saved === true;
    else if (field.type === "date") values[field.key] = String(saved).slice(0, 10);
    else values[field.key] = String(saved);
  }
  return values;
}

/** The files a profile already has, so they aren't asked for again. */
export function uploadedFromProfile(category: Category, profile: Record<string, unknown>): UploadedFiles {
  const uploaded: UploadedFiles = {};
  for (const field of allFields(category)) {
    if (field.type !== "file" && field.type !== "files") continue;
    const saved = profile[field.key];
    if (field.type === "files") uploaded[field.key] = Array.isArray(saved) ? saved.map(String) : [];
    else uploaded[field.key] = typeof saved === "string" && saved !== "" ? saved : null;
  }
  return uploaded;
}

const hasUploaded = (value: UploadedFiles[string]) => (Array.isArray(value) ? value.length > 0 : Boolean(value));

/** Client-side mirror of the backend rules, so people see problems before the round trip. */
export function formatErrors(fields: Field[], values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of fields) {
    if (field.type === "file" || field.type === "files" || field.type === "checkbox") continue;

    const value = values[field.key];
    const text = typeof value === "string" ? value.trim() : "";
    // A blank field is never an error here — people may leave details for later.
    if (text === "") continue;

    if (field.minLength && text.length < field.minLength) {
      errors[field.key] = `Please write at least ${field.minLength} characters, or clear this field.`;
    } else if (field.pattern && !field.pattern.test(text)) {
      errors[field.key] = field.patternMessage ?? "Check this value.";
    } else if (field.type === "url" && !/^https?:\/\/\S+\.\S+/.test(text)) {
      errors[field.key] = "Enter a full link starting with https://";
    } else if (field.type === "number" && !(Number(text) >= 0)) {
      errors[field.key] = "Enter a valid number.";
    }
  }
  return errors;
}

/** Required details (marked *) that are still empty. They don't block anything; they mark the profile incomplete. */
export function missingRequired(
  fields: Field[],
  values: FormValues,
  files: FileValues,
  uploaded: UploadedFiles = {},
): Field[] {
  return fields.filter((field) => {
    if (!field.required || field.local || field.type === "checkbox") return false;
    if (field.type === "file" || field.type === "files") {
      return !(files[field.key]?.length > 0) && !hasUploaded(uploaded[field.key]);
    }
    const value = values[field.key];
    return typeof value !== "string" || value.trim() === "";
  });
}

/** Declarations the person must tick before the final Submit (accuracy certification and the like). */
export function declarationErrors(fields: Field[], values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of fields) {
    if (field.type === "checkbox" && field.required && values[field.key] !== true) {
      errors[field.key] = field.requiredMessage ?? "Please tick this to continue.";
    }
  }
  return errors;
}

/** Turns form values into the request payload: blanks dropped, numbers as numbers, declarations left out. */
export function buildPayload(category: Category, values: FormValues): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of allFields(category)) {
    if (field.local || field.type === "file" || field.type === "files") continue;
    const value = values[field.key];
    if (typeof value === "string") {
      const text = value.trim();
      if (text !== "") payload[field.key] = field.type === "number" ? Number(text) : text;
    } else if (Array.isArray(value)) {
      if (value.length > 0) payload[field.key] = value;
    } else if (field.type === "checkbox") {
      payload[field.key] = value;
    }
  }
  return payload;
}

const extension = (mime: string) => mime.split("/")[1]?.replace("jpeg", "jpg").split(".").pop() ?? "file";

/** Why `file` can't be used for `field`, or null when it's fine. */
export function fileProblem(field: Field, file: File): string | null {
  if (field.accept && !field.accept.includes(file.type)) {
    const names = [...new Set(field.accept.map(extension))].join(", ").toUpperCase();
    return `${file.name}: only ${names} files are accepted.`;
  }
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    return `${file.name} is over ${MAX_FILE_MB}MB. Please choose a smaller file.`;
  }
  return null;
}

function Control({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
}) {
  const id = `field-${field.key}`;

  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        rows={3}
        placeholder={field.placeholder}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        className={cn(box, "resize-none py-2")}
      />
    );
  }

  if (field.type === "select") {
    return (
      <div className="relative">
        <select
          id={id}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={cn(box, "h-9 appearance-none pr-9", value === "" && "text-muted-foreground")}
        >
          <option value="">Select…</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
      </div>
    );
  }

  if (field.type === "multi") {
    const selected = value as string[];
    return (
      <div className="flex flex-wrap gap-1.5">
        {field.options?.map((option) => {
          const on = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? selected.filter((v) => v !== option) : [...selected, option])}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                on
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-cream-light text-maroon hover:border-primary",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <input
      id={id}
      type={field.type}
      inputMode={field.type === "number" ? "numeric" : undefined}
      min={field.type === "number" ? 0 : undefined}
      max={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
      placeholder={field.placeholder}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      className={cn(box, "h-9")}
    />
  );
}

function FilePicker({
  field,
  files,
  saved,
  error,
  onPick,
}: {
  field: Field;
  files: File[];
  /** Whether the profile already has this file saved. */
  saved: boolean;
  error?: string;
  onPick: (files: File[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const multiple = field.type === "files";
  const limit = multiple ? (field.maxFiles ?? 5) : 1;
  const Icon = field.accept?.some((t) => t.startsWith("application/")) ? FileText : Camera;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[13px] font-bold text-maroon">
        {field.required ? `${field.label} *` : field.label}
      </span>
      <div className="flex flex-col gap-2 rounded-xl border-[1.5px] border-dashed border-border bg-cream-light px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Icon className="h-[18px] w-[18px] shrink-0 text-primary" />
          <span className="min-w-0 flex-1 text-sm text-muted-foreground">
            {field.hint ?? "Choose a file"} · up to {MAX_FILE_MB}MB each
          </span>
          {files.length < limit && (
            <button type="button" onClick={() => input.current?.click()} className="text-sm font-bold text-primary hover:underline">
              {files.length > 0 ? "Add" : "Choose"}
            </button>
          )}
        </div>
        {saved && files.length === 0 && (
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-green-700">
            <Check className="h-3.5 w-3.5" aria-hidden />
            {"Already uploaded — choose a file to replace it"}
          </p>
        )}
        {files.length > 0 && (
          <ul className="flex flex-col gap-1">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center gap-2 text-[13px] text-maroon">
                <Paperclip className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => onPick(files.filter((_, i) => i !== index))}
                  className="text-muted-foreground hover:text-maroon"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <input
          ref={input}
          type="file"
          multiple={multiple}
          accept={field.accept?.join(",")}
          className="hidden"
          onChange={(e) => {
            const picked = Array.from(e.target.files ?? []);
            e.target.value = "";
            if (picked.length === 0) return;
            onPick([...files, ...picked].slice(0, limit));
          }}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/** One step's worth of fields, laid out two to a row where a field is marked `half`. */
export default function FieldGrid({
  fields,
  values,
  files,
  uploaded = {},
  errors,
  onChange,
  onFiles,
}: {
  fields: Field[];
  values: FormValues;
  files: FileValues;
  uploaded?: UploadedFiles;
  errors: FieldErrors;
  onChange: (key: string, value: FieldValue) => void;
  onFiles: (field: Field, files: File[]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3.5">
      {fields.map((field) => {
        if (field.type === "checkbox") {
          const checked = values[field.key] === true;
          return (
            <div key={field.key} className="col-span-2 flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  aria-label={field.label}
                  onClick={() => onChange(field.key, !checked)}
                  className={cn(
                    "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded",
                    checked ? "bg-primary" : "border-[1.5px] border-border bg-white",
                  )}
                >
                  {checked && <Check className="h-2.5 w-2.5 text-white" />}
                </button>
                <span className="text-[13px] text-muted-foreground">{field.label}</span>
              </div>
              {errors[field.key] && <p className="text-xs text-red-600">{errors[field.key]}</p>}
            </div>
          );
        }

        if (field.type === "file" || field.type === "files") {
          return (
            <div key={field.key} className="col-span-2">
              <FilePicker
                field={field}
                files={files[field.key] ?? []}
                saved={hasUploaded(uploaded[field.key])}
                error={errors[field.key]}
                onPick={(picked) => onFiles(field, picked)}
              />
            </div>
          );
        }

        return (
          <div key={field.key} className={field.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
            <AuthField
              label={field.required ? `${field.label} *` : field.label}
              htmlFor={`field-${field.key}`}
              error={errors[field.key]}
            >
              <Control field={field} value={values[field.key]} onChange={(v) => onChange(field.key, v)} />
            </AuthField>
          </div>
        );
      })}
    </div>
  );
}
