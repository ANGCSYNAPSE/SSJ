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
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore the session from the httpOnly refresh cookie.
  // A 401 here just means nobody is signed in, which is not an error.
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
        if (!cancelled) tokenStore.set(null);
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
    () => ({ user, loading, signup, login, logout }),
    [user, loading, signup, login, logout],
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
