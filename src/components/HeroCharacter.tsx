import React from 'react';

export const HeroCharacter: React.FC = () => {
  return (
    <div className="relative aspect-[2/3] w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[440px] h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] xl:h-[560px] mx-auto select-none overflow-hidden bg-neutral-50 rounded-2xl border border-neutral-200 shadow-xl group">
      {/* Subtle atmospheric gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none z-0" />
      
      {/* Minimal hairline geometric corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-neutral-400 pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-neutral-400 pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-neutral-400 pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-neutral-400 pointer-events-none z-10" />

      {/* Frame indicator badge */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-200 shadow-xs backdrop-blur-sm z-10 pointer-events-none">
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-600">KR · 3D INTERACTIVE</span>
      </div>

      <iframe
        src="/Home/CH_HERO.html"
        title="Hero character animation"
        className="absolute inset-0 w-full h-full border-0 bg-transparent z-[2]"
      />

      {/* Vignette overlay at base for seamless visual blending */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-50 via-neutral-50/50 to-transparent pointer-events-none z-10" />
    </div>
  );
};


