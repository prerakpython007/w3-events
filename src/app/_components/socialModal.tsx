"use client"
import { motion } from "framer-motion";
import { Facebook } from 'lucide-react';
import { useEffect } from 'react';

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

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialModal = ({ isOpen, onClose }: CommunityModalProps) => {
    useEffect(() => {
      if (isOpen) {
        // Get scrollbar width to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Add padding equal to scrollbar width
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        // Add class to prevent scroll
        document.documentElement.style.overflow = 'hidden';
        
        // Apply the same padding to navbar if it exists
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = `${scrollbarWidth}px`;
        }
      } else {
        // Reset styles
        document.documentElement.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        
        // Reset navbar padding
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = '';
        }
      }
  
      return () => {
        // Cleanup
        document.documentElement.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = '';
        }
      };
    }, [isOpen]);
  
    const modalVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.2,
          ease: "easeIn"
        }
      }
    };
  
    if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm  z-[100]"
      />
      
      {/* Modal */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-[35%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A] p-8 rounded-2xl z-[101]  w-[90%] max-w-md border border-[#2E2E2E]"
      >
        {/* Close button - top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-400">Connect with us on social media</p>
        </div>

        <div className="flex gap-6 items-center justify-center">
          <a 
            href="#" 
            className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#DA5B23] rounded-full"
            aria-label="Follow us on X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="border-2 border-[#4E2616] hover:border-[#DA5B23] hover:bg-[#DA5B23] bg-[#0C0C0C] p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300">
              <XLogo />
            </div>
          </a>
          
          <a 
            href="#" 
            className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#DA5B23] rounded-full"
            aria-label="Follow us on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="border-2 border-[#4E2616] hover:border-[#DA5B23] hover:bg-[#DA5B23] bg-[#0C0C0C] p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300">
              <Facebook className="w-6 h-6 text-white" />
            </div>
          </a>
          
          <a 
            href="#" 
            className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#DA5B23] rounded-full"
            aria-label="Follow us on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="border-2 border-[#4E2616] hover:border-[#DA5B23] hover:bg-[#DA5B23] bg-[#0C0C0C] p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300">
              <LinkedInLogo />
            </div>
          </a>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="text-[#CAC9CE] hover:text-white transition-colors duration-300 text-sm"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default SocialModal;