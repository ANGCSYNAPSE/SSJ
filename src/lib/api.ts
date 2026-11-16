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
    res = await fetch(`${API_URL}/api/v1${path}`, {
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
    try {
      const renewed = await authApi.refresh();
      accessToken = renewed.accessToken;
      return request<T>(path, { method, body, auth, retryOnUnauthorized: false });
    } catch {
      accessToken = null;
    }
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
  isVerified: boolean;
  isMember?: boolean;
  /** Categories this account has registered for (empty for a plain member). */
  profiles?: UserProfileSummary[];
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

export const authApi = {
  signup: (input: SignupInput) =>
    request<AuthResult>("/auth/signup", { body: input }),

  login: (input: LoginInput) =>
    request<AuthResult>("/auth/login", { body: input }),

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

/** A message an admin sent to the signed-in user. */
export interface SiteNotification {
  id: string;
  kind: "info" | "success" | "warning";
  title: string | null;
  message: string;
  /** A path inside the site the message's button opens. */
  link: string | null;
  createdAt: string;
}

export const notificationsApi = {
  unread: () => request<SiteNotification[]>("/notifications", { method: "GET", auth: true }),

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
