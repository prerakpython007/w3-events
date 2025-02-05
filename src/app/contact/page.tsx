"use client"
import React from 'react';
import { Facebook } from 'lucide-react';
import { Yatra_One } from 'next/font/google';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { RiTelegram2Line } from 'react-icons/ri';

const yatraOne = Yatra_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yatra'
});

// Custom SVG components for better quality
const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ContactPage = () => {
  return (
    <div className="mt-16 sm:mt-24 lg:mt-32 bg-gradient-to-b flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Title Section */}
      <h1 className={`text-4xl sm:text-5xl lg:text-[60px] mb-4 sm:mb-6 bg-clip-text ${yatraOne.className} text-transparent bg-gradient-to-br from-[#FFFFFF] to-[#85472B] text-center leading-tight`}>
        Get in Touch
      </h1>

      {/* Message Section */}
      <div className="max-w-sm sm:max-w-xl lg:max-w-2xl text-center mb-8 sm:mb-12">
        <p className="text-lg sm:text-xl text-[#CAC9CE] mb-3 sm:mb-4 px-4">
          Join us for an unforgettable experience at our upcoming events!
        </p>
        <p className="text-sm sm:text-base text-[#CAC9CE] px-4">
          Have questions or want to learn more? We'd love to hear from you. 
          Reach out through our social channels or email us at events@web3.com
        </p>
      </div>

      {/* Social Links Section */}
      <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center justify-center">
        <a 
                 href="#" 
                 className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full"
                 aria-label="Follow us on X"
               >
                 <div className=" border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
                   <XLogo />
                 </div>
               </a>
               
               <a 
                 href="#" 
                 className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2  focus:ring-orange-400 rounded-full"
                 aria-label="Follow us on Facebook"
               >
                 <div className=" border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
                 <RiTelegram2Line  className="w-6 h-6 text-white" />
                 </div>
               </a>
               
               <a 
                 href="#" 
                 className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full"
                 aria-label="Follow us on LinkedIn"
               >
                 <div className=" border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
                 <FaWhatsapp className='w-6 h-6 text-white' />
                 </div>
               </a>
               <a 
                 href="#" 
                 className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full"
                 aria-label="Follow us on LinkedIn"
               >
                 <div className=" border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
                       
                 <Image src={'/vector4.svg'} width={100} alt='logo' className='invert' quality={100}  height={100} />
                 </div>
               </a>
      </div>
    </div>
  );
};

export default ContactPage;