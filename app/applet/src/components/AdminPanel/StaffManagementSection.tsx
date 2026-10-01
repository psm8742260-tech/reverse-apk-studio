import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  limit 
} from 'firebase/firestore';
import { 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Mail, 
  Phone, 
  Save, 
  Trash2, 
  FolderPlus, 
  ArrowLeft,
  Lock
} from 'lucide-react';

// 📋 5 స్టాఫ్ స్లాట్ల డేటా మోడల్
interface StaffSlotData {
  id: string; // manager_1, manager_2, supervisor_1, supervisor_2, supervisor_3
  role: 'MANAGER' | 'SUPERVISOR';
  slotNumber: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  canUpload: boolean;
  canEditCode: boolean;
  updatedAt?: string;
}

interface Props {
  userEmail?: string;
  onBack?: () => void;
}

// 🏛️ స్థిరమైన 5 స్లాట్లు (2 మేనేజర్లు + 3 సూపర్‌వైజర్లు)
const DEFAULT_SLOTS: StaffSlotData[] = [
  { id: 'manager_1', role: 'MANAGER', slotNumber: 1, name: '', email: '', phone: '', isActive: false, canUpload: true, canEditCode: true },
  { id: 'manager_2', role: 'MANAGER', slotNumber: 2, name: '', email: '', phone: '', isActive: false, canUpload: true, canEditCode: false },
  { id: 'supervisor_1', role: 'SUPERVISOR', slotNumber: 1, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false },
  { id: 'supervisor_2', role: 'SUPERVISOR', slotNumber: 2, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false },
  { id: 'supervisor_3', role: 'SUPERVISOR', slotNumber: 3, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false },
];

export const StaffManagementSection: React.FC<Props> = ({ userEmail, onBack }) => {
  const [slots, setSlots] = useState<StaffSlotData[]>(DEFAULT_SLOTS);
  const [savingSlotId, setSavingSlotId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ id: string; text: string; type: 'success' | 'error' } | null>(null);

  // 1. ఫైర్‌బేస్ నుండి డేటాను లోడ్ చేయడం
  useEffect(() => {
    try {
      const q = query(collection(db, 'admin_config', 'staff', 'slots'), limit(5));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const serverData: Record<string, any> = {};
        snapshot.docs.forEach(docSnap => {
          serverData[docSnap.id] = docSnap.data();
        });

        setSlots(prev => prev.map(slot => {
          if (serverData[slot.id]) {
            return {
              ...slot,
              ...serverData[slot.id],
              isActive: Boolean(serverData[slot.id].email)
            };
          }
          return slot;
        }));
      }, (err) => {
        console.warn("Staff snapshot warning:", err);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Snapshot setup skipped:", e);
    }
  }, []);

  // 2. ఇన్‌పుట్ మార్పులు
  const handleInputChange = (slotId: string, field: 'name' | 'email' | 'phone', value: string) => {
    setSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return { ...slot, [field]: value };
      }
      return slot;
    }));
  };

  // 3. పర్మిషన్ మార్పులు
  const handleTogglePermission = (slotId: string, field: 'canUpload' | 'canEditCode') => {
    setSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return { ...slot, [field]: !slot[field] };
      }
      return slot;
    }));
  };

  // 4. సేవ్ చేయడం
  const handleSaveSlot = async (slot: StaffSlotData) => {
    if (!slot.name.trim() || !slot.email.trim()) {
      setSaveMessage({ id: slot.id, text: 'పేరు & ఇమెయిల్ అవసరం', type: 'error' });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    try {
      setSavingSlotId(slot.id);
      const docRef = doc(db, 'admin_config', 'staff', 'slots', slot.id);
      
      const payload = {
        id: slot.id,
        role: slot.role,
        slotNumber: slot.slotNumber,
        name: slot.name.trim(),
        email: slot.email.trim().toLowerCase(),
        phone: slot.phone.trim(),
        isActive: true,
        canUpload: slot.canUpload,
        canEditCode: slot.canEditCode,
        updatedAt: new Date().toISOString()
      };

      await setDoc(docRef, payload, { merge: true });
      setSaveMessage({ id: slot.id, text: 'సేవ్ అయ్యింది!', type: 'success' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.error("Save slot error:", err);
      setSaveMessage({ id: slot.id, text: 'విఫలమైంది', type: 'error' });
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSavingSlotId(null);
    }
  };

  // 5. క్లియర్ చేయడం
  const handleClearSlot = async (slot: StaffSlotData) => {
    if (!window.confirm(`${slot.role} #${slot.slotNumber} వివరాలు క్లియర్ చేయాలా?`)) return;

    try {
      setSavingSlotId(slot.id);
      const docRef = doc(db, 'admin_config', 'staff', 'slots', slot.id);
      await deleteDoc(docRef);

      setSlots(prev => prev.map(s => {
        if (s.id === slot.id) {
          return { ...s, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false };
        }
        return s;
      }));

      setSaveMessage({ id: slot.id, text: 'క్లియర్ అయ్యింది', type: 'success' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.error("Clear slot error:", err);
    } finally {
      setSavingSlotId(null);
    }
  };

  const managers = slots.filter(s => s.role === 'MANAGER');
  const supervisors = slots.filter(s => s.role === 'SUPERVISOR');
  const activeCount = slots.filter(s => s.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-400" />
              Staff Access Master Control (5 Boards)
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              ఇద్దరు మేనేజర్లు మరియు ముగ్గురు సూపర్‌వైజర్ల కోసం లైవ్ బోర్డులు.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
            {activeCount} / 5 Active Staff
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest">Managers (2 Slots)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {managers.map(mgr => (
            <div key={mgr.id} className={`bg-slate-900 border rounded-2xl p-4 space-y-3 ${mgr.isActive ? 'border-indigo-500 ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-950/40' : 'border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xs">M{mgr.slotNumber}</div>
                  <span className="text-sm font-black text-white">Manager #{mgr.slotNumber}</span>
                </div>
                {mgr.isActive && (
                  <button onClick={() => handleClearSlot(mgr)} className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
              <div className="space-y-2.5">
                <input type="text" placeholder="Name (పేరు)" value={mgr.name} onChange={(e) => handleInputChange(mgr.id, 'name', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
                <input type="email" placeholder="Gmail Address" value={mgr.email} onChange={(e) => handleInputChange(mgr.id, 'email', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
                <input type="tel" placeholder="Phone Number" value={mgr.phone} onChange={(e) => handleInputChange(mgr.id, 'phone', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={mgr.canUpload} onChange={() => handleTogglePermission(mgr.id, 'canUpload')} className="w-4 h-4 accent-indigo-600 rounded" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={mgr.canEditCode} onChange={() => handleTogglePermission(mgr.id, 'canEditCode')} className="w-4 h-4 accent-indigo-600 rounded" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edit Code</span>
                  </label>
                </div>
                <button onClick={() => handleSaveSlot(mgr)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-4 py-2 rounded-xl text-[10px] shadow-lg active:scale-95 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" /> SAVE SLOT
                </button>
              </div>
              {saveMessage?.id === mgr.id && (
                <div className={`text-[10px] font-bold p-1.5 rounded text-center ${saveMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {saveMessage.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-cyan-500" />
          <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest">Supervisors (3 Slots)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supervisors.map(sup => (
            <div key={sup.id} className={`bg-slate-900 border rounded-2xl p-4 space-y-3 ${sup.isActive ? 'border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/40' : 'border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xs">S{sup.slotNumber}</div>
                  <span className="text-sm font-black text-white">Supervisor #{sup.slotNumber}</span>
                </div>
                {sup.isActive && (
                  <button onClick={() => handleClearSlot(sup)} className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
              <div className="space-y-2.5">
                <input type="text" placeholder="Name" value={sup.name} onChange={(e) => handleInputChange(sup.id, 'name', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" />
                <input type="email" placeholder="Gmail Address" value={sup.email} onChange={(e) => handleInputChange(sup.id, 'email', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" />
              </div>
              <button onClick={() => handleSaveSlot(sup)} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-2.5 rounded-xl text-[10px] shadow-lg active:scale-95 flex items-center justify-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> SAVE SUPERVISOR
              </button>
              {saveMessage?.id === sup.id && (
                <div className={`text-[10px] font-bold p-1.5 rounded text-center ${saveMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {saveMessage.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-900 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
        <FolderPlus className="w-8 h-8 text-indigo-400/50" />
        <div>
          <h5 className="text-xs font-black text-white uppercase tracking-widest">Worker Reserve Folder</h5>
          <p className="text-[10px] text-slate-500 font-bold max-w-[250px]">
            ఈ ఫోల్డర్ లోపల ఉన్న డేటా అంతా తొలగించబడింది. భవిష్యత్తు కోసం పూర్తిగా ఖాళీగా ఉంచబడింది.
          </p>
        </div>
      </div>

      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
        <Lock className="w-4 h-4 text-amber-500" />
        <p className="text-[10px] text-amber-200/70 font-bold uppercase tracking-tight">Security Mode: Admin Credentials Required for Deletion</p>
      </div>
    </div>
  );
};
