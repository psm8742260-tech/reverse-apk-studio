import React, { useState } from 'react';
import { Smartphone, CreditCard, ShieldCheck, Zap, AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PAYMENT_CONFIG } from '../lib/PaymentFile';

interface Props {
  onSuccess: () => void;
  userEmail?: string;
}

export const RechargeGate: React.FC<Props> = ({ onSuccess, userEmail }) => {
  const [step, setStep] = useState<'PLANS' | 'PAYMENT' | 'VERIFYING'>('PLANS');
  const [selectedPlan, setSelectedPlan] = useState<{id: string, name: string, price: number} | null>(null);

  const plans = [
    { 
      id: 'MONTHLY', 
      name: PAYMENT_CONFIG.PLAN_NAME, 
      price: PAYMENT_CONFIG.SUBSCRIPTION_PRICE, 
      duration: `${PAYMENT_CONFIG.VALIDITY_DAYS} Days`, 
      features: PAYMENT_CONFIG.FEATURES 
    },
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setStep('PAYMENT');
  };

  const handlePaymentSuccess = () => {
    setStep('VERIFYING');
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 'PLANS' && (
            <motion.div 
              key="plans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/20 shadow-2xl mb-4">
                  <Zap className="w-8 h-8 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Activate Your Studio</h2>
                <p className="text-sm text-slate-400 font-medium">ముందుగా రిఛార్జ్ చేసి అద్భుతమైన ఫీచర్లను అన్‌లాక్ చేయండి.</p>
              </div>

              <div className="space-y-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 text-left transition-all hover:bg-slate-800/80 group active:scale-[0.98] relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start relative z-10">
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-white">{plan.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black bg-indigo-500 text-white px-2 py-0.5 rounded uppercase tracking-tighter">
                            {plan.duration}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-indigo-400">₹{plan.price}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 relative z-10">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] text-slate-400 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  గమనిక: పేమెంట్ పూర్తయిన వెంటనే మీ అకౌంట్ యాక్టివేట్ అవుతుంది మరియు లాగిన్ పేజీకి వెళ్తారు.
                </p>
              </div>
            </motion.div>
          )}

          {step === 'PAYMENT' && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setStep('PLANS')} className="text-slate-400 hover:text-white transition">
                  <AlertCircle className="w-6 h-6 rotate-180" />
                </button>
                <h3 className="text-lg font-black text-white">Secure Checkout</h3>
                <div className="w-6" />
              </div>

              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center space-y-4">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Scan QR to Pay</p>
                <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto shadow-xl">
                  <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-900" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-white">₹{selectedPlan?.price}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Plan: {selectedPlan?.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20">
                    <CreditCard className="w-5 h-5 text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">UPI / Bank Transfer</p>
                    <p className="text-[10px] text-slate-500">Auto-verification active</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              <button
                onClick={handlePaymentSuccess}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Verify Payment
              </button>
            </motion.div>
          )}

          {step === 'VERIFYING' && (
            <motion.div 
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                <CheckCircle2 className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">Verifying Transaction...</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Please do not close the app</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-4 text-slate-500">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-slate-600" />
          SSL Secure
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-800" />
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
          <Smartphone className="w-4 h-4 text-slate-600" />
          PWA Mode
        </div>
      </div>
    </div>
  );
};
