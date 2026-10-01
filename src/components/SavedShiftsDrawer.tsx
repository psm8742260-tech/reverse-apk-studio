import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { X, FolderOpen, Clipboard, Zap, History, Search } from 'lucide-react';

interface SavedShiftsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onApplyToActiveFile: (codeContent: string) => void;
}

export const SavedShiftsDrawer: React.FC<SavedShiftsDrawerProps> = ({
  isOpen,
  onClose,
  userId,
  onApplyToActiveFile
}) => {
  const [vaultItems, setVaultItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVault = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/shifts/vault/list?userId=${userId}`);
      setVaultItems(res.data.items || []);
    } catch (err) {
      console.error('Vault fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVault();
    }
  }, [isOpen, userId]);

  const filteredItems = vaultItems.filter(item => 
    (item.name || item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.type || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[120] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-black text-lg">Saved Shifts Vault</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cloud Sync Active</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="వాల్ట్‌లో వెతకండి (Search Saved Shifts...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition"
                />
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                  <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-bold text-slate-500 text-sm">వాల్ట్ లోడ్ అవుతోంది...</p>
                </div>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="group bg-white border border-slate-100 hover:border-indigo-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-black text-slate-900 group-hover:text-indigo-600 transition">{item.name || item.title || 'Untitled Shift'}</h5>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-black text-slate-500 rounded-md uppercase tracking-wider">
                            {item.type || 'ASSET'}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                            <History className="w-3 h-3" />
                            {item.savedAt ? new Date(item.savedAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-2 rounded-xl">
                        <Zap className="w-4 h-4 text-indigo-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(item.content);
                          alert('కోడ్ కాపీ చేయబడింది!');
                        }}
                        className="flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition"
                      >
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy Code
                      </button>
                      <button 
                        onClick={() => { onApplyToActiveFile(item.content); onClose(); }}
                        className="flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-100"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Apply File
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center opacity-40">
                  <FolderOpen className="w-16 h-16 mb-4 text-slate-300" />
                  <p className="font-black text-slate-400">వాల్ట్ ఖాళీగా ఉంది.</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">ఏవైనా కోడ్ స్నిప్పెట్లను సేవ్ చేస్తే ఇక్కడ కనిపిస్తాయి.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">AI Master Studio Vault v1.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
