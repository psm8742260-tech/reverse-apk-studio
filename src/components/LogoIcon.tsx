import React from 'react';

export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold`}>
      R
    </div>
  );
}
