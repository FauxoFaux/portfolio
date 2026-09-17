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

export function PeekPhotos() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [screenTier, setScreenTier] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenTier('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenTier('tablet');
      } else {
        setScreenTier('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When hovered, lift up almost all of the submerged portion so it pops into full view
  const liftDistance =
    screenTier === 'mobile' ? -58 : screenTier === 'tablet' ? -98 : -132;

  return (
    <div
      id="peek-photos-container"
      className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 mt-12 sm:mt-16 md:mt-20 -mb-[68px] xs:-mb-[80px] sm:-mb-[110px] md:-mb-[128px] lg:-mb-[152px] select-none"
    >
      <div className="flex justify-center items-end -space-x-3 xs:-space-x-4 sm:-space-x-6 md:-space-x-8 lg:-space-x-10 pointer-events-none">
        {PHOTOS.map((photo) => {
          const isHovered = hoveredId === photo.id;

          return (
            <motion.div
              key={photo.id}
              id={`peek-photo-${photo.id}`}
              className="relative shrink-0 pointer-events-auto cursor-pointer origin-bottom"
              style={{
                zIndex: isHovered ? 25 : photo.zIndex,
              }}
              initial={false}
              animate={{
                y: isHovered ? liftDistance : 0,
                rotate: isHovered ? photo.hoverRotate : photo.defaultRotate,
                scale: isHovered ? 1.06 : 1,
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
            >
              {/* Slim, crisp white border polaroid-style frame */}
              <div
                className={`bg-white p-1 sm:p-1.5 md:p-2 rounded-sm sm:rounded-md md:rounded-lg border border-[#DFE7EF] transition-shadow duration-300 ${
                  isHovered
                    ? 'shadow-[0_24px_48px_-8px_rgba(0,0,0,0.22),0_12px_24px_-4px_rgba(0,0,0,0.12)]'
                    : 'shadow-[0_6px_18px_-2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]'
                }`}
              >
                {/* Photo frame with responsive dimensions */}
                <div className="w-22 xs:w-26 sm:w-36 md:w-44 lg:w-52 xl:w-56 h-30 xs:h-36 sm:h-50 md:h-58 lg:h-68 xl:h-74 overflow-hidden rounded-[1px] sm:rounded-xs bg-slate-100">
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
