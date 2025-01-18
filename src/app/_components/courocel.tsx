"use client"
import React from 'react';
import { Yatra_One } from 'next/font/google';
import Image from 'next/image';

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
});

const LogoCarousel = () => {
  const logos = [
    { id: 1, src: '/logo1.png', alt: 'Logo 1' },
    { id: 2, src: '/logo2.png', alt: 'Logo 2' },
    { id: 3, src: '/logo3.png', alt: 'Logo 3' },
    { id: 4, src: '/logo4.png', alt: 'Logo 4' },
    { id: 5, src: '/logo5.png', alt: 'Logo 5' },
    { id: 6, src: '/logo6.png', alt: 'Logo 6' }
  ];

  // Create a longer array of logos for smoother infinite scroll
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="max-w-[96vw]">
        <h2 className={`text-white ${yatraOne.className} text-5xl font-medium text-center py-10`}>Our Frens</h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-7 infinite-scroll">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 inline-flex items-center justify-center min-w-[160px]"
              >
                <Image
                  width={160}
                  height={48}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(45%) sepia(87%) saturate(1304%) hue-rotate(347deg) brightness(91%) contrast(84%)' }}
                />
              </div>
            ))}
          </div>

          {/* Duplicate row for seamless loop */}
          <div className="flex gap-7 hidden infinite-scroll" aria-hidden="true">
            {repeatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}-duplicate`}
                className="flex-shrink-0 inline-flex items-center justify-center min-w-[160px]"
              >
                <Image
                  width={160}
                  height={48}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain"
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
            transform: translateX(calc(-100% - 1.75rem));
          }
        }

        .infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
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