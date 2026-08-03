import { cn } from "@/lib/utils";

/**
 * The "About <accent>" / "Our <accent>" heading used across the home page:
 * a serif line where the second half carries the orange accent.
 */
export default function SectionHeading({
  lead,
  accent,
  className,
  as: Tag = "h2",
}: {
  lead: string;
  accent: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-3xl font-bold tracking-tight sm:text-4xl",
        className,
      )}
    >
      <span className="text-maroon">{lead} </span>
      <span className="text-primary">{accent}</span>
    </Tag>
  );
}
