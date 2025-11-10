import { createContext, useContext, useMemo, useState } from 'react';
import { api, setAccessToken } from '../services/api';

type User = { id: string; email: string; firstName: string; lastName: string; role: 'user' | 'admin' };
type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (d: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value = useMemo<AuthContextValue>(() => ({
    user,
    async login(email, password) {
      const r = await api.post('/auth/login', { email, password });
      setAccessToken(r.data.accessToken);
      setUser(r.data.user);
    },
    async register(d) {
      const r = await api.post('/auth/register', d);
      setAccessToken(r.data.accessToken);
      setUser(r.data.user);
    },
    async logout() {
      await api.post('/auth/logout');
      setAccessToken(undefined);
      setUser(null);
    }
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

