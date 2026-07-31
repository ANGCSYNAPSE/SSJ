/**
 * Thin client for the separate backend service (see `backend/`).
 * Set NEXT_PUBLIC_API_URL to the running API origin.
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

async function request<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/v1${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Could not reach the server. Please try again.", 0);
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
  role: string;
}

export interface AuthResult {
  user: AuthUser;
  accessToken: string;
}

export const authApi = {
  signup: (input: {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => request<AuthResult>("/auth/signup", input),

  login: (input: { email: string; password: string; remember?: boolean }) =>
    request<AuthResult>("/auth/login", input),
};
