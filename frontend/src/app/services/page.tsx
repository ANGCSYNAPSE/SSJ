import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <Section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Services
        </h1>
        <p className="mt-4 text-muted-foreground">
          Placeholder page. Content and layout will be replaced to match the
          approved design.
        </p>
      </Container>
    </Section>
  );
}
