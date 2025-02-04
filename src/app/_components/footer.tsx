"use client"
import React from 'react';
import { Facebook } from 'lucide-react';
import Image from 'next/image';

// Custom SVG components
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

const Footer = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <Image 
        src="/div.png" 
        alt="" 
        width={700} 
        height={400}
        className="w-full md:w-[70%] lg:w-[50%] mx-auto"
        priority
      />
      
      {/* Social Links Section */}
      <div className="flex gap-6 sm:gap-8 lg:gap-10 items-center justify-center mt-16 mb-16">
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
            <Facebook className="w-6 h-6 text-white" />
          </div>
        </a>
        
        <a 
          href="#" 
          className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full"
          aria-label="Follow us on LinkedIn"
        >
          <div className=" border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
            <LinkedInLogo />
          </div>
        </a>
      </div>

      <hr className="w-full max-w-[90%] lg:max-w-[1300px] opacity-15 mx-auto" />

      <div className="max-w-[90%] lg:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* Footer Links */}
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 text-sm text-center md:text-left">
            <p className="text-[#CAC9CE]">© 2024 Web3events</p>
            <p className="text-[#CAC9CE] hover:text-[#DA5B23] cursor-pointer transition-colors duration-300">
              Privacy Policy
            </p>
            <p className="text-[#CAC9CE] hover:text-[#DA5B23] cursor-pointer transition-colors duration-300">
              Terms of Use
            </p>
          </div>

          {/* Footer Text */}
          <div className="text-sm  lg:flex lg:space-x-[500px] text-[#646464] col-span-1 md:col-span-2 space-y-4 text-center md:text-left">
            <div className='lg:w-[70%]'>
            <p className="leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            </div>
            <div>
              <Image
                src="/logonew.png"
                alt="Web3events Logo"
                width={150}
                height={50}
                className="mx-auto lg:mt-0 mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;