"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Yatra_One } from 'next/font/google';

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
});

interface Testimonial {
  avatar: string;
  text: string;
  date: string;
}

type ScrollDirection = 'left' | 'right';

const TestimonialCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      avatar: "/profile.png",
      text: "Best platform to organize Web3 events. Highly recommend!",
      date: "12 Feb 2026"
    },
    {
      avatar: "/profile.png",
      text: "Informative articles on the latest blockchain trends. Must-read!",
      date: "12 Feb 2026"
    },
    {
      avatar: "/profile.png",
      text: "Insightful interviews with top NFT creators. Inspirational!",
      date: "20 Mar 2026"
    },
    {
      avatar: "/profile.png",
      text: "Exciting virtual reality experiences in the Metaverse. Mind-blowing!",
      date: "5 Apr 2026"
    },
    {
      avatar: "/profile.png",
      text: "Innovative projects shaping the future of DeFi. Cutting-edge!",
      date: "18 May 2026"
    }
  ];

  // Create an extended array for infinite scrolling
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const scroll = (direction: ScrollDirection) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Make card width responsive based on screen size
    const cardWidth = window.innerWidth < 640 ? container.clientWidth : 340;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    let newPosition = direction === 'right' 
      ? scrollPosition + cardWidth 
      : scrollPosition - cardWidth;

    // Reset position for infinite scroll effect
    if (newPosition > maxScroll - cardWidth) {
      newPosition = 0;
    } else if (newPosition < 0) {
      newPosition = maxScroll - cardWidth;
    }

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  // Reset scroll position when reaching the end
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
        setScrollPosition(0);
      } else if (container.scrollLeft === 0) {
        setScrollPosition(0);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full my-16 py-8">
      <h2 className={`${yatraOne.className} text-center text-4xl py-9`}>What Our Community Says</h2>
      <div className="max-w-[92vw] md:max-w-[96vw] mx-auto relative">
        
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-[#1E1E1E] hover:bg-[#2a2a2a] p-2 rounded-full transition-colors"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-[#1E1E1E] hover:bg-[#2a2a2a] p-2 rounded-full transition-colors"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Testimonials container */}
        <div 
          ref={containerRef}
          className="flex gap-4 md:gap-6 overflow-x-hidden scroll-smooth px-2 md:px-4 scrollbar-hide"
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full sm:w-80 bg-[#1E1E1E] rounded-2xl p-4 md:p-6 transition-transform"
            >
              <div className="flex items-center mb-4">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-white text-base md:text-lg mb-3">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-gray-400 text-sm">
                {testimonial.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;