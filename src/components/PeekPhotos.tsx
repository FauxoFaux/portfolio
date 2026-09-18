import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  defaultRotate: number;
  hoverRotate: number;
  zIndex: number;
}

// Re-ordered photos with varied contrast, tone, and visual rhythm
const PHOTOS: PhotoItem[] = [
  {
    id: 'ph2',
    src: '/Home/Ph2.JPG',
    alt: 'Photo 2',
    defaultRotate: -4.5,
    hoverRotate: -1,
    zIndex: 1,
  },
  {
    id: 'ph4',
    src: '/Home/Ph4.png',
    alt: 'Photo 4',
    defaultRotate: 3.5,
    hoverRotate: 1,
    zIndex: 2,
  },
  {
    id: 'ph1',
    src: '/Home/Ph1.jpg',
    alt: 'Photo 1',
    defaultRotate: -2.5,
    hoverRotate: 0,
    zIndex: 3,
  },
  {
    id: 'ph5',
    src: '/Home/Ph5.png',
    alt: 'Photo 5',
    defaultRotate: 4,
    hoverRotate: 1.5,
    zIndex: 4,
  },
  {
    id: 'ph3',
    src: '/Home/Ph3.png',
    alt: 'Photo 3',
    defaultRotate: -3.5,
    hoverRotate: -0.5,
    zIndex: 5,
  },
  {
    id: 'ph6',
    src: '/Home/Ph6.png',
    alt: 'Photo 6',
    defaultRotate: 3,
    hoverRotate: 0.5,
    zIndex: 6,
  },
];

type ScreenTier = 'mobile-sm' | 'mobile' | 'mobile-lg' | 'tablet' | 'desktop';

export function PeekPhotos() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [screenTier, setScreenTier] = useState<ScreenTier>('desktop');
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(mq.matches);
      const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 360) {
        setScreenTier('mobile-sm');
      } else if (w < 460) {
        setScreenTier('mobile');
      } else if (w < 640) {
        setScreenTier('mobile-lg');
      } else if (w < 1024) {
        setScreenTier('tablet');
      } else {
        setScreenTier('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dismiss lifted photo on mobile when tapping outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const container = document.getElementById('peek-photos-container');
      if (container && !container.contains(e.target as Node)) {
        setHoveredId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, []);

  // When hovered/tapped, lift up just enough so the full polaroid pops cleanly above the section boundary to show the full image
  const liftDistance =
    screenTier === 'mobile-sm'
      ? -38
      : screenTier === 'mobile'
      ? -46
      : screenTier === 'mobile-lg'
      ? -58
      : screenTier === 'tablet'
      ? -92
      : -130;

  return (
    <div
      id="peek-photos-container"
      className="relative z-10 w-full max-w-[1400px] mx-auto px-2 min-[380px]:px-4 sm:px-8 mt-2 sm:mt-10 md:mt-12 -mb-[34px] min-[360px]:-mb-[40px] min-[400px]:-mb-[46px] min-[480px]:-mb-[56px] sm:-mb-[76px] md:-mb-[96px] lg:-mb-[118px] xl:-mb-[138px] select-none overflow-x-clip"
    >
      {/* Mobile tap helper badge */}
      <div className="flex justify-center items-center gap-1.5 mb-2 sm:hidden text-white/85 font-mono text-[11px] tracking-wider uppercase pointer-events-none">
        <span>Tap photo to view</span>
      </div>

      <div className="flex justify-center items-end -space-x-2 min-[360px]:-space-x-2.5 min-[420px]:-space-x-3.5 sm:-space-x-5 md:-space-x-6 lg:-space-x-8 xl:-space-x-10 pointer-events-none">
        {PHOTOS.map((photo) => {
          const isHovered = hoveredId === photo.id;

          return (
            <motion.div
              key={photo.id}
              id={`peek-photo-${photo.id}`}
              className="relative shrink-0 pointer-events-auto cursor-pointer origin-bottom touch-manipulation focus:outline-none"
              role="button"
              tabIndex={0}
              aria-label={photo.alt}
              style={{
                zIndex: isHovered ? 35 : photo.zIndex,
              }}
              initial={false}
              animate={{
                y: isHovered ? liftDistance : 0,
                rotate: isHovered ? photo.hoverRotate : photo.defaultRotate,
                scale: isHovered ? (screenTier.startsWith('mobile') ? 1.03 : 1.06) : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 26,
                mass: 0.7,
              }}
              onMouseEnter={canHover ? () => setHoveredId(photo.id) : undefined}
              onMouseLeave={canHover ? () => setHoveredId((current) => (current === photo.id ? null : current)) : undefined}
              onClick={(e) => {
                e.stopPropagation();
                setHoveredId((current) => (current === photo.id ? null : photo.id));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setHoveredId((current) => (current === photo.id ? null : photo.id));
                }
              }}
            >
              {/* Slim, crisp white border polaroid-style frame */}
              <div
                className={`bg-white p-1 sm:p-1.5 md:p-2 rounded-[3px] sm:rounded-md md:rounded-lg border border-[#DFE7EF] transition-shadow duration-300 ${
                  isHovered
                    ? 'shadow-[0_22px_44px_-6px_rgba(0,0,0,0.35),0_12px_24px_-4px_rgba(0,0,0,0.2)]'
                    : 'shadow-[0_4px_14px_-2px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Photo frame with responsive dimensions and fixed 4/5 aspect ratio */}
                <div className="w-[42px] min-[360px]:w-[48px] min-[400px]:w-[56px] min-[480px]:w-[68px] sm:w-28 md:w-36 lg:w-44 xl:w-52 aspect-[4/5] overflow-hidden rounded-[1px] sm:rounded-xs bg-slate-100">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
