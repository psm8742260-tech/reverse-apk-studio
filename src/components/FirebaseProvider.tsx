import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import studioConfig from '../studio_config.json';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  setDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  saveProject: (project: any) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  getGlobalConfig: () => Promise<any>;
  savePasscode: (passcodeData: any) => Promise<void>;
  validatePasscode: (passcode: string) => Promise<any | null>;
  bindPasscode: (passcodeId: string, moduleName: string, durationMinutes: number) => Promise<any>;
  projects: any[];
  wallet: { balanceINR: number } | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [wallet, setWallet] = useState<{ balanceINR: number } | null>(null);

  useEffect(() => {
    // Safety timeout: If Firebase doesn't respond in 10 seconds, force stop loading
    const timer = setTimeout(() => {
      setLoading(prev => {
        if (prev) {
          console.warn("Firebase initialization taking longer than expected. Proceeding with caution.");
          return false;
        }
        return prev;
      });
    }, 10000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(timer);
      setUser(user);
      setLoading(false);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.projects) {
            setProjects(data.projects);
          }
        }
      } catch (e) {
        console.warn("Projects server fetch error:", e);
      }
    };

    fetchProjects();
    const interval = setInterval(fetchProjects, 10000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setWallet(null);
      return;
    }

    const fetchWallet = async () => {
      try {
        const res = await fetch(`/api/user/wallet?userId=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setWallet(data.wallet || { balanceINR: 0 });
        }
      } catch (e) {
        console.warn("Wallet server fetch error:", e);
      }
    };

    fetchWallet();
  }, [user]);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("User closed the login popup.");
      } else {
        console.error("Login Error:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const saveProject = async (project: any) => {
    try {
      if (!user) {
        console.warn("No user logged in, cannot save project.");
        return;
      }
      
      const projectId = project.id || `proj_${Date.now()}`;
      const projectData = {
        ...project,
        id: projectId,
        ownerId: user.uid,
        updatedAt: new Date().toISOString()
      };

      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (res.ok) {
        setProjects(prev => {
          const idx = prev.findIndex(p => p.id === projectId);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = projectData;
            return updated;
          }
          return [projectData, ...prev];
        });
      }
    } catch (err) {
      console.error("saveProject error:", err);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      if (!user) return;
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
      }
    } catch (err) {
      console.error("deleteProject error:", err);
    }
  };

  const getGlobalConfig = async () => {
    try {
      const configRef = doc(db, 'config', 'global');
      // Race getDoc with a 2.5s timeout for fast offline fallback
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore timeout')), 2500)
      );
      const configSnap = await Promise.race([getDoc(configRef), timeoutPromise]) as any;
      if (configSnap && configSnap.exists()) {
        return configSnap.data();
      }
    } catch (err) {
      console.warn("getGlobalConfig using local fallback config due to offline/network state:", err);
    }
    // Fallback default config from studio_config.json
    return {
      upiId: (studioConfig as any).payment?.upi_id || '8466062260@axl',
      businessName: (studioConfig as any).payment?.business_name || 'AI Master Studio',
      publishingDomain: (studioConfig as any).endpoints?.publishing_domain || 'apps.aimasterstudio.com',
      serviceCharges: {
        apkRepair: (studioConfig as any).payment?.charges?.apk_repair || 500,
        zipDownload: (studioConfig as any).payment?.charges?.zip_download || 200,
        liveUrl: (studioConfig as any).payment?.charges?.live_url || 300,
        folderDownload: (studioConfig as any).payment?.charges?.folder_download || 100,
        ratePerMinute: 2
      },
      devBypassEnabled: (studioConfig as any).admin?.dev_bypass_enabled || true
    };
  };

  const savePasscode = async (passcodeData: any) => {
    try {
      // Note: ownerId might be null if not logged in, but we allow it for guest checkout
      const data = {
        ...passcodeData,
        ownerId: user?.uid || null,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'passcodes'), data);
    } catch (err) {
      console.error("savePasscode error:", err);
    }
  };

  const validatePasscode = async (passcode: string) => {
    try {
      // Find passcode that is UNBOUND
      const { getDocs } = await import('firebase/firestore');
      const q = query(collection(db, 'passcodes'), where('passcode', '==', passcode), where('status', '==', 'UNBOUND'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } catch (err) {
      console.error("validatePasscode error:", err);
      return null;
    }
  };

  const bindPasscode = async (passcodeId: string, moduleName: string, durationMinutes: number) => {
    try {
      const passcodeRef = doc(db, 'passcodes', passcodeId);
      const now = new Date();
      const expiresAt = new Date(now.getTime() + durationMinutes * 60000);
      
      const updateData = {
        status: 'BOUND',
        boundModule: moduleName,
        activatedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(passcodeRef, updateData);
      return { activatedAt: now.getTime(), expiresAt: expiresAt.getTime() };
    } catch (err) {
      console.error("bindPasscode error:", err);
      throw err;
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, login, logout, saveProject, deleteProject, getGlobalConfig, savePasscode, validatePasscode, bindPasscode, projects, wallet }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
