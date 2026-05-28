// Logos de métodos de pago en SVG inline — sin dependencias externas

export function LogoMercadoPago({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="44" rx="8" fill="#e8e5e1"/>
      <path d="M20 18 L26 30 L32 21 L38 30 L44 18" stroke="#6B6863" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="56" y="19" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="10" fill="#6B6863" opacity="0.7" letterSpacing="0.5">MERCADO</text>
      <text x="56" y="33" fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="13" fill="#6B6863" letterSpacing="0.3">PAGO</text>
    </svg>
  )
}

const CHIP_BG = "#e8e5e1"
const CHIP_TEXT = "#6B6863"

export function LogoVisa({ height = 24 }) {
  return (
    <svg height={height} viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Anton','Inter',sans-serif" fontWeight="900" fontSize="16"
        fill={CHIP_TEXT} letterSpacing="1">VISA</text>
    </svg>
  )
}

export function LogoMastercard({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="28" rx="5" fill={CHIP_BG}/>
      <circle cx="34" cy="14" r="8" fill={CHIP_TEXT} opacity="0.35"/>
      <circle cx="46" cy="14" r="8" fill={CHIP_TEXT} opacity="0.35"/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="8"
        fill={CHIP_TEXT} letterSpacing="0.3">MC</text>
    </svg>
  )
}

export function LogoAmex({ height = 24 }) {
  return (
    <svg height={height} viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="9"
        fill={CHIP_TEXT} letterSpacing="1">AMEX</text>
    </svg>
  )
}

export function LogoOxxo({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="70" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Anton','Inter',sans-serif" fontWeight="900" fontSize="14"
        fill={CHIP_TEXT} letterSpacing="2">OXXO</text>
    </svg>
  )
}

export function LogoBBVA({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="12"
        fill={CHIP_TEXT} letterSpacing="1">BBVA</text>
    </svg>
  )
}

export function LogoBanamex({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="11"
        fill={CHIP_TEXT} letterSpacing="0.5">BANAMEX</text>
    </svg>
  )
}

export function LogoHSBC({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="13"
        fill={CHIP_TEXT} letterSpacing="1">HSBC</text>
    </svg>
  )
}

export function LogoSantander({ height = 28 }) {
  return (
    <svg height={height} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="110" height="28" rx="5" fill={CHIP_BG}/>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="10"
        fill={CHIP_TEXT} letterSpacing="0.3">SANTANDER</text>
    </svg>
  )
}
