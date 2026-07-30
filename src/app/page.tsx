import Link from "next/link";
import { ArrowRight, Layers, Zap, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { SITE } from "@/lib/constants";

const features = [
  {
    icon: Layers,
    title: "Component driven",
    description:
      "Reusable UI primitives so every screen from the design system stays consistent.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    description:
      "Next.js App Router with server components, optimized fonts and images.",
  },
  {
    icon: ShieldCheck,
    title: "Type safe",
    description:
      "Strict TypeScript and ESLint keep the codebase clean as the project grows.",
  },
];

export default function HomePage() {
  return (
    <>
      <Section className="pt-20 pb-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              {SITE.name}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Project scaffold is ready
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Next.js 14, TypeScript, Tailwind CSS and Lucide icons are wired up.
              Share the designs and these pages get built to match.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link href="/about">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/40 py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <Icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
