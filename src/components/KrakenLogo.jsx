// Kraken SVG inspired by the uploaded logo — tentacles illustration style
export function KrakenLogo({ size = 60, color = 'currentColor', className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <ellipse cx="60" cy="52" rx="18" ry="22" fill={color} opacity="0.95"/>
      {/* Head dome */}
      <ellipse cx="60" cy="36" rx="14" ry="16" fill={color}/>
      {/* Eyes */}
      <circle cx="54" cy="34" r="3.5" fill="white" opacity="0.85"/>
      <circle cx="66" cy="34" r="3.5" fill="white" opacity="0.85"/>
      <circle cx="54.8" cy="34.8" r="1.8" fill={color}/>
      <circle cx="66.8" cy="34.8" r="1.8" fill={color}/>
      {/* Tentacle 1 - left curl */}
      <path d="M48 68 C38 72 28 65 24 72 C20 79 26 86 34 84 C28 88 22 96 28 100 C34 104 40 98 38 92" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Tentacle 2 - left mid */}
      <path d="M50 70 C42 78 36 76 30 82 C24 88 28 96 36 94" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Tentacle 3 - right */}
      <path d="M72 68 C82 72 92 65 96 72 C100 79 94 86 86 84 C92 88 98 96 92 100 C86 104 80 98 82 92" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Tentacle 4 - right mid */}
      <path d="M70 70 C78 78 84 76 90 82 C96 88 92 96 84 94" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Tentacle 5 - center left */}
      <path d="M54 72 C50 82 44 86 42 94 C40 102 46 108 52 104 C50 110 54 116 60 114" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Tentacle 6 - center right */}
      <path d="M66 72 C70 82 76 86 78 94 C80 102 74 108 68 104 C70 110 66 116 60 114" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Suction cups on tentacles */}
      <circle cx="34" cy="79" r="2.2" fill="white" opacity="0.5"/>
      <circle cx="28" cy="89" r="2" fill="white" opacity="0.45"/>
      <circle cx="86" cy="79" r="2.2" fill="white" opacity="0.5"/>
      <circle cx="92" cy="89" r="2" fill="white" opacity="0.45"/>
      <circle cx="45" cy="90" r="1.8" fill="white" opacity="0.4"/>
      <circle cx="75" cy="90" r="1.8" fill="white" opacity="0.4"/>
      <circle cx="42" cy="100" r="1.6" fill="white" opacity="0.35"/>
    </svg>
  )
}

// Small icon version for navbar
export function KrakenIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg className={className} width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="38" rx="16" ry="20" fill={color}/>
      <ellipse cx="50" cy="24" rx="12" ry="14" fill={color}/>
      <circle cx="44" cy="22" r="3" fill="white" opacity="0.85"/>
      <circle cx="56" cy="22" r="3" fill="white" opacity="0.85"/>
      <circle cx="44.8" cy="22.8" r="1.5" fill={color}/>
      <circle cx="56.8" cy="22.8" r="1.5" fill={color}/>
      <path d="M38 56 C28 60 20 54 16 60 C12 66 18 74 26 72 C20 76 16 82 22 86" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <path d="M40 58 C32 64 26 62 22 68 C18 74 22 80 30 78" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M62 56 C72 60 80 54 84 60 C88 66 82 74 74 72 C80 76 84 82 78 86" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <path d="M60 58 C68 64 74 62 78 68 C82 74 78 80 70 78" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M44 60 C40 70 36 74 34 82 C32 88 38 92 44 88" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M56 60 C60 70 64 74 66 82 C68 88 62 92 56 88" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <circle cx="26" cy="67" r="1.8" fill="white" opacity="0.5"/>
      <circle cx="74" cy="67" r="1.8" fill="white" opacity="0.5"/>
    </svg>
  )
}
