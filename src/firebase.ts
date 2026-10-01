import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

let app: any = null;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.error("[Firebase-Safe] initializeApp failed:", e);
}

let auth: any = null;
try {
  if (app) {
    auth = getAuth(app);
  }
} catch (e) {
  console.error("[Firebase-Safe] getAuth failed:", e);
}

// Fallback dummy Auth object to prevent dereference errors
if (!auth) {
  auth = {
    onAuthStateChanged: (cb: any) => {
      // Return un-subscriber dummy
      const timer = setTimeout(() => cb(null), 100);
      return () => clearTimeout(timer);
    },
    currentUser: null,
    signInWithPopup: () => Promise.reject(new Error("Auth is unavailable")),
    signOut: () => Promise.resolve()
  } as any;
}

let db: any = null;
try {
  if (app) {
    // Initialize with auto-detect long-polling to prevent 10s WebSocket connection timeout warnings
    const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
    db = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true
    }, dbId !== '(default)' ? dbId : undefined);
  }
} catch (e) {
  try {
    if (app) {
      db = getFirestore(app);
    }
  } catch (err2) {
    console.warn("[Firebase-Safe] getFirestore fallback initialized:", err2);
  }
}

export { app, auth, db };
