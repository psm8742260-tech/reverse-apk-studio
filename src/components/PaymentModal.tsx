import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, CheckCircle2, ShieldCheck, Zap, AlertCircle, Clock, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from './FirebaseProvider';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (serviceId: string, metadata?: any) => void;
  initialServiceId?: string;
}

import { PAYMENT_CONFIG, SERVICE_CHARGES, generatePasscode, deductWalletBalance, createServicePasscode } from '../lib/PaymentFile';

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialServiceId
}) => {
  const { getGlobalConfig, savePasscode } = useFirebase();
  const [config, setConfig] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBypass, setShowBypass] = useState(false);
  const [step, setStep] = useState<'SELECT' | 'TIME' | 'PAY'>('SELECT');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [duration, setDuration] = useState(60); // default 60 mins

  useEffect(() => {
    if (!isOpen) {
      setStep('SELECT');
      return;
    }
    
    getGlobalConfig().then(cfg => {
      setConfig(cfg);
      if (initialServiceId) {
        if (initialServiceId === 'normal_studio_activation') {
           setSelectedService({ id: 'normal_studio_activation', name: 'Normal Studio Module Activation', icon: Key, color: 'indigo' });
           setStep('TIME');
           return;
        }
        if (cfg?.serviceCharges) {
          const services = getServices(cfg);
          const found = services.find(s => s.id === initialServiceId);
          if (found) {
            setSelectedService(found);
            setStep('PAY');
            return;
          }
        }
      }
      setStep('SELECT');
    }).catch(err => {
      console.error('Error fetching global config:', err);
    });
  }, [initialServiceId, isOpen]);

  const getServices = (cfg: any) => [
    { id: 'apk_repair', name: 'APK Repair & Fix Service', amount: SERVICE_CHARGES.APK_REPAIR, icon: ShieldCheck, color: 'indigo' },
    { id: 'zip_download', name: 'Full ZIP Source Code Export', amount: SERVICE_CHARGES.ZIP_DOWNLOAD, icon: Zap, color: 'amber' },
    { id: 'live_url', name: 'Live Hosting Preview URL', amount: SERVICE_CHARGES.LIVE_URL, icon: Zap, color: 'sky' },
    { id: 'folder_download', name: 'Individual Folder Download', amount: SERVICE_CHARGES.FOLDER_DOWNLOAD, icon: ShieldCheck, color: 'emerald' },
  ];

  if (!isOpen || !config) return null;

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    if (service.id === 'normal_studio_activation') {
      setStep('TIME');
    } else {
      setStep('PAY');
    }
  };

  const perMinRate = SERVICE_CHARGES.RATE_PER_MINUTE;
  const calculatedAmount = selectedService?.id === 'normal_studio_activation' ? duration * perMinRate : selectedService?.amount;

  const upiUrl = selectedService ? `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(config.businessName)}&am=${calculatedAmount}&cu=INR&tn=${encodeURIComponent(selectedService.name)}` : '';

  const handleFinalSuccess = async () => {
    setIsProcessing(true);
    let metadata = {};
    
    if (selectedService.id === 'normal_studio_activation') {
      const passcode = generatePasscode('NS');
      metadata = { passcode, durationMinutes: duration };
      
      // 🏛️ కోడింగ్ అంతా PaymentFile లోకి తరలించబడింది
      try {
        await createServicePasscode('anonymous', duration, passcode);
      } catch (err) {
        console.error('Error saving passcode to Firebase:', err);
      }
    }

    setTimeout(async () => {
      try {
        setIsProcessing(false);
        await onSuccess(selectedService.id, metadata);
        onClose();
      } catch (err) {
        console.error('onSuccess callback error:', err);
        onClose();
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      
      <AnimatePresence mode="wait">
        {!isProcessing ? (
          <motion.div 
            key={step}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white text-center relative">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold">
                {step === 'SELECT' ? 'సర్వీస్ ప్లాన్ ఎంచుకోండి' : 
                 step === 'TIME' ? 'యాక్టివేషన్ సమయం ఎంచుకోండి' :
                 'సురక్షితమైన పేమెంట్'}
              </h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">యాప్ స్టూడియో సర్వీసెస్ (App Studio Services)</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'SELECT' ? (
                <div className="space-y-3">
                  {getServices(config).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${service.color}-100 text-${service.color}-600`}>
                          <service.icon size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{service.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            {service.id === 'normal_studio_activation' ? 'టైమ్-బేస్డ్ ప్లాన్' : 'వన్-టైమ్ సర్వీస్ ఛార్జ్'}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        {service.id === 'normal_studio_activation' ? `₹${perMinRate}/Min` : `₹${service.amount}`}
                      </div>
                    </button>
                  ))}
                  <p className="text-[10px] text-center text-slate-400 mt-4 uppercase font-bold tracking-widest">కొనసాగడానికి ఒక ప్లాన్ ని ఎంచుకోండి</p>
                </div>
              ) : step === 'TIME' ? (
                <div className="space-y-6">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                         <Clock size={32} />
                      </div>
                      <div className="text-center">
                         <h3 className="font-bold text-slate-900">ఎంత సమయం కావాలి?</h3>
                         <p className="text-xs text-slate-500">మీరు ఎంచుకున్న సమయం ముగియగానే మాడ్యూల్ ఆటోమేటిక్ గా లాక్ అవుతుంది.</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="600" 
                        value={duration} 
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>1 నిమిషం</span>
                        <span>10 గంటలు</span>
                      </div>

                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
                         <div>
                            <div className="text-[10px] font-bold text-indigo-400 uppercase">మొత్తం సమయం</div>
                            <div className="text-xl font-black text-indigo-900">
                               {duration >= 60 ? `${Math.floor(duration/60)} గం ${duration%60} ని` : `${duration} నిమిషాలు`}
                            </div>
                         </div>
                         <div className="text-right">
                            <div className="text-[10px] font-bold text-indigo-400 uppercase">అమౌంట్ (₹{perMinRate}/min)</div>
                            <div className="text-2xl font-black text-indigo-900">₹{calculatedAmount}</div>
                         </div>
                      </div>
                   </div>

                   <button 
                     onClick={() => setStep('PAY')}
                     className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition"
                   >
                     పేమెంట్ కి వెళ్ళండి (Proceed to Pay)
                   </button>
                   
                   <button 
                     onClick={() => setStep('SELECT')}
                     className="w-full text-xs text-slate-400 font-bold hover:text-slate-600 transition"
                   >
                     వెనక్కి వెళ్ళండి
                   </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-inner">
                    <QRCodeSVG 
                      value={upiUrl} 
                      size={180} 
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 rounded-xl border border-indigo-100">
                      <span className="text-indigo-600 font-medium">సర్వీస్: {selectedService.name}</span>
                      <span className="text-indigo-900 font-bold text-lg">₹{calculatedAmount}</span>
                    </div>

                    <div className="text-slate-500 text-[10px] leading-relaxed">
                      QR కోడ్ ని స్కాన్ చేసి పేమెంట్ పూర్తి చేయండి. పేమెంట్ చేసిన తర్వాత వెరిఫై బటన్ నొక్కండి.
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                       <button 
                        onClick={handleFinalSuccess}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg active:scale-95"
                       >
                         <Zap className="w-5 h-5 text-amber-400" />
                         పేమెంట్ వెరిఫై చేయండి
                       </button>

                       <button 
                        onClick={() => setStep(selectedService.id === 'normal_studio_activation' ? 'TIME' : 'SELECT')}
                        className="text-xs text-slate-400 font-bold hover:text-slate-600 transition"
                       >
                         ప్లాన్ మార్చుకోండి (Change Plan)
                       </button>
                       
                       {/* Hidden Dev Bypass Button */}
                       {config.devBypassEnabled && (
                         <button 
                          onDoubleClick={() => setShowBypass(!showBypass)}
                          className="text-[10px] text-slate-200 mt-2 hover:text-slate-400 transition mx-auto"
                         >
                           Admin Control v1.0.4
                         </button>
                       )}

                       {showBypass && config.devBypassEnabled && (
                         <motion.button 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          onClick={handleFinalSuccess}
                          className="w-full py-2 bg-rose-500 text-white rounded-xl text-xs font-black tracking-widest hover:bg-rose-600 transition flex items-center justify-center gap-2"
                         >
                           <AlertCircle className="w-4 h-4" />
                           DEV BYPASS (6606.OK)
                         </motion.button>
                       )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-3xl flex flex-col items-center text-center shadow-2xl"
          >
            <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h3 className="text-xl font-bold text-slate-900">పేమెంట్ వెరిఫై అవుతోంది...</h3>
            <p className="text-slate-500 mt-2">UPI గేట్‌వే కి కనెక్ట్ అవుతున్నాము</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
