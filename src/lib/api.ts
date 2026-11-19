/**
 * Client for the separate backend service (see `backend/`).
 *
 * The access token is held in memory only — never localStorage — so a XSS bug
 * cannot exfiltrate a long-lived credential. Across reloads the session is
 * restored from the httpOnly refresh cookie via `authApi.refresh()`.
 */
// Trailing slash stripped defensively — if NEXT_PUBLIC_API_URL is ever set
// with one (e.g. "https://api.example.com/"), the request path below would
// otherwise end up as ".../api" + "/v1/..." with a double slash, which
// Vercel 308-redirects and the browser's fetch() then fails on (cross-origin
// redirects drop CORS headers), surfacing as "Could not reach the server."
/**
 * Where API calls from the browser go. Empty means this site's own address: next.config.mjs
 * forwards /api/v1/* to the backend, so the login cookie is first-party. Set
 * NEXT_PUBLIC_API_DIRECT=1 to call the backend straight from the browser instead.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_DIRECT === "1" ? (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "") : "";

// Trailing slash stripped defensively: a double slash makes Vercel 308-redirect and fetch() then fails.
/** The backend's own address, for things that are not API calls (uploaded image URLs, public reads). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errors?: { field: string; message: string }[],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

let accessToken: string | null = null;

export const tokenStore = {
  get: () => accessToken,
  set: (token: string | null) => {
    accessToken = token;
  },
};

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH";
  /** A plain object is sent as JSON; a FormData body is sent as-is (file uploads). */
  body?: unknown;
  auth?: boolean;
  /** Internal: prevents a refresh loop when the refresh call itself 401s. */
  retryOnUnauthorized?: boolean;
}

/**
 * Gets a new access token from the refresh cookie. Several requests can hit an
 * expired token at once; they all share one refresh call. When the refresh
 * cookie is gone too (7 days idle, or signed out elsewhere) the user is signed
 * out in the UI by announcing it on window.
 */
let renewing: Promise<boolean> | null = null;
function renewAccessToken(): Promise<boolean> {
  renewing ??= authApi
    .refresh()
    .then((renewed) => {
      accessToken = renewed.accessToken;
      return true;
    })
    .catch(() => {
      accessToken = null;
      if (typeof window !== "undefined") window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
      return false;
    })
    .finally(() => {
      renewing = null;
    });
  return renewing;
}

export const SESSION_EXPIRED_EVENT = "ssj:session-expired";

async function request<T>(
  path: string,
  { method = "POST", body, auth = false, retryOnUnauthorized = true }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1${path}`, {
      method,
      headers,
      credentials: "include",
      body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Could not reach the server. Please try again.", 0);
  }

  // An expired access token is recoverable: mint a new one from the refresh
  // cookie and replay the original request once.
  if (res.status === 401 && auth && retryOnUnauthorized) {
    const renewed = await renewAccessToken();
    if (renewed) return request<T>(path, { method, body, auth, retryOnUnauthorized: false });
  }

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      payload?.message ?? "Something went wrong. Please try again.",
      res.status,
      payload?.errors,
    );
  }

  return payload.data as T;
}

/** The six things a person can register as, each stored in its own table on the backend. */
export type CategoryKey = "artist" | "dancer" | "musician" | "temple" | "dharamshala" | "mandal";

export interface UserProfileSummary {
  id: string;
  category: CategoryKey;
  /** Admin review state — a new registration stays `pending` until verified. */
  status: "pending" | "approved" | "rejected" | "blocked";
  /** False when the person submitted with required details still blank. */
  isComplete?: boolean;
  /** Keys of the required details still missing (empty when complete). */
  missing?: string[];
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: "member" | "artist" | "temple_admin" | "admin";
  /** An admin has checked this account. */
  isVerified: boolean;
  emailVerified?: boolean;
  mobileVerified?: boolean;
  isMember?: boolean;
  /** Categories this account has registered for (empty for a plain member). */
  profiles?: UserProfileSummary[];
  /** Whether the registration fee has been paid (admins never owe it). */
  registrationFee?: "paid" | "partial" | "pending";
  createdAt: string;
}

export interface AuthResult {
  user: AuthUser;
  accessToken: string;
}

export interface SignupInput {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  /** Plain sign-up path: the optional "Become a Member" checkbox. */
  becomeMember?: boolean;
  /** Registering as artist, temple, ...: the category and its own fields. */
  category?: CategoryKey;
  profile?: Record<string, unknown>;
}

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

export type SignupStage = "otp" | "details" | "pay" | "complete";

/** An unfinished signup found when someone signs in with its email and password: where to carry on, with what they entered. */
export interface SignupResume extends SignupStart {
  account: { fullName: string; email: string; mobile: string };
  becomeMember: boolean;
  details: Record<string, unknown> | null;
}

export type CodeChannel = "email" | "sms" | "both";

/** Step 1 of signup: the code has been emailed; nothing is created yet. */
export interface SignupStart {
  pendingId: string;
  /** The email with its middle hidden, e.g. gi****@gmail.com. */
  email: string;
  /** The mobile number with all but the last 4 digits hidden. */
  mobile: string;
  category: CategoryKey | null;
  /** Ways a code can be sent; sms is false until an SMS provider is connected. */
  channels: { email: boolean; sms: boolean };
  emailVerified: boolean;
  /** The screen this signup is on: verify the email, fill step 2, pay, or (already paid) create the account. */
  stage: SignupStage;
  otpMinutes: number;
  resendAfterSeconds: number;
  fee: SignupFee;
}

export interface SignupFee {
  status: "pending" | "partial" | "paid";
  total: number;
  minimum: number;
  paid: number;
  balance: number;
  nextMin: number;
  nextMax: number;
  canComplete: boolean;
}

export interface SignupOrder {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  kind: "part" | "full";
  label: string;
  prefill: { name: string; email: string; contact: string };
}

export const authApi = {
  /** Registration, in steps: start (emails a code) -> verifyOtp -> payOrder/payVerify, which creates the account. */
  signupStart: (input: SignupInput, channel: CodeChannel = "email") =>
    request<SignupStart>("/auth/signup/start", { body: { ...input, channel } }),
  signupResend: (pendingId: string, channel: CodeChannel = "email") =>
    request<{ sent: boolean; resendAfterSeconds: number }>("/auth/signup/resend", { body: { pendingId, channel } }),
  /** After the code is verified and the form is finished: saves the artist / temple / ... details. */
  signupSetProfile: (pendingId: string, profile: Record<string, unknown>) =>
    request<SignupStart>("/auth/signup/profile", { body: { pendingId, profile } }),
  signupVerifyOtp: (pendingId: string, code: string) => request<SignupStart>("/auth/signup/verify-otp", { body: { pendingId, code } }),
  signupPayOrder: (pendingId: string, amount: number) => request<SignupOrder>("/auth/signup/pay/order", { body: { pendingId, amount } }),
  signupPayVerify: (
    pendingId: string,
    payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string },
  ) => request<AuthResult>("/auth/signup/pay/verify", { body: { pendingId, ...payload } }),
  /** For someone who already paid and came back: creates the account. */
  signupComplete: (pendingId: string) => request<AuthResult>("/auth/signup/complete", { body: { pendingId } }),

  signup: (input: SignupInput) =>
    request<AuthResult>("/auth/signup", { body: input }),

  /** Either a session, or (their registration is unfinished) where to resume it. */
  login: (input: LoginInput) =>
    request<AuthResult | { resume: SignupResume }>("/auth/login", { body: input }),
  signupResume: (pendingId: string) => request<SignupResume>("/auth/signup/resume", { body: { pendingId } }),

  /** Exchanges the refresh cookie for a fresh access token. */
  refresh: () =>
    request<AuthResult>("/auth/refresh", { retryOnUnauthorized: false }),

  logout: () => request<null>("/auth/logout"),

  /**
   * Asked on the first signup step. `incomplete` is set when the email belongs
   * to someone who started a category registration and never finished it.
   */
  checkAvailability: (input: { email?: string; mobile?: string }) =>
    request<Availability>("/auth/check-availability", { body: input }),

  me: () => request<{ user: AuthUser }>("/auth/me", { method: "GET", auth: true }),
};

export interface Availability {
  emailTaken: boolean;
  mobileTaken: boolean;
  incomplete: { category: CategoryKey; missing: number } | null;
}

export type NotificationCategory = "announcement" | "event" | "update" | "seva" | "payment" | "registration" | "system";

/** A message in the signed-in user's bell: from an admin, or sent automatically (payment, review...). */
export interface SiteNotification {
  id: string;
  kind: "info" | "success" | "warning";
  category: NotificationCategory;
  title: string | null;
  message: string;
  /** A path inside the site the message's button opens. */
  link: string | null;
  createdAt: string;
  readAt: string | null;
}

export interface NotificationFeed {
  items: SiteNotification[];
  /** Pass as `before` to get the next page; null at the end. */
  nextCursor: string | null;
  unread: number;
}

export const notificationsApi = {
  unread: () => request<SiteNotification[]>("/notifications", { method: "GET", auth: true }),

  /** How many are unread; cheap enough for the bell to poll. */
  count: () => request<{ unread: number }>("/notifications/count", { method: "GET", auth: true }),

  feed: (opts: { limit?: number; before?: string | null; unread?: boolean; category?: NotificationCategory | null } = {}) => {
    const q = new URLSearchParams();
    if (opts.limit) q.set("limit", String(opts.limit));
    if (opts.before) q.set("before", opts.before);
    if (opts.unread) q.set("unread", "true");
    if (opts.category) q.set("category", opts.category);
    const qs = q.toString();
    return request<NotificationFeed>(`/notifications/feed${qs ? `?${qs}` : ""}`, { method: "GET", auth: true });
  },

  /** Marks the given messages read (every unread one when no ids are given). */
  markRead: (ids?: string[]) =>
    request<{ count: number }>("/notifications/read", { body: ids ? { ids } : {}, auth: true }),
};

/** The signed-in user's own profile in one category, exactly as stored. */
export type MyProfile = { id: string; category: CategoryKey; status: string; missingFields: string[] } & Record<string, unknown>;

export const registrationsApi = {
  /** Every category profile the signed-in user has, with full details. */
  mine: () => request<MyProfile[]>("/registrations/me", { method: "GET", auth: true }),

  /** For an account that already exists and now wants to register in a category. */
  add: (category: CategoryKey, profile: Record<string, unknown>) =>
    request<unknown>(`/registrations/${category}`, { body: profile, auth: true }),

  updateMine: (category: CategoryKey, patch: Record<string, unknown>) =>
    request<unknown>(`/registrations/me/${category}`, { method: "PATCH", body: patch, auth: true }),
};

export const uploadsApi = {
  /** Uploads one image/PDF to the backend (stored on Cloudinary) and returns its public URL. */
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<{ url: string }>("/uploads", { body: form, auth: true });
  },
};

export type DashboardProfile = {
  category: CategoryKey;
  status: string;
  isComplete: boolean;
  missing: string[];
  requiredCount: number;
  completion: number;
  data: Record<string, unknown> | null;
};

export type Dashboard = {
  account: {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    role: string;
    isVerified: boolean;
    adminVerifiedAt?: string | null;
    emailVerified: boolean;
    mobileVerified: boolean;
    isMember: boolean;
    location: string | null;
    avatarUrl: string | null;
    createdAt: string;
  };
  completion: { percent: number; missingAccount: string[] };
  profiles: DashboardProfile[];
  notifications: { unread: number; recent: { id: string; title: string | null; message: string; link: string | null; createdAt: string }[] };
  donations: { count: number; total: number; recent: { id: string; amount: number; cause: string; createdAt: string }[] };
};

export const meApi = {
  /** Everything the signed-in user's dashboard shows, in one call. */
  dashboard: () => request<Dashboard>("/me/dashboard", { method: "GET", auth: true }),
  update: (patch: { fullName?: string; location?: string | null; avatarUrl?: string | null }) =>
    request<unknown>("/me", { method: "PATCH", body: patch, auth: true }),

  /** Texts a 6-digit code to the account's mobile number. */
  sendMobileOtp: () =>
    request<{ sent?: boolean; alreadyVerified?: boolean; mobile?: string; minutes?: number; resendAfterSeconds?: number }>("/me/mobile/send-otp", {
      body: {},
      auth: true,
    }),

  /** Confirms the code; the phone is then marked verified. */
  verifyMobileOtp: (code: string) => request<{ verified: boolean }>("/me/mobile/verify-otp", { body: { code }, auth: true }),
};

export interface FeeStatus {
  /** pending = nothing paid, partial = part paid with a balance due, paid = all of it. */
  status: "pending" | "partial" | "paid";
  total: number;
  minimum: number;
  paid: number;
  balance: number;
  /** The smallest and largest amount the next payment may be. */
  nextMin: number;
  nextMax: number;
  lastPaidAt: string | null;
  receipt: string | null;
}

export interface PaymentOrder {
  orderId: string;
  /** In paise, as Razorpay Checkout wants it. */
  amount: number;
  currency: string;
  keyId: string;
  kind: "part" | "full";
  label: string;
  prefill: { name: string; email: string; contact: string };
}

export const paymentsApi = {
  me: () =>
    request<{ fee: FeeStatus; history: { id: string; plan: string; amount: number; status: string; createdAt: string }[] }>(
      "/payments/me",
      { method: "GET", auth: true },
    ),
  /** `amount` is in whole rupees, between fee.nextMin and fee.nextMax. */
  createOrder: (amount: number) => request<PaymentOrder>("/payments/registration/order", { body: { amount }, auth: true }),
  verify: (payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
    // confirming: Razorpay has not confirmed the money yet; it will show up on the profile shortly.
    request<{ fee: FeeStatus; confirming?: boolean }>("/payments/registration/verify", { body: payload, auth: true }),
};
