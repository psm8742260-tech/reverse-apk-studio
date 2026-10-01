// 💡 English: Robust Safe Storage Helper to handle sandboxed iframe environments where localStorage might throw a SecurityError.
// 💡 తెలుగు వివరణ: బ్రౌజర్ ఐఫ్రేమ్ లో లోకల్ స్టోరేజీ (localStorage) బ్లాక్ అయినప్పుడు సెక్యూరిటీ ఎర్రర్ రాకుండా కాపాడే సేఫ్ స్టోరేజ్ హెల్పర్.

class SafeStorage {
  private memoryStore: Record<string, string> = {};

  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.getItem failed for key "${key}", using memory store fallback:`, e);
      return this.memoryStore[key] || null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.setItem failed for key "${key}", using memory store fallback:`, e);
      this.memoryStore[key] = value;
    }
  }

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.removeItem failed for key "${key}", using memory store fallback:`, e);
      delete this.memoryStore[key];
    }
  }

  clear(): void {
    try {
      window.localStorage.clear();
    } catch (e) {
      console.warn('[SafeStorage] localStorage.clear failed, clearing memory store:', e);
      this.memoryStore = {};
    }
  }

  keys(): string[] {
    try {
      return Object.keys(window.localStorage);
    } catch (e) {
      console.warn('[SafeStorage] localStorage.keys failed, returning memory store keys:', e);
      return Object.keys(this.memoryStore);
    }
  }
}

export const safeStorage = new SafeStorage();
