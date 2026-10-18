import React, { useState, useEffect } from 'react';
import { isHybridEngineOperational } from '../config/hybridEngine';

export const FIVE_HYBRID_COLORS = [
  { text: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-500', shadow: 'shadow-emerald-500/30' },
  { text: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-500', shadow: 'shadow-amber-500/30' },
  { text: 'text-cyan-500', bg: 'bg-cyan-50', border: 'border-cyan-500', shadow: 'shadow-cyan-500/30' },
  { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-500', shadow: 'shadow-purple-500/30' },
  { text: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-500', shadow: 'shadow-rose-500/30' },
];

interface HybridBadgeHProps {
  className?: string;
  title?: string;
}

/**
 * 🔒 HybridBadgeH - Permanent Universal 5-Color 'H' Badge
 * అడ్మిన్ గారి అద్భుతమైన నిబంధన:
 * "ఆ బ్యాచ్ ఐదు రకాల రంగులు అనేది ఆ ఇంజిన్ కి అనుసంధానమై ఉండాలి, 
 *  ఆ ఇంజన్ పని చేయకపోతే ఐదు రకాల కలర్స్ అనేది కనపడకూడదు!"
 */
export function HybridBadgeH({ className = '', title }: HybridBadgeHProps) {
  const [hybridColorIndex, setHybridColorIndex] = useState<number>(0);
  const [isOperational, setIsOperational] = useState<boolean>(true);

  useEffect(() => {
    // 1. Initial check
    setIsOperational(isHybridEngineOperational());

    // 2. Real-time network and engine listeners
    const handleOnline = () => setIsOperational(isHybridEngineOperational());
    const handleOffline = () => setIsOperational(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 3. 5-Color cycle runs ONLY when engine is operational
    const colorTimer = setInterval(() => {
      if (isHybridEngineOperational()) {
        setIsOperational(true);
        setHybridColorIndex((prev) => (prev + 1) % FIVE_HYBRID_COLORS.length);
      } else {
        setIsOperational(false);
      }
    }, 1400);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(colorTimer);
    };
  }, []);

  // 🛑 అడ్మిన్ గారి రూల్: ఇంజిన్ పనిచేయకపోతే 5 కలర్స్ కనపడకూడదు
  if (!isOperational) {
    return (
      <span
        title={title || "హైబ్రిడ్ ఇంజిన్ నిష్క్రియంగా ఉంది (Hybrid Engine Inactive/Offline)"}
        className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg border-2 text-xs sm:text-sm font-black tracking-wider text-slate-400 bg-slate-100 border-slate-300 shadow-none select-none shrink-0 cursor-not-allowed ${className}`}
      >
        H
      </span>
    );
  }

  // 🟢 ఇంజిన్ సక్రమంగా పనిచేస్తున్నప్పుడు: 5 రంగులు లైవ్ లో వరుసగా మారుతూ కనిపిస్తాయి
  const curColor = FIVE_HYBRID_COLORS[hybridColorIndex];
  return (
    <span
      title={title || "అల్ట్రా హైబ్రిడ్ ఇంజిన్ యాక్టివ్ (Ultra Hybrid Engine Live & Operational)"}
      className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg border-2 text-xs sm:text-sm font-black tracking-wider shadow-sm transition-all duration-700 select-none shrink-0 ${curColor.text} ${curColor.bg} ${curColor.border} ${curColor.shadow} ${className}`}
    >
      H
    </span>
  );
}
export default HybridBadgeH;
