/**
 * Client for the separate backend service (see `backend/`).
 *
 * The access token is held in memory only — never localStorage — so a XSS bug
 * cannot exfiltrate a long-lived credential. Across reloads the session is
 * restored from the httpOnly refresh cookie via `authApi.refresh()`.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

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
  method?: "GET" | "POST";
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
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/v1${path}`, {
      method,
      headers,
      credentials: "include",
      body: body === undefined ? undefined : JSON.stringify(body),
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

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: "member" | "artist" | "temple_admin" | "admin";
  isVerified: boolean;
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

  me: () => request<{ user: AuthUser }>("/auth/me", { method: "GET", auth: true }),
};
