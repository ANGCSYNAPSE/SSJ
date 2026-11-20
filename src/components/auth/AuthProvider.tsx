"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  authApi,
  tokenStore,
  SESSION_EXPIRED_EVENT,
  type AuthResult,
  type AuthUser,
  type SignupResume,
  type LoginInput,
  type SignupInput,
} from "@/lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  /** True until the initial session restore settles. */
  loading: boolean;
  signup: (input: SignupInput) => Promise<AuthUser>;
  /** Signs in with a result the signup steps already returned (the account was just created). */
  adopt: (result: AuthResult) => void;
  login: (input: LoginInput) => Promise<AuthUser>;
  /** Signs in with a Google ID token; see GoogleOutcome for the other things that can happen. */
  loginWithGoogle: (credential: string, remember?: boolean) => Promise<GoogleOutcome>;
  logout: () => Promise<void>;
  /** Re-reads the signed-in user (e.g. after finishing a profile, so its completeness is current). */
  refreshUser: () => Promise<void>;
}

/** What signing in with Google led to. */
export type GoogleOutcome =
  | { kind: "signedIn" }
  | { kind: "resume"; resume: SignupResume }
  | { kind: "new"; account: { credential: string; fullName: string; email: string } };

/** Thrown by login() when the email and password belong to a signup that was never finished (no account yet). */
export class SignupInProgress extends Error {
  constructor(readonly resume: SignupResume) {
    super("Your registration is not finished yet.");
  }
}

/** Where the login page leaves an unfinished signup for the signup page to pick up. */
export const RESUME_KEY = "ssj-resume-signup";

const AuthContext = createContext<AuthContextValue | null>(null);

/** Marks a fresh sign-in, so the header can point the new user to their profile (not on a plain reload). */
export const WELCOME_KEY = "ssj-welcome";
function flagWelcome() {
  try {
    window.sessionStorage.setItem(WELCOME_KEY, "1");
  } catch {
    /* storage blocked: skip the hint */
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Starts true: until the saved session has been checked, the app can't tell
  // "signed out" from "not known yet", so it shows a loading state instead of
  // flashing the signed-out header and bouncing people off guarded pages.
  const [loading, setLoading] = useState(true);

  // Bring back the session after a reload from the httpOnly refresh cookie.
  useEffect(() => {
    let cancelled = false;
    authApi
      .refresh()
      .then((result) => {
        if (cancelled) return;
        tokenStore.set(result.accessToken);
        setUser(result.user);
      })
      .catch(() => {
        // No cookie, or it has expired: simply not signed in.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    const result = await authApi.signup(input);
    flagWelcome();
    tokenStore.set(result.accessToken);
    setUser(result.user);
    return result.user;
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const result = await authApi.login(input);
    if ("resume" in result) throw new SignupInProgress(result.resume);
    flagWelcome();
    tokenStore.set(result.accessToken);
    setUser(result.user);
    return result.user;
  }, []);

  const loginWithGoogle = useCallback(async (credential: string, remember = true): Promise<GoogleOutcome> => {
    const result = await authApi.google(credential, remember);
    if ("resume" in result) return { kind: "resume", resume: result.resume };
    if ("newAccount" in result) return { kind: "new", account: { ...result.newAccount, credential } };
    flagWelcome();
    tokenStore.set(result.accessToken);
    setUser(result.user);
    return { kind: "signedIn" };
  }, []);

  const adopt = useCallback((result: AuthResult) => {
    flagWelcome();
    tokenStore.set(result.accessToken);
    setUser(result.user);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { user: fresh } = await authApi.me();
      setUser(fresh);
    } catch {
      // Keep what we have; the next page load restores the session anyway.
    }
  }, []);

  // The refresh cookie ran out (or the account was signed out elsewhere): leave the signed-in state.
  useEffect(() => {
    const onExpired = () => {
      tokenStore.set(null);
      setUser(null);
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, []);

  const logout = useCallback(async () => {
    // Clear locally even if the network call fails — the user asked to leave.
    try {
      await authApi.logout();
    } finally {
      tokenStore.set(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, signup, adopt, login, loginWithGoogle, logout, refreshUser }),
    [user, loading, signup, adopt, login, loginWithGoogle, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return context;
}
