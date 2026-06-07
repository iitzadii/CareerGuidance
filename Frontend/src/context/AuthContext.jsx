import { createContext, useContext, useEffect, useState } from "react";
import { getSession, loginUser, logoutUser, signupUser, updateUserProfile } from "../utils/auth.js";
import { apiFetch } from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const session = getSession();
      if (session) {
        try {
          const data = await apiFetch("/api/session");
          setUser(data.user);
        } catch {
          await logoutUser();
          setUser(null);
        }
      }
      setLoading(false);
    };
    verifySession();
  }, []);

  const signup = async (data) => {
    const u = await signupUser(data);
    setUser(u);
    return u;
  };

  const login = async (data) => {
    const u = await loginUser(data);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = await updateUserProfile(user.id, updates);
    if (updated) {
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
