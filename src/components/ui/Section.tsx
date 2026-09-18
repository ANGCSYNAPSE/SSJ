import { cn } from "@/lib/utils";

export default function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-12", className)}>
      {children}
    </section>
  );
}
