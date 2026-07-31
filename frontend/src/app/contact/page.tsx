import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const metadata: Metadata = { title: "Contact" };

const details = [
  { icon: Mail, label: "Email", value: "info@grandsapphire.in" },
  { icon: Phone, label: "Phone", value: "—" },
  { icon: MapPin, label: "Address", value: "—" },
];

export default function ContactPage() {
  return (
    <Section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 text-muted-foreground">
          Placeholder page. Content and layout will be replaced to match the
          approved design.
        </p>

        <ul className="mt-8 space-y-4">
          {details.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              <span className="text-sm text-muted-foreground">{label}:</span>
              <span className="text-sm">{value}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
