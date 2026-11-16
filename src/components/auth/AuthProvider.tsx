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
  type AuthUser,
  type LoginInput,
  type SignupInput,
} from "@/lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  /** True until the initial session restore settles. */
  loading: boolean;
  signup: (input: SignupInput) => Promise<AuthUser>;
  login: (input: LoginInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  /** Re-reads the signed-in user (e.g. after finishing a profile, so its completeness is current). */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

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
    tokenStore.set(result.accessToken);
    setUser(result.user);
    return result.user;
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const result = await authApi.login(input);
    tokenStore.set(result.accessToken);
    setUser(result.user);
    return result.user;
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { user: fresh } = await authApi.me();
      setUser(fresh);
    } catch {
      // Keep what we have; the next page load restores the session anyway.
    }
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
    () => ({ user, loading, signup, login, logout, refreshUser }),
    [user, loading, signup, login, logout, refreshUser],
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
