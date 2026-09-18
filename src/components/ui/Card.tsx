import { cn } from "@/lib/utils";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
