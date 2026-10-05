import React from 'react';

interface LogoIconProps {
  className?: string;
  alt?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  className = "w-full h-full",
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 🏛️ అడ్మిన్ గారు! బ్రాండ్ ఐడెంటిటీ కోసం ఇమేజ్ ఐకాన్ స్థానంలో మన సొంత వెక్టర్ గ్రాఫిక్స్ ని శాశ్వతంగా వాడుతున్నాము. */}
      {/* Background with Dark Slate Gradient */}
      <rect width="200" height="200" rx="40" fill="url(#bg-gradient)" />
          
      {/* Outer Glowing Neon Cyan/Blue Border */}
      <rect x="10" y="10" width="180" height="180" rx="32" stroke="url(#border-glow)" strokeWidth="3" opacity="0.8" />
      <rect x="12" y="12" width="176" height="176" rx="30" stroke="#06b6d4" strokeWidth="1" opacity="0.3" filter="url(#glow-filter)" />

      {/* Cybernetic Traces / Circuit Lines */}
      <path d="M 42 55 L 68 55 L 78 68" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="42" cy="55" r="3.5" fill="#a855f7" />
      <path d="M 42 75 L 58 75 L 68 85" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="42" cy="75" r="3.5" fill="#a855f7" />
      
      <path d="M 158 55 L 132 55 L 122 68" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="158" cy="55" r="3.5" fill="#a855f7" />
      <path d="M 158 75 L 142 75 L 132 85" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="158" cy="75" r="3.5" fill="#a855f7" />

      {/* Center Neon Violet Hexagon with dual glowing borders */}
      <polygon
        points="100,42 145,68 145,118 100,144 55,118 55,68"
        stroke="#a855f7"
        strokeWidth="3.5"
        fill="#0b1528"
        fillOpacity="0.9"
        filter="url(#glow-filter)"
      />
      <polygon
        points="100,46 141,70 141,116 100,140 59,116 59,70"
        stroke="#06b6d4"
        strokeWidth="2"
        fill="none"
      />

      {/* Inner Glowing Ring with Center Pointer / Triangle Arrow */}
      <circle cx="100" cy="92" r="23" stroke="#06b6d4" strokeWidth="3.5" strokeDasharray="115" strokeDashoffset="12" />
      <line x1="86" y1="106" x2="114" y2="78" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="115,75 127,87 115,87" fill="#06b6d4" />
      <circle cx="86" cy="106" r="3.5" fill="#ffffff" stroke="#06b6d4" strokeWidth="1.5" />

      {/* Bottom Left Traces */}
      <path d="M 42 165 L 70 165 L 80 148" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="42" cy="165" r="3.5" fill="#a855f7" />

      {/* Bottom Right Traces */}
      <path d="M 158 165 L 130 165 L 120 148" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="158" cy="165" r="3.5" fill="#a855f7" />

      <line x1="32" y1="154" x2="52" y2="154" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="154" r="2.5" fill="#a855f7" />
      
      <line x1="148" y1="154" x2="168" y2="154" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="170" cy="154" r="2.5" fill="#a855f7" />

      {/* "AI MASTER" text */}
      <text
        x="100"
        y="158"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="12.5"
        fontWeight="950"
        fontFamily="sans-serif"
        letterSpacing="2"
        style={{ filter: 'drop-shadow(0px 1.5px 2px rgba(0,0,0,1))' }}
      >
        AI MASTER
      </text>

      {/* "STUDIO" pill container */}
      <rect x="58" y="167" width="84" height="15" rx="7.5" fill="#06b6d4" />
      <text
        x="100"
        y="178"
        textAnchor="middle"
        fill="#0b1528"
        fontSize="10"
        fontWeight="950"
        fontFamily="sans-serif"
        letterSpacing="2.5"
      >
        STUDIO
      </text>

      {/* Definitions for gradients and glows */}
      <defs>
        <linearGradient id="bg-gradient" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#030712" />
          <stop offset="50%" stopColor="#0b1528" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="border-glow" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};
