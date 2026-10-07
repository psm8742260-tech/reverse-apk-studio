import React, { useState } from 'react';
import { Wallet, ArrowLeft, ArrowUpRight, ArrowDownLeft, Shield, Sparkles, CreditCard } from 'lucide-react';

interface UserWalletSectionProps {
  onBack?: () => void;
}

export function UserWalletSection({ onBack }: UserWalletSectionProps) {
  const [balance, setBalance] = useState<number>(2500);

  const transactions = [
    { id: 'tx-1', desc: 'స్టూడియో క్రెడిట్ రీఛార్జ్ (Studio Recharge)', amount: '+ ₹1,000', type: 'credit', date: 'ఈరోజు, 11:30 AM' },
    { id: 'tx-2', desc: 'క్లౌడ్ APK బిల్డ్ కన్వర్షన్ (Cloud APK Build)', amount: '- ₹50', type: 'debit', date: 'నిన్న, 4:15 PM' },
    { id: 'tx-3', desc: 'బ్రహ్మాస్త్రం ఏఐ అల్ట్రా రిపేర్ (Brahmastram AI)', amount: '- ₹100', type: 'debit', date: 'నిన్న, 2:00 PM' }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
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
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">వినియోగదారు వాలెట్ & క్రెడిట్స్ (User Wallet)</h3>
            <p className="text-xs text-slate-400">
              స్టూడియో నిధులు, ఏఐ క్రెడిట్స్ మరియు లావాదేవీల చరిత్రను నిర్వహించండి.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>VERIFIED LEDGER</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">ప్రస్తుత బ్యాలెన్స్</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white">₹{balance.toLocaleString()}</span>
            <span className="text-xs text-slate-400">INR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">ఏఐ విచారణలు & క్లౌడ్ బిల్డ్స్ కొరకు యాక్టివ్</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setBalance(prev => prev + 500)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all"
          >
            <CreditCard className="w-4 h-4" />
            <span>క్రెడిట్స్ రీఛార్జ్ చేయండి (+₹500)</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700/60">
          <h4 className="text-sm font-bold text-white">ఇటీవలి లావాదేవీలు (Recent Transactions)</h4>
        </div>

        <div className="divide-y divide-slate-700/40">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tx.type === 'credit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{tx.desc}</h5>
                  <span className="text-[11px] text-slate-400">{tx.date}</span>
                </div>
              </div>

              <span className={`text-xs font-bold font-mono ${tx.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
