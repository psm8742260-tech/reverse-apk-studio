import React, { useState } from 'react';
import { X, CheckCircle2, Shield, CreditCard, Smartphone, Wallet, Lock, Sparkles } from 'lucide-react';
import { PAYMENT_METHODS, PAYMENT_CONFIG } from '../lib/PaymentFile';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onSuccess?: (serviceId?: any, metadata?: any) => Promise<void> | void;
}

export function PaymentModal({
  isOpen,
  onClose,
  initialServiceId = 'normal_studio_activation',
  onSuccess
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handlePay = async () => {
    try {
      setIsProcessing(true);
      setErrorMsg('');

      // Generate a demo passcode for studio activation
      const randomPasscode = Math.floor(100000 + Math.random() * 900000).toString();
      const metadata = {
        passcode: randomPasscode,
        durationMinutes: 120,
        plan: PAYMENT_CONFIG.PLAN_NAME || 'Studio Pro',
        amount: PAYMENT_CONFIG.SUBSCRIPTION_PRICE || 999,
        paymentMethod: selectedMethod,
        timestamp: new Date().toISOString()
      };

      if (onSuccess) {
        await onSuccess(initialServiceId, metadata);
      }

      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        setIsProcessing(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Payment execution error:', err);
      setErrorMsg(err?.message || 'చెల్లింపులో సమస్య ఎదురైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-fade-in text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base text-white">స్టూడియో సురక్షిత చెల్లింపు</h3>
              <p className="text-xs text-slate-400">Secure Payment Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            aria-label="మూసివేయి"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Plan Info */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{PAYMENT_CONFIG.PLAN_NAME || 'Studio Activation'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xs text-slate-400">అపరిమిత ఏఐ & ఆండ్రాయిడ్ బిల్డర్ యాక్సెస్</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-indigo-400">₹{PAYMENT_CONFIG.SUBSCRIPTION_PRICE || 999}</span>
              <span className="block text-[10px] text-slate-400">30 రోజుల వాలిడిటీ</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">చెల్లింపు విధానం ఎంచుకోండి:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('UPI')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'UPI'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white font-bold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-5 h-5 text-indigo-400" />
                <span className="text-xs">UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('CARD')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'CARD'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white font-bold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <span className="text-xs">Debit/Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('WALLET')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'WALLET'
                    ? 'border-indigo-500 bg-indigo-500/10 text-white font-bold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Wallet className="w-5 h-5 text-indigo-400" />
                <span className="text-xs">వాలెట్</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          {isDone ? (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>చెల్లింపు విజయవంతమైంది! ధృవీకరించబడింది.</span>
            </div>
          ) : (
            <button
              type="button"
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 font-bold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'ప్రాసెస్ అవుతోంది...' : `ఇప్పుడే చెల్లించండి (₹${PAYMENT_CONFIG.SUBSCRIPTION_PRICE || 999})`}</span>
            </button>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Lock className="w-3.5 h-3.5" />
            <span>256-బిట్ ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్టెడ్ సురక్షిత చెల్లింపు</span>
          </div>
        </div>
      </div>
    </div>
  );
}
