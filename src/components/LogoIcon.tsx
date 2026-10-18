import React, { useState } from 'react';

export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`${className} bg-gradient-to-br from-indigo-600 to-sky-600 rounded-2xl flex items-center justify-center text-white font-black shadow-md border border-indigo-400/30`}>
        R
      </div>
    );
  }

  return (
    <img
      src="/icon-192.png?v=3.9.62"
      alt="AI Master Studio"
      onError={() => setImgError(true)}
      className={`${className} rounded-2xl object-cover shadow-lg border border-slate-200/80 bg-white`}
    />
  );
}
