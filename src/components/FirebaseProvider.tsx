import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  db: any;
  auth: any;
  projects: any[];
  saveProject: (data: any) => Promise<void>;
  validatePasscode: (pass: string) => Promise<any>;
  bindPasscode: (id: string, module: string, duration: number) => Promise<any>;
  getGlobalConfig: () => Promise<any>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: FirebaseContextType = {
    user,
    loading,
    db,
    auth,
    projects,
    saveProject: async () => {},
    validatePasscode: async () => ({ id: 'pass_123', durationMinutes: 60 }),
    bindPasscode: async () => ({ expiresAt: Date.now() + 3600000 }),
    getGlobalConfig: async () => ({}),
    login: async () => {},
    logout: async () => {},
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
