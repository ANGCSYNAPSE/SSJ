"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, CheckCircle2, CircleAlert, ClipboardList, HandHeart, Heart, LayoutGrid, Pencil, UserRound, Wallet } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";
import { ACCOUNT_CHANGED } from "@/components/notifications/NotificationBell";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import ProfileHero from "@/components/profile/ProfileHero";
import { ActivityList, CompleteNudge, ReportTiles, SevaChart, StatCard } from "@/components/profile/ProfileOverview";
import RegistrationEditor from "@/components/profile/RegistrationEditor";
import { DetailsCard, LinksCard } from "@/components/profile/ProfileDetails";
import VerifyPhoneDialog from "@/components/profile/VerifyPhoneDialog";
import RegistrationFeeCard from "@/components/payments/RegistrationFeeCard";
import VolunteerCard from "@/components/profile/VolunteerCard";
import DigitalCardSection from "@/components/profile/DigitalCardSection";
import PaymentDocuments from "@/components/payments/PaymentDocuments";
import { useAuth } from "@/components/auth/AuthProvider";
import { CATEGORIES, categoryByKey, type Field } from "@/components/auth/signup/categories";
import { ApiError, meApi, uploadsApi, type Dashboard, type DashboardProfile } from "@/lib/api";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
  blocked: "bg-red-100 text-red-700",
};

const isBlank = (v: unknown) =>
  v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0);

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const date = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** One stored value as something readable. */
function Value({ field, value }: { field: Field; value: unknown }) {
  if (isBlank(value)) return null;
  if (field.type === "file" && typeof value === "string") {
    return (
      <a href={value} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
        View uploaded file
      </a>
    );
  }
  if (field.type === "files" && Array.isArray(value)) {
    return (
      <span className="flex flex-wrap gap-2">
        {value.map((url, i) => (
          <a key={String(url)} href={String(url)} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
            File {i + 1}
          </a>
        ))}
      </span>
    );
  }
  if (typeof value === "boolean") return <>{value ? "Yes" : "No"}</>;
  if (Array.isArray(value)) return <>{value.join(", ")}</>;
  return <>{String(value)}</>;
}

function Bar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3e3c3]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#f47700] to-[#ffb347] transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function ProfileCard({ profile, onSaved }: { profile: DashboardProfile; onSaved: () => void | Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const category = categoryByKey(profile.category);
  if (!category) return null;
  const data = profile.data ?? {};
  const Icon = category.icon;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-4 border-b border-[#d4af37]/20 bg-[#fff8ec] px-5 py-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-bold text-maroon">{category.label}</h3>
          <div className="mt-1 flex items-center gap-3">
            <div className="w-40">
              <Bar percent={profile.completion} />
            </div>
            <span className="text-xs font-semibold text-[#595656]">{profile.completion}% complete</span>
          </div>
        </div>
        <span className={cn("rounded-full px-3 py-1 text-xs font-bold capitalize", STATUS_STYLE[profile.status] ?? "bg-gray-100 text-gray-700")}>
          {profile.status}
        </span>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all hover:-translate-y-0.5",
              profile.isComplete ? "border border-[#e0b94f] text-maroon hover:bg-[#fff1d8]" : "bg-primary text-white hover:opacity-90",
            )}
          >
            {profile.isComplete ? (
              <>
                <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit details
              </>
            ) : (
              <>
                Complete now <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </>
            )}
          </button>
        )}
      </div>

      {profile.isComplete ? (
        <p className="flex items-center gap-2 bg-green-50 px-5 py-2.5 text-xs font-semibold text-green-800">
          <CheckCircle2 className="h-4 w-4" aria-hidden /> Everything required is filled in.
        </p>
      ) : (
        <p className="flex items-center gap-2 bg-amber-50 px-5 py-2.5 text-xs font-semibold text-amber-800">
          <CircleAlert className="h-4 w-4" aria-hidden /> {profile.missing.length} required detail
          {profile.missing.length === 1 ? "" : "s"} still missing.
        </p>
      )}

      {editing ? (
        <RegistrationEditor
          category={category}
          data={data}
          onCancel={() => setEditing(false)}
          onSaved={async () => {
            await onSaved();
            setEditing(false);
          }}
        />
      ) : (
      <div className="flex flex-col gap-6 px-5 py-5">
        {category.steps.map((step) => {
          const fields = step.fields.filter((f) => !f.local && f.type !== "checkbox");
          if (fields.length === 0) return null;
          return (
            <div key={step.title}>
              <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-primary">{step.title}</h4>
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {fields.map((field) => {
                  const value = data[field.key];
                  const filled = !isBlank(value);
                  return (
                    <div key={field.key} className="min-w-0">
                      <dt className="text-xs text-[#8a8580]">{field.label.replace(" (Optional)", "")}</dt>
                      <dd className="mt-0.5 break-words text-sm font-medium text-[#3e1815]">
                        {filled ? (
                          <Value field={field} value={value} />
                        ) : (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold",
                              profile.missing.includes(field.key) ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-500",
                            )}
                          >
                            {profile.missing.includes(field.key) ? "Required, not filled" : "Not filled"}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
}

function Stat({ icon: Icon, label, value, hint }: { icon: typeof Heart; label: string; value: string; hint?: string }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-[#d4af37]/30 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff1d8] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-extrabold leading-tight text-maroon">{value}</p>
        <p className="text-xs text-[#595656]">{label}</p>
        {hint && <p className="text-[11px] text-[#8a8580]">{hint}</p>}
      </div>
    </div>
  );
}

type TabKey = "overview" | "profile" | "registrations" | "payments" | "messages";

function DashboardView() {
  const { user, refreshUser } = useAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");

  const load = () =>
    meApi
      .dashboard()
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not load your dashboard."));

  useEffect(() => {
    load();
    // A payment, refund or review message arrived: the numbers on this page refresh without a reload.
    window.addEventListener(ACCOUNT_CHANGED, load);
    return () => window.removeEventListener(ACCOUNT_CHANGED, load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Opens the digital card: it lives on the Profile tab, so go there and bring it into view. */
  const openCard = () => {
    setTab("profile");
    window.history.replaceState(null, "", "#my-card");
    window.setTimeout(() => document.getElementById("my-card")?.scrollIntoView({ behavior: "smooth", block: "start" }), 160);
  };

  // The address can name a tab (#registrations), or the card (#my-card, which lives on the Profile tab).
  useEffect(() => {
    const read = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "overview" || hash === "profile" || hash === "registrations" || hash === "payments" || hash === "messages") setTab(hash);
      else if (hash === "my-card") {
        setTab("profile");
        window.setTimeout(() => document.getElementById("my-card")?.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
      }
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const choose = (next: TabKey) => {
    setTab(next);
    window.history.replaceState(null, "", `#${next}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** A new profile photo: checked here, uploaded, and saved on the account. */
  async function changePhoto(file: File) {
    setPhotoError(null);
    if (!file.type.startsWith("image/")) return setPhotoError("Please choose a picture (JPG or PNG).");
    if (file.size > 5 * 1024 * 1024) return setPhotoError("Please choose a picture smaller than 5 MB.");
    setUploading(true);
    try {
      const { url } = await uploadsApi.upload(file);
      await meApi.update({ avatarUrl: url });
      await Promise.all([load(), refreshUser()]);
    } catch (err) {
      setPhotoError(err instanceof ApiError ? err.message : "Could not upload the picture. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  if (error) return <p className="py-20 text-center text-sm text-red-600">{error}</p>;
  if (!data) return <p className="py-20 text-center text-sm text-[#595656]">Loading your dashboard…</p>;

  const { account, profiles, notifications, donations } = data;
  const registered = new Set(profiles.map((p) => p.category));
  const others = CATEGORIES.filter((c) => !registered.has(c.key));
  const kinds = profiles.map((p) => categoryByKey(p.category)?.label).filter((k): k is string => Boolean(k));
  const feeDue = user?.registrationFee === "pending" || user?.registrationFee === "partial";
  const incomplete = profiles.filter((p) => !p.isComplete).length;

  // Whatever shows on the card changes this key, so the card is made again at once and always matches the page.
  const cardKey = JSON.stringify([account.fullName, account.avatarUrl, account.location, account.bio, account.socialLinks, account.isMember, account.isVerified, profiles.map((p) => [p.category, p.status]), data.volunteer?.status]);

  const tabs: { key: TabKey; label: string; short: string; icon: typeof Bell; badge?: number; dot?: boolean }[] = [
    { key: "overview", label: "Overview", short: "Home", icon: LayoutGrid },
    { key: "profile", label: "Profile", short: "Profile", icon: UserRound },
    { key: "registrations", label: "Registrations", short: "Forms", icon: ClipboardList, badge: incomplete || undefined },
    { key: "payments", label: "Payments & seva", short: "Seva", icon: Wallet, dot: feeDue },
    { key: "messages", label: "Messages", short: "Inbox", icon: Bell, badge: notifications.unread || undefined },
  ];

  return (
    <div className="bg-[#fffaf1] pb-24 md:pb-0">
      {verifyingPhone && (
        <VerifyPhoneDialog
          onClose={() => setVerifyingPhone(false)}
          onVerified={() => {
            setVerifyingPhone(false);
            void Promise.all([load(), refreshUser()]);
          }}
        />
      )}
      {editing && (
        <EditProfileDialog
          account={account}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false);
            void Promise.all([load(), refreshUser()]);
          }}
        />
      )}

      <ProfileHero data={data} kinds={kinds} onEdit={() => setEditing(true)} onCard={openCard} onPhoto={changePhoto} uploading={uploading} photoError={photoError} />
      <StatCard data={data} onGo={choose} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-14 pt-8 sm:px-6 lg:px-[88px] lg:pb-20">
        {/* the tabs, as a pill bar (on a phone they are the bar at the foot of the screen instead) */}
        <div className="sticky top-[72px] z-30 mb-8 hidden justify-center md:flex">
          <div role="tablist" aria-label="Profile sections" className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#e0b94f]/50 bg-white/95 p-1.5 shadow-[0_14px_34px_rgba(107,31,31,0.16)] backdrop-blur">
            {tabs.map((t) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => choose(t.key)}
                  className={cn("relative flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300", on ? "bg-gradient-to-r from-[#f47700] to-[#ff9417] text-white shadow-[0_8px_18px_rgba(244,119,0,0.35)]" : "text-maroon hover:bg-[#fff1d8]")}
                >
                  <t.icon className="h-4 w-4" aria-hidden />
                  {t.label}
                  {t.badge ? <span className={cn("flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold", on ? "bg-white text-[#e47105]" : "bg-red-500 text-white")}>{t.badge}</span> : null}
                  {t.dot && <span aria-label="Fee balance due" className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <div key={tab} role="tabpanel" className="gs-slide flex flex-col gap-6 sm:gap-8">
          {tab === "overview" && (
            <>
              <CompleteNudge data={data} onEdit={() => setEditing(true)} />
              <ReportTiles data={data} onGo={choose} />
              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
                <ActivityList data={data} onGo={choose} />
                <SevaChart monthly={donations.monthly ?? []} />
              </div>
            </>
          )}

          {tab === "profile" && (
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                <DetailsCard account={account} onEdit={() => setEditing(true)} onVerifyPhone={() => setVerifyingPhone(true)} />
                <LinksCard account={account} onEdit={() => setEditing(true)} />
              </div>
              <div id="my-card" className="scroll-mt-24">
                <DigitalCardSection syncKey={cardKey} />
              </div>
              {data.volunteer && <VolunteerCard volunteer={data.volunteer} />}
            </>
          )}

          {tab === "registrations" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-maroon">My registrations</h2>
                <p className="mt-1 text-sm text-[#595656]">Fill in the details right here, and save as you go.</p>
              </div>
              {profiles.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d4af37]/50 bg-white p-8 text-center">
                  <p className="text-sm text-[#595656]">
                    You have not registered as an artist, temple, dharamshala or mandal yet. Join the community and
                    get listed.
                  </p>
                </div>
              ) : (
                profiles.map((p) => <ProfileCard key={p.category} profile={p} onSaved={async () => { await Promise.all([load(), refreshUser()]); }} />)
              )}

              {others.length > 0 && (
                <section className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#fff8ec] to-[#fde9c8] p-5">
                  <h3 className="font-serif text-lg font-bold text-maroon">Grow with Shyam Jagat</h3>
                  <p className="mt-1 text-sm text-[#595656]">Register in another category from the same account.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {others.map((c) => (
                      <Link key={c.key} href="/register" className="group flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-white px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                          <c.icon className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-maroon">{c.label}</span>
                          <span className="block truncate text-[11px] text-[#8a8580]">{c.blurb}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {tab === "payments" && (
            <>
              {/* Registration fee: pending with the two plans, or paid. A volunteer sees an optional "become a member" version. */}
              <RegistrationFeeCard />
              <PaymentDocuments />
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat icon={Heart} label="Given in seva so far" value={rupees(donations.total)} hint={`${donations.count} offering${donations.count === 1 ? "" : "s"}`} />
                <Link href="/#give-seva" className="group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#f47700] to-[#ff9417] px-5 py-4 text-white shadow-[0_12px_28px_rgba(244,119,0,0.3)] transition-transform hover:-translate-y-1">
                  <span>
                    <span className="block font-serif text-xl font-bold">Give seva</span>
                    <span className="block text-xs text-white/90">Food, cows, children, water and more</span>
                  </span>
                  <HandHeart className="h-7 w-7 transition-transform group-hover:scale-110" aria-hidden />
                </Link>
              </div>
              <section className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 shadow-sm">
                <h2 className="font-serif text-lg font-bold text-maroon">My donations</h2>
                {donations.recent.length === 0 ? (
                  <p className="mt-3 text-sm text-[#8a8580]">You have not donated yet. Every seva counts.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-[#d4af37]/20">
                    {donations.recent.map((d) => (
                      <li key={d.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-[#3e1815]">{d.cause}</span>
                          <span className="text-[11px] text-[#8a8580]">{date(d.createdAt)}</span>
                        </span>
                        <span className="font-bold text-maroon">{rupees(d.amount)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}

          {tab === "messages" && (
            <section className="rounded-2xl border border-[#d4af37]/30 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-serif text-2xl font-bold text-maroon">Messages from the team</h2>
              {notifications.recent.length === 0 ? (
                <p className="mt-3 text-sm text-[#8a8580]">No new messages. You are all caught up.</p>
              ) : (
                <ul className="mt-4 flex flex-col gap-3">
                  {notifications.recent.map((n) => (
                    <li key={n.id} className="rounded-xl bg-[#fff8ec] p-4">
                      {n.title && <p className="text-sm font-bold text-maroon">{n.title}</p>}
                      <p className="text-sm text-[#3e1815]">{n.message}</p>
                      <p className="mt-1 text-[11px] text-[#8a8580]">{date(n.createdAt)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      </div>

      {/* the round "give seva" button, as in a phone app */}
      <Link href="/#give-seva" aria-label="Give seva" title="Give seva" className="gs-glow fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f47700] to-[#ff9417] text-white shadow-[0_14px_30px_rgba(244,119,0,0.5)] transition-transform hover:scale-110 md:bottom-8 md:right-8">
        <HandHeart className="h-6 w-6" aria-hidden />
      </Link>

      {/* on a phone: the bar of tabs at the foot of the screen */}
      <nav aria-label="Profile sections" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e0b94f]/40 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(107,31,31,0.12)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-[520px] grid-cols-5">
          {tabs.map((t) => {
            const on = tab === t.key;
            return (
              <button key={t.key} type="button" onClick={() => choose(t.key)} aria-current={on ? "page" : undefined} className="relative flex flex-col items-center gap-0.5 px-1 pb-2 pt-2.5">
                {on && <span aria-hidden className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-[#e47105]" />}
                <span className="relative">
                  <t.icon className={cn("h-[22px] w-[22px] transition-all duration-300", on ? "scale-110 text-[#e47105]" : "text-[#8a7a6a]")} aria-hidden />
                  {t.badge ? <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{t.badge}</span> : null}
                  {t.dot && <span aria-label="Fee balance due" className="absolute -right-1 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />}
                </span>
                <span className={cn("text-[10.5px] font-semibold", on ? "text-[#e47105]" : "text-[#8a7a6a]")}>{t.short}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <DashboardView />
    </RequireAuth>
  );
}
