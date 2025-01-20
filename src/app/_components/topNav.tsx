"use client"

import { type FC, useState, useEffect } from 'react'
import { Saira, Yatra_One } from 'next/font/google'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const saira = Saira({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const yatraOne = Yatra_One({
  weight: '400',
  subsets: ['latin']
})

interface NavbarProps {
  className?: string
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        delay: 0.2,
        type: "spring",
        stiffness: 200
      } 
    }
  }

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`my-5 w-[90%] sm:w-[75%] md:w-[60%] lg:w-[45%] text-[#FFD5C2] mx-auto relative z-50 ${className || ''}`}
      >
        <div className={`${saira.className} px-4`}>
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:flex items-center space-x-9 flex-1">
              <motion.div custom={0} variants={linkVariants}>
                <Link href="/contact" className="hover:text-white transition-colors hover:scale-105 inline-block">
                  Contact us
                </Link>
              </motion.div>
              <motion.div custom={1} variants={linkVariants}>
                <Link href="/about" className="hover:text-white transition-colors hover:scale-105 inline-block">
                  About
                </Link>
              </motion.div>
            </div>

            <motion.div 
              variants={logoVariants}
              className="flex-1 text-center"
            >
              <Link href="/" className="inline-block">
                <h1 className={`${yatraOne.className} text-2xl text-white hover:scale-105 transition-transform`}>
                  Web3Events
                </h1>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
              <motion.div custom={2} variants={linkVariants}>
                <Link href="/events" className="hover:text-white transition-colors hover:scale-105 inline-block">
                  Events
                </Link>
              </motion.div>
              <motion.div custom={3} variants={linkVariants}>
                <Link href="/submit-event" className="hover:text-white transition-colors hover:scale-105 inline-block">
                  Submit event
                </Link>
              </motion.div>
            </div>

            <button 
              onClick={toggleMenu}
              className="md:hidden absolute right-0 text-[#FFD5C2] hover:text-white transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      <div 
        className={`
          fixed inset-0 bg-black z-40
          transition-transform duration-500 ease-in-out
          md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className={`${saira.className} h-full flex flex-col justify-center items-center space-y-8 p-4`}>
          <a 
            href="/contact" 
            className="text-[#FFD5C2] hover:text-white transition-colors text-2xl"
            onClick={toggleMenu}
          >
            Contact us
          </a>
          <a 
            href="/about" 
            className="text-[#FFD5C2] hover:text-white transition-colors text-2xl"
            onClick={toggleMenu}
          >
            About
          </a>
          <a 
            href="/events" 
            className="text-[#FFD5C2] hover:text-white transition-colors text-2xl"
            onClick={toggleMenu}
          >
            Events
          </a>
          <a 
            href="/submit-event" 
            className="text-[#FFD5C2] hover:text-white transition-colors text-2xl"
            onClick={toggleMenu}
          >
            Submit event
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar