/**
 * Sign-in and sign-up: no header.
 *
 * The auth screens are a focused, full-height task — remove the header
 * to create a cleaner auth experience.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
