// Decorative perfume bottle SVG icons for floating background elements
export function BottleClassic({ size = 40, opacity = 0.18, color = '#1a3a52' }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="2" width="8" height="6" rx="2" fill={color} opacity={opacity}/>
      <rect x="14" y="7" width="12" height="4" rx="1" fill={color} opacity={opacity}/>
      <path d="M10 16 C10 12 14 11 20 11 C26 11 30 12 30 16 L32 48 C32 52 28 56 20 56 C12 56 8 52 8 48 Z" fill={color} opacity={opacity}/>
      <rect x="12" y="22" width="16" height="2" rx="1" fill="white" opacity={opacity * 0.8}/>
      <rect x="12" y="28" width="16" height="8" rx="1" fill="white" opacity={opacity * 0.5}/>
    </svg>
  )
}

export function BottleRound({ size = 40, opacity = 0.18, color = '#1a3a52' }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="17" y="2" width="6" height="8" rx="3" fill={color} opacity={opacity}/>
      <rect x="13" y="9" width="14" height="3" rx="1.5" fill={color} opacity={opacity}/>
      <ellipse cx="20" cy="36" rx="16" ry="18" fill={color} opacity={opacity}/>
      <ellipse cx="16" cy="30" rx="4" ry="6" fill="white" opacity={opacity * 0.6}/>
    </svg>
  )
}

export function BottleTall({ size = 30, opacity = 0.15, color = '#1a3a52' }) {
  return (
    <svg width={size} height={size * 2.2} viewBox="0 0 30 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="1" width="6" height="10" rx="3" fill={color} opacity={opacity}/>
      <rect x="9" y="10" width="12" height="3" rx="1" fill={color} opacity={opacity}/>
      <rect x="6" y="13" width="18" height="50" rx="4" fill={color} opacity={opacity}/>
      <rect x="9" y="20" width="12" height="2" rx="1" fill="white" opacity={opacity * 0.7}/>
      <rect x="9" y="26" width="12" height="12" rx="2" fill="white" opacity={opacity * 0.4}/>
    </svg>
  )
}

export function SprayBottle({ size = 44, opacity = 0.15, color = '#1a3a52' }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="22" height="34" rx="5" fill={color} opacity={opacity}/>
      <path d="M14 20 L6 16 L6 10 L14 10 Z" fill={color} opacity={opacity}/>
      <rect x="4" y="8" width="10" height="4" rx="2" fill={color} opacity={opacity}/>
      <path d="M3 6 L2 4 M6 5 L5 2 M9 5 L10 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity * 1.5}/>
      <rect x="17" y="22" width="13" height="2" rx="1" fill="white" opacity={opacity * 0.7}/>
      <rect x="17" y="28" width="13" height="8" rx="2" fill="white" opacity={opacity * 0.4}/>
    </svg>
  )
}

export function Sparkle({ size = 20, opacity = 0.25, color = '#1a3a52' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z" fill={color} opacity={opacity}/>
    </svg>
  )
}

export function DropIcon({ size = 16, opacity = 0.2, color = '#1a3a52' }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1 C8 1 2 8 2 13 C2 16.3 4.7 19 8 19 C11.3 19 14 16.3 14 13 C14 8 8 1 8 1Z" fill={color} opacity={opacity}/>
    </svg>
  )
}
