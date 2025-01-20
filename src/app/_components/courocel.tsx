"use client"
import React, { useEffect, useState } from 'react';
import { Yatra_One } from 'next/font/google';
import Image from 'next/image';

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
});

const LogoCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logos = [
    { id: 1, src: '/l1.png', alt: 'Logo 1' },
    { id: 2, src: '/l2.png', alt: 'Logo 2' },
    { id: 3, src: '/l3.png', alt: 'Logo 3' },
    { id: 4, src: '/l4.png', alt: 'Logo 4' },
    { id: 5, src: '/l5.png', alt: 'Logo 5' },
    { id: 6, src: '/l6.png', alt: 'Logo 6' }
  ];

  // Create a longer array of logos for smoother infinite scroll
  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden w-full">
      <div className="max-w-[92vw] md:max-w-[96vw] mx-auto">
        <h2 className={`text-white ${yatraOne.className} text-3xl md:text-5xl font-medium text-center py-6 md:py-10`}>
          Our Frens
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-4 md:gap-7 infinite-scroll">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 inline-flex items-center justify-center min-w-[120px] md:min-w-[160px]"
              >
                <Image
                  width={160}
                  height={48}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-12 w-auto object-contain"
                  priority={index < 6}
                  style={{ filter: 'brightness(0) saturate(100%) invert(45%) sepia(87%) saturate(1304%) hue-rotate(347deg) brightness(91%) contrast(84%)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - ${isMobile ? '0.5rem' : '0.875rem'}));
          }
        }

        .infinite-scroll {
          animation: infinite-scroll ${isMobile ? '15s' : '25s'} linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .overflow-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LogoCarousel;
