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
  ArrowLeft
} from 'lucide-react';

interface StaffSlotData {
  id: string;
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

const DEFAULT_SLOTS: StaffSlotData[] = [
  { id: 'manager_1', role: 'MANAGER', slotNumber: 1, name: '', email: '', phone: '', isActive: false, canUpload: true, canEditCode: true },
  { id: 'manager_2', role: 'MANAGER', slotNumber: 2, name: '', email: '', phone: '', isActive: false, canUpload: true, canEditCode: false },
  { id: 'supervisor_1', role: 'SUPERVISOR', slotNumber: 1, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false },
  { id: 'supervisor_2', role: 'SUPERVISOR', slotNumber: 2, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false },
  { id: 'supervisor_3', role: 'SUPERVISOR', slotNumber: 3, name: '', email: '', phone: '', isActive: false, canUpload: false, canEditCode: false },
];

export const StaffManagementSection: React.FC<any> = ({ onBack }) => {
  const [slots, setSlots] = useState<StaffSlotData[]>(DEFAULT_SLOTS);
  const [savingSlotId, setSavingSlotId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, 'admin_config', 'staff', 'slots'), limit(5));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const serverData: Record<string, any> = {};
        snapshot.docs.forEach(docSnap => serverData[docSnap.id] = docSnap.data());
        setSlots(prev => prev.map(slot => serverData[slot.id] ? { ...slot, ...serverData[slot.id], isActive: true } : slot));
      }, (error) => {
        // 💡 తెలుగు వివరణ: ఒకవేళ అడ్మిన్ ప్యానెల్ లోపల స్టాఫ్ స్లాట్స్ లోడింగ్ లో పర్మిషన్ సమస్య వస్తే యాప్ క్రాష్ అవ్వకుండా ఇక్కడ సేఫ్‌గా హ్యాండిల్ చేస్తాము.
        console.warn("Staff slots snapshot loading error handled:", error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.error("Error subscribing to staff slots:", err);
    }
  }, []);

  const handleInputChange = (slotId: string, field: string, value: string) => {
    setSlots(prev => prev.map(slot => slot.id === slotId ? { ...slot, [field]: value } : slot));
  };

  const handleSave = async (slot: StaffSlotData) => {
    if (!slot.name || !slot.email) return alert('Name & Email required');
    setSavingSlotId(slot.id);
    try {
      await setDoc(doc(db, 'admin_config', 'staff', 'slots', slot.id), { ...slot, updatedAt: new Date().toISOString() }, { merge: true });
      alert('Saved Successfully!');
    } finally { setSavingSlotId(null); }
  };

  const handleClear = async (slot: StaffSlotData) => {
    if (!window.confirm('Clear?')) return;
    await deleteDoc(doc(db, 'admin_config', 'staff', 'slots', slot.id));
    setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, name: '', email: '', phone: '', isActive: false } : s));
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          {onBack && <button onClick={onBack} className="p-2 bg-rose-600 text-white rounded-xl"><ArrowLeft className="w-4 h-4" /></button>}
          <h3 className="text-xl font-black text-white flex items-center gap-2"><Users className="w-6 h-6 text-indigo-400" /> Staff Master Control</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.filter(s => s.role === 'MANAGER').map(mgr => (
          <div key={mgr.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-white uppercase">Manager #{mgr.slotNumber}</span>
              {mgr.isActive && <button onClick={() => handleClear(mgr)} className="text-rose-400"><Trash2 className="w-4 h-4" /></button>}
            </div>
            <input type="text" placeholder="Name" value={mgr.name} onChange={e => handleInputChange(mgr.id, 'name', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            <input type="email" placeholder="Email" value={mgr.email} onChange={e => handleInputChange(mgr.id, 'email', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-3">
                <label className="text-[10px] text-slate-400 font-bold uppercase"><input type="checkbox" checked={mgr.canUpload} onChange={() => handleInputChange(mgr.id, 'canUpload', (!mgr.canUpload).toString())} /> Up</label>
                <label className="text-[10px] text-slate-400 font-bold uppercase"><input type="checkbox" checked={mgr.canEditCode} onChange={() => handleInputChange(mgr.id, 'canEditCode', (!mgr.canEditCode).toString())} /> Code</label>
              </div>
              <button onClick={() => handleSave(mgr)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">{savingSlotId === mgr.id ? '...' : 'Save'}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slots.filter(s => s.role === 'SUPERVISOR').map(sup => (
          <div key={sup.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-black text-white uppercase block">Supervisor #{sup.slotNumber}</span>
            <input type="text" placeholder="Name" value={sup.name} onChange={e => handleInputChange(sup.id, 'name', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            <input type="email" placeholder="Email" value={sup.email} onChange={e => handleInputChange(sup.id, 'email', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
            <button onClick={() => handleSave(sup)} className="w-full bg-cyan-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Save</button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-900 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center gap-2">
        <FolderPlus className="w-6 h-6 text-slate-600" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Worker Reserve Folder (Empty)</span>
      </div>
    </div>
  );
};
