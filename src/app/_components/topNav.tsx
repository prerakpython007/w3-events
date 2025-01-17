"use client"

import { type FC, useState, useEffect } from 'react'
import { Saira, Yatra_One } from 'next/font/google'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

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

  return (
    <>
      <div className={`my-5 w-[90%] sm:w-[75%] md:w-[60%] lg:w-[45%] text-[#FFD5C2] mx-auto relative z-50 ${className || ''}`}>
        <div className={`${saira.className} px-4`}>
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:flex items-center space-x-9">
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact us
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center">
                <h1 className={`${yatraOne.className} text-2xl text-white`}>
                  Web3Events
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/events" className="hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/submit-event" className="hover:text-white transition-colors">
                Submit event
              </Link>
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
      </div>

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