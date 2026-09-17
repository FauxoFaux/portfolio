import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // When hovered/tapped, lift up almost all of the submerged portion so it pops into full view
  const liftDistance =
    screenTier === 'mobile-sm'
      ? -36
      : screenTier === 'mobile'
      ? -46
      : screenTier === 'mobile-lg'
      ? -56
      : screenTier === 'tablet'
      ? -90
      : -132;

  return (
    <div
      id="peek-photos-container"
      className="relative z-10 w-full max-w-[1400px] mx-auto px-2 min-[380px]:px-4 sm:px-8 mt-10 sm:mt-16 md:mt-20 -mb-[34px] min-[360px]:-mb-[40px] min-[400px]:-mb-[46px] min-[480px]:-mb-[56px] sm:-mb-[76px] md:-mb-[96px] lg:-mb-[118px] xl:-mb-[138px] select-none"
    >
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
                zIndex: isHovered ? 30 : photo.zIndex,
              }}
              initial={false}
              animate={{
                y: isHovered ? liftDistance : 0,
                rotate: isHovered ? photo.hoverRotate : photo.defaultRotate,
                scale: isHovered ? (screenTier.startsWith('mobile') ? 1.08 : 1.06) : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 360,
                damping: 25,
                mass: 0.8,
              }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId((current) => (current === photo.id ? null : current))}
              onClick={() => setHoveredId((current) => (current === photo.id ? null : photo.id))}
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
                    ? 'shadow-[0_20px_40px_-6px_rgba(0,0,0,0.25),0_10px_20px_-3px_rgba(0,0,0,0.15)]'
                    : 'shadow-[0_4px_14px_-2px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Photo frame with responsive dimensions and fixed 4/5 aspect ratio */}
                <div className="w-[48px] min-[360px]:w-[54px] min-[400px]:w-[62px] min-[480px]:w-[74px] sm:w-28 md:w-36 lg:w-44 xl:w-52 aspect-[4/5] overflow-hidden rounded-[1px] sm:rounded-xs bg-slate-100">
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
