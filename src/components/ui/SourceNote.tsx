import Link from "next/link";

/**
 * A small line saying where the details above it come from: the Shri Shyam Mandir Committee and the public sources listed on
 * the About page. It sits quietly at the foot of sections that state facts about Baba Shyam or the temple, so the reference is
 * mentioned in many places and never in only one.
 */
export default function SourceNote({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`text-[11px] leading-relaxed ${tone === "dark" ? "text-white/45" : "text-[#6b4f4f]/60"} ${className}`}>
      {"Details follow the "}
      <a href="https://www.shrishyammandir.com/" target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-2 hover:opacity-80">
        {"Shri Shyam Mandir Committee"}
      </a>
      {" and public sources. "}
      <Link href="/about#sources" className="underline decoration-dotted underline-offset-2 hover:opacity-80">
        {"See the sources"}
      </Link>
      {"."}
    </p>
  );
}
