"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialModal = ({ isOpen, onClose }: CommunityModalProps) => {
    useEffect(() => {
      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.overflow = 'hidden';
        
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = `${scrollbarWidth}px`;
        }
      } else {
        document.documentElement.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = '';
        }
      }
  
      return () => {
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
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      />
      
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-[#1A1A1A] p-4 sm:p-6 md:p-8 rounded-2xl z-[101] w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-md mx-auto border border-[#2E2E2E]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          ✕
        </button>

        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Join Our Community</h2>  
        
        </div>

        <div className="flex gap-3 sm:gap-4 md:gap-6 items-center justify-center">
          <a href="#" className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full">
            <div className="border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
              <XLogo />
            </div>
          </a>
          
          <a href="#" className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full">
            <div className="border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
              <RiTelegram2Line className="w-6 h-6 text-white" />
            </div>
          </a>
          
          <a href="#" className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full">
            <div className="border-2 border-orange-600 hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
              <FaWhatsapp className='w-6 h-6 text-white' />
            </div>
          </a>

          <a href="#" className="transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full">
            <div className="border-2 border-orange-600 text-3xl hover:border-orange-600 hover:bg-orange-600 bg-orange-50 bg-opacity-10 p-4 rounded-full relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300">
              ✦
            </div>
          </a>
          
        </div>
        <div className="text-center ">
        <motion.div 
            className="text-[#707070] mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Email us at{" "}
            <motion.span 
              className="bg-orange-700 px-2 py-1 text-white   ml-1 rounded inline-block"
              animate={{ 
                opacity: [1, 0.7, 1],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              admin@web3event.in
            </motion.span>
          </motion.div>
          </div>
        

        <div className="mt-4 sm:mt-6 md:mt-8 text-center">
          <button
            onClick={onClose}
            className="text-[#CAC9CE] hover:text-white transition-colors duration-300 text-xs sm:text-sm"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialModal;