import ProfileShell from "@/components/profile/ProfileShell";

/**
 * The signed-in person's own pages (their profile). It deliberately does not have the website's top bar, menu or footer: the
 * profile is a place of its own, with a slim header and a way back to the website.
 */
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <ProfileShell>{children}</ProfileShell>;
}
