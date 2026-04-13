'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_PROFILE } from '@/lib/mock-data';

interface AuthContextType {
  user: typeof USER_PROFILE | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<typeof USER_PROFILE | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem('student_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = () => {
    localStorage.setItem('student_user', JSON.stringify(USER_PROFILE));
    setUser(USER_PROFILE);
  };

  const logout = () => {
    localStorage.removeItem('student_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
