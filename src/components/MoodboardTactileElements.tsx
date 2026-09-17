import React from 'react';

/**
 * Washi Tape Component
 * Directly inspired by the Robin moodboard & Sticker Mockup moodboard:
 * Semi-translucent masking tape with torn jagged edges and subtle paper texture.
 */
export const WashiTape: React.FC<{
  className?: string;
  variant?: 'frosted' | 'amber' | 'cyan' | 'sage' | 'orange';
  angle?: number;
}> = ({ className = '', variant = 'frosted', angle = -2 }) => {
  const colorStyles = {
    frosted: 'bg-[#F2F2ED]/85 border-[#E2E2DC]/70 text-neutral-800',
    amber: 'bg-[#FDE68A]/80 border-[#FCD34D]/80 text-amber-950',
    cyan: 'bg-[#BAE6FD]/80 border-[#7DD3FC]/80 text-sky-950',
    sage: 'bg-[#BBF7D0]/75 border-[#86EFAC]/80 text-emerald-950',
    orange: 'bg-[#FED7AA]/85 border-[#FDBA74]/80 text-orange-950',
  }[variant];

  return (
    <div
      className={`pointer-events-none select-none z-20 h-6 px-4 py-0.5 inline-flex items-center justify-center text-[10px] font-mono tracking-widest uppercase backdrop-blur-[1.5px] shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${colorStyles} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        clipPath: 'polygon(0% 0%, 5% 4%, 0% 8%, 4% 14%, 0% 20%, 3% 28%, 0% 36%, 4% 44%, 0% 52%, 3% 60%, 0% 68%, 4% 76%, 0% 84%, 3% 92%, 0% 100%, 100% 100%, 96% 92%, 100% 84%, 97% 76%, 100% 68%, 96% 60%, 100% 52%, 97% 44%, 100% 36%, 96% 28%, 100% 20%, 97% 14%, 100% 8%, 96% 4%, 100% 0%)',
      }}
      aria-hidden="true"
    />
  );
};

/**
 * Notebook Binder Perforations (Left Margin)
 * Inspired by Mockup Design/Stickers & Robin notebook paper binding:
 * Subtle punched holes / binding ticks along the folder spine.
 */
export const NotebookBinderMargin: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none select-none flex flex-col justify-around py-4 opacity-40 dark:opacity-20 ${className}`}
      aria-hidden="true"
    >
      {[...Array(14)].map((_, i) => (
        <div key={i} className="flex items-center gap-1 my-2">
          {/* Perforated slot / punch hole */}
          <div className="w-3.5 h-1.5 rounded-full bg-neutral-900/40 dark:bg-neutral-100/40 border border-neutral-900/30" />
          <div className="w-1.5 h-[1px] bg-neutral-900/30" />
        </div>
      ))}
    </div>
  );
};

/**
 * Scalloped Die-Cut Stamp Badge (Robin mood board)
 * Features the signature scalloped/perforated postal stamp edge.
 */
export const ScallopedStampBadge: React.FC<{
  children: React.ReactNode;
  color?: 'yellow' | 'green' | 'blue' | 'pink' | 'neutral';
  className?: string;
}> = ({ children, color = 'neutral', className = '' }) => {
  const colorMap = {
    yellow: 'bg-[#FEF08A] text-amber-950 border-amber-300',
    green: 'bg-[#BBF7D0] text-emerald-950 border-emerald-300',
    blue: 'bg-[#BFDBFE] text-blue-950 border-blue-300',
    pink: 'bg-[#FBCFE8] text-pink-950 border-pink-300',
    neutral: 'bg-white text-neutral-900 border-neutral-300',
  }[color];

  return (
    <span
      className={`relative inline-flex items-center px-3 py-1 text-[11px] font-mono font-medium uppercase tracking-wider rounded-sm border shadow-xs transition-transform duration-150 hover:scale-105 ${colorMap} ${className}`}
      style={{
        boxShadow: '1px 1px 0px rgba(0,0,0,0.15)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 mr-1.5 shrink-0" />
      {children}
    </span>
  );
};

/**
 * Barcode & Ticket Stub Detail
 * Inspired by Mockup Design / STICKERS ticket stubs (Marca da bollo, 600 DPI scan details):
 * Non-intrusive decorative stamp with fine barcode lines and serial stamp.
 */
export const BarcodeTicketStamp: React.FC<{
  serial?: string;
  className?: string;
}> = ({ serial = 'NO. 4578-00087', className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-white/95 border border-neutral-300 rounded shadow-2xs font-mono text-[9px] text-neutral-600 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Mini Barcode Linework */}
      <svg className="w-12 h-4 text-neutral-800 shrink-0" viewBox="0 0 48 16" fill="currentColor">
        <rect x="0" y="0" width="2" height="16" />
        <rect x="3" y="0" width="1" height="16" />
        <rect x="5" y="0" width="3" height="16" />
        <rect x="9" y="0" width="1" height="16" />
        <rect x="11" y="0" width="2" height="16" />
        <rect x="15" y="0" width="4" height="16" />
        <rect x="20" y="0" width="1" height="16" />
        <rect x="23" y="0" width="2" height="16" />
        <rect x="26" y="0" width="1" height="16" />
        <rect x="29" y="0" width="3" height="16" />
        <rect x="33" y="0" width="2" height="16" />
        <rect x="37" y="0" width="1" height="16" />
        <rect x="40" y="0" width="3" height="16" />
        <rect x="45" y="0" width="2" height="16" />
      </svg>
      <span className="tracking-widest uppercase font-semibold">{serial}</span>
    </div>
  );
};

/**
 * Watercolor Rolling Hills & Meadow Backdrop
 * Directly inspired by the Keerthana Ravichandran moodboard:
 * Soft, painterly layered hill gradients and atmospheric horizon behind the 3D character.
 */
export const WatercolorHillsBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Soft Sky Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EBF3FC]/60 via-[#F3F7FA]/40 to-transparent" />

      <svg
        className="absolute bottom-0 inset-x-0 w-full h-[65%] min-h-[160px] overflow-visible"
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Back distant rolling hill gradient */}
          <linearGradient id="hill-back" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C9DCBE" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A8C49A" stopOpacity="0.7" />
          </linearGradient>

          {/* Middle hill gradient */}
          <linearGradient id="hill-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9BBF89" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7DA867" stopOpacity="0.8" />
          </linearGradient>

          {/* Front meadow hillock */}
          <linearGradient id="hill-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6C9754" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#557F40" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Back Hill Layer */}
        <path
          d="M-20 120 Q120 70 260 100 T520 85 L520 200 L-20 200 Z"
          fill="url(#hill-back)"
        />

        {/* Middle Hill Layer */}
        <path
          d="M-20 145 Q80 105 210 135 T480 115 L520 120 L520 200 L-20 200 Z"
          fill="url(#hill-mid)"
        />

        {/* Foreground Meadow Ridge */}
        <path
          d="M-10 165 Q130 130 270 155 Q400 175 510 145 L510 200 L-10 200 Z"
          fill="url(#hill-front)"
        />

        {/* Wildflower & Grass Stipple specks */}
        <circle cx="80" cy="170" r="2" fill="#FEF08A" opacity="0.8" />
        <circle cx="120" cy="180" r="1.8" fill="#FFFFFF" opacity="0.85" />
        <circle cx="190" cy="165" r="2.2" fill="#FBCFE8" opacity="0.75" />
        <circle cx="240" cy="185" r="1.6" fill="#FEF08A" opacity="0.9" />
        <circle cx="310" cy="175" r="2" fill="#FFFFFF" opacity="0.85" />
        <circle cx="380" cy="168" r="1.7" fill="#FBCFE8" opacity="0.8" />
        <circle cx="430" cy="182" r="2.1" fill="#FEF08A" opacity="0.85" />
      </svg>
    </div>
  );
};
