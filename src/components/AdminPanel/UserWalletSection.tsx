import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collectionGroup, query, getDocs, doc, updateDoc, setDoc, getDoc, collection } from 'firebase/firestore';
import { Wallet, Search, TrendingUp, CreditCard, Clock, CheckCircle2, ArrowLeft, Calendar } from 'lucide-react';

interface Props {
  onBack?: () => void;
}

import { WALLET_PRESETS, adminUpdateUserBalance, calculateWalletRevenueStats } from '../../lib/PaymentFile';

export const UserWalletSection: React.FC<Props> = ({ onBack }) => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [updateAmount, setUpdateAmount] = useState<string>('0');

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      // Note: This requires a collectionGroup index in Firebase
      const q = query(collectionGroup(db, 'wallets'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        path: doc.ref.path, // e.g. users/uid/wallets/balance
        userId: doc.ref.parent.parent?.id,
        ...doc.data()
      }));
      setWallets(data);

      const tq = query(collection(db, 'wallet_transactions'));
      const ts = await getDocs(tq);
      const tdata = ts.docs.map(d => d.data()).filter(t => t.type === 'CREDIT').sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setTransactions(tdata);
    } catch (err) {
      console.warn('Query failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBalance = async () => {
    if (!selectedWallet || !updateAmount) return;
    try {
      // 🏛️ కోడింగ్ అంతా PaymentFile లోకి తరలించబడింది
      const newBalance = await adminUpdateUserBalance(
        selectedWallet.path, 
        selectedWallet.balanceINR || 0, 
        parseFloat(updateAmount)
      );
      
      alert('✅ Balance Updated Successfully!');
      setSelectedWallet({ ...selectedWallet, balanceINR: newBalance });
      fetchWallets();
      setUpdateAmount('0');
    } catch (err: any) {
      alert('❌ Update Failed: ' + err.message);
    }
  };

  const filteredWallets = wallets.filter(w => 
    w.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 💡 తెలుగు వివరణ: రోజువారీగా ఆదాయ చరిత్రను (ఈరోజు ఎంత వచ్చింది, నిన్న ఎంత వచ్చింది, ఈ నెల ఎంత వచ్చింది) సులభంగా లెక్క కట్టే కాలిక్యులేషన్స్ ఇప్పుడు కేంద్రీకృత పేమెంట్ ఫైల్ (PaymentFile.ts) నుండి పిలవబడుతోంది
  const { todayAmount, yesterdayAmount, thisMonthAmount } = calculateWalletRevenueStats(transactions);

  return (
    <div 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onBack?.();
      }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all mr-2"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">User Credit Wallets</h4>
            <p className="text-[10px] text-slate-400 font-bold">Monitor and recharge user AI tokens.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shadow-inner">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-black text-slate-300">SYSTEM TOTAL: ₹{wallets.reduce((acc, curr) => acc + (curr.balanceINR || 0), 0).toFixed(2)}</span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text"
          placeholder="Search by User ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-200 outline-none focus:border-purple-500 transition-all shadow-inner"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet List */}
        <div className="lg:col-span-2 space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {loading ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-900 rounded-2xl" />)}
            </div>
          ) : filteredWallets.length === 0 ? (
            <div className="py-12 text-center bg-slate-950/50 rounded-3xl border border-dashed border-slate-800">
              <p className="text-xs text-slate-500 font-bold">No active wallets found matching search.</p>
            </div>
          ) : (
            filteredWallets.map(wallet => (
              <button
                key={wallet.userId}
                onClick={() => setSelectedWallet(wallet)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${selectedWallet?.userId === wallet.userId ? 'bg-purple-600/10 border-purple-500/50 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-400 border border-slate-800">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white truncate w-48">{wallet.userId}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Status: {wallet.isRechargeActive ? 'ACTIVE' : 'EXPIRED'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-400">₹{wallet.balanceINR?.toFixed(2)}</p>
                  <p className="text-[9px] text-slate-500 font-bold">{new Date(wallet.lastUpdated).toLocaleDateString()}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Action Panel */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6">
          {selectedWallet ? (
            <>
              <div>
                <h5 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" /> Recharge User
                </h5>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 mb-6">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Target User</p>
                  <p className="text-xs font-mono text-slate-300 break-all">{selectedWallet.userId}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">Recharge Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black">₹</span>
                      <input 
                        type="number"
                        value={updateAmount}
                        onChange={(e) => setUpdateAmount(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-lg font-black text-white outline-none focus:border-emerald-500 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {WALLET_PRESETS.map(val => (
                      <button 
                        key={val}
                        onClick={() => setUpdateAmount(val.toString())}
                        className="bg-slate-900 hover:bg-slate-850 text-[10px] font-black text-slate-400 py-2 rounded-lg border border-slate-800 transition-colors"
                      >
                        +₹{val}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleUpdateBalance}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    CONFIRM RECHARGE
                  </button>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3 text-slate-500">
                  <Clock className="w-4 h-4" />
                  <p className="text-[10px] font-bold">Last Recharge: {selectedWallet.lastUpdated ? new Date(selectedWallet.lastUpdated).toLocaleString() : 'Never'}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 text-slate-700">
                <CreditCard className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400">Select a wallet to perform actions</p>
                <p className="text-[10px] text-slate-600 font-bold mt-1">Updates are applied instantly to user account.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recharge History Section */}
      <div className="mt-8 bg-slate-950 rounded-3xl border border-slate-800 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-xs font-black text-white uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" /> Recharge History & Income Auditor
            </h4>
            <p className="text-[10px] text-slate-500 font-bold mt-1">ట్రాన్సాక్షన్స్ హిస్టరీ మరియు రోజువారీ ఆదాయ గణాంకాలు (Daily Revenue Analytics)</p>
          </div>
        </div>

        {/* 📊 అడ్మిన్ గారు! రోజువారీ ఆదాయ చరిత్ర మరియు తేదీల వారీ కలెక్షన్లను సులభంగా ట్రాక్ చేసుకునేలా ఇక్కడ 3-కార్డుల అద్భుతమైన ఫైనాన్షియల్ డ్యాష్‌బోర్డ్ గ్రిడ్ అమర్చాము */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-inner">
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight">Today's Total Income</p>
              <p className="text-[9px] text-emerald-500 font-bold mt-0.5">ఈరోజు మొత్తం వచ్చిన ఆదాయం</p>
            </div>
            <p className="text-xl font-black text-emerald-400 mt-2">₹{todayAmount.toFixed(2)}</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-inner">
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight">Yesterday's Total Income</p>
              <p className="text-[9px] text-purple-400 font-bold mt-0.5">నిన్నటి మొత్తం వచ్చిన ఆదాయం</p>
            </div>
            <p className="text-xl font-black text-purple-400 mt-2">₹{yesterdayAmount.toFixed(2)}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-inner">
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight">This Month's Revenue</p>
              <p className="text-[9px] text-blue-500 font-bold mt-0.5">ఈ నెల మొత్తం వచ్చిన ఆదాయం</p>
            </div>
            <p className="text-xl font-black text-blue-400 mt-2">₹{thisMonthAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {transactions.length === 0 ? (
            <div className="py-8 text-center bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
              <p className="text-xs text-slate-500 font-bold">No recent recharges found in the system.</p>
            </div>
          ) : (
            transactions.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-emerald-500 border border-emerald-900/30">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white truncate w-32 md:w-64">{t.userEmail || 'Unknown User'}</p>
                    <p className="text-[10px] text-slate-500 font-bold tracking-tight">{new Date(t.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-400">+₹{t.amount?.toFixed(2)}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">CREDIT</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
