import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, getDocs, deleteDoc, doc, collectionGroup } from 'firebase/firestore';
import { useFirebase } from '../FirebaseProvider';
import { Search, Trash2, Code, Layout, Box, Globe, ExternalLink, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SavedShift {
  shiftId: string;
  projectId: string;
  shiftSource: 'REVERSE_APK' | 'NAVBAR_MODULE';
  itemType: 'SMALI_CODE' | 'XML_LAYOUT' | '3D_ICON_ASSET' | 'LIVE_URL_CONTEXT';
  title: string;
  contentData: string;
  targetFilePath?: string;
  savedAt: string;
}

interface Props {
  onBack?: () => void;
}

export const ShiftVaultSection: React.FC<Props> = ({ onBack }) => {
  const { user } = useFirebase();
  const [shifts, setShifts] = useState<SavedShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShift, setSelectedShift] = useState<SavedShift | null>(null);

  useEffect(() => {
    fetchShifts();
  }, [user]);

  const fetchShifts = async () => {
    setLoading(true);
    try {
      const shiftsData: SavedShift[] = [];
      const seenIds = new Set<string>();

      // Admin Panel: Fetch ALL saved shifts from all users using collectionGroup
      const q = query(collectionGroup(db, 'saved_shifts'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((document) => {
        const data = document.data();
        const shiftId = document.id || data.id || data.shiftId || '';
        if (!shiftId || seenIds.has(shiftId)) return;
        seenIds.add(shiftId);

        const rawType = data.itemType || data.type || 'CODE_SNIPPET';
        const mappedShift: SavedShift = {
          shiftId,
          projectId: data.projectId || data.id || 'N/A',
          shiftSource: data.shiftSource || 'NAVBAR_MODULE',
          itemType: (rawType === 'LIVE_URL' ? 'LIVE_URL_CONTEXT' : rawType) as any,
          title: data.title || data.name || 'Untitled Segment',
          contentData: data.contentData || data.content || '',
          targetFilePath: data.targetFilePath || '',
          savedAt: data.savedAt || new Date().toISOString(),
          // Optional: Store the parent path to know who saved it
          ownerPath: document.ref.path
        } as any;
        shiftsData.push(mappedShift);
      });

      setShifts(shiftsData.sort((a, b) => {
        const timeA = a.savedAt ? new Date(a.savedAt).getTime() : 0;
        const timeB = b.savedAt ? new Date(b.savedAt).getTime() : 0;
        return timeB - timeA;
      }));
    } catch (error) {
      console.error('Error fetching shifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shiftId: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, 'users', 'anonymous', 'saved_shifts', shiftId));
      if (user && user.uid && user.uid !== 'anonymous') {
        await deleteDoc(doc(db, 'users', user.uid, 'saved_shifts', shiftId));
      }
      setShifts(prev => prev.filter(s => s.shiftId !== shiftId));
      if (selectedShift?.shiftId === shiftId) setSelectedShift(null);
    } catch (error) {
      console.error('Error deleting shift:', error);
    }
  };

  const filteredShifts = shifts.filter(s => 
    (s.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.projectId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'SMALI_CODE': return <Code className="w-4 h-4 text-amber-400" />;
      case 'XML_LAYOUT': return <Layout className="w-4 h-4 text-sky-400" />;
      case '3D_ICON_ASSET': return <Box className="w-4 h-4 text-emerald-400" />;
      case 'LIVE_URL_CONTEXT':
      case 'LIVE_URL': return <Globe className="w-4 h-4 text-purple-400" />;
      default: return <Code className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onBack?.();
      }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all mr-2"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search vault items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-purple-500 transition-all outline-none"
            />
          </div>
        </div>
        <button 
          onClick={fetchShifts}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-slate-300"
          title="Refresh"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest">Loading Vault...</p>
            </div>
          ) : filteredShifts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 bg-slate-950/50 rounded-3xl border border-dashed border-slate-800">
              <Box className="w-10 h-10 mb-4 opacity-20" />
              <p className="text-sm font-medium">Vault is empty.</p>
              <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50 mt-1">Save items from Reverse APK Studio to see them here.</p>
            </div>
          ) : (
            filteredShifts.map((shift) => (
              <motion.div
                key={shift.shiftId}
                layoutId={shift.shiftId}
                onClick={() => setSelectedShift(shift)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                  selectedShift?.shiftId === shift.shiftId 
                    ? 'bg-purple-600/10 border-purple-500/50 ring-1 ring-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-inner border border-slate-800 group-hover:border-slate-700">
                      {getItemIcon(shift.itemType)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{shift.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{String(shift.itemType || 'CODE_SNIPPET').replace(/_/g, ' ')}</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span className="text-[9px] font-bold text-slate-600">{new Date(shift.savedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(shift.shiftId);
                    }}
                    className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {selectedShift ? (
              <motion.div
                key={selectedShift.shiftId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-6 h-full flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      {getItemIcon(selectedShift.itemType)}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">{selectedShift.title}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Project ID: {selectedShift.projectId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition shadow-sm">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-4 font-mono text-[11px] overflow-auto custom-scrollbar relative">
                  <div className="absolute top-3 right-3 text-[9px] font-black uppercase text-slate-600 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
                    {selectedShift.itemType}
                  </div>
                  <pre className="text-slate-300 leading-relaxed">
                    {selectedShift.contentData}
                  </pre>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(selectedShift.contentData);
                      window.dispatchEvent(new CustomEvent('INJECT_VAULT_CODE', { detail: selectedShift.contentData }));
                      alert('✅ Code Copied & Ready to Inject!');
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-black py-3 rounded-2xl transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest"
                  >
                    Inject into Studio
                  </button>
                  <button 
                    onClick={() => {
                      const blob = new Blob([selectedShift.contentData], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = selectedShift.title;
                      a.click();
                    }}
                    className="px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-black py-3 rounded-2xl transition-all shadow-md active:scale-95 text-xs uppercase tracking-widest"
                  >
                    Export
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-slate-950/30 border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-8 text-center min-h-[400px]">
                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center mb-4 border border-slate-800 shadow-inner">
                  <Search className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest opacity-50">Select an item to view details</p>
                <p className="text-[10px] font-medium max-w-[200px] mt-2 leading-relaxed italic">
                  Quickly review saved code snippets, layouts, or 3D assets before shifting them to the IDE.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
