"use client"
import { type FC, useState, useEffect } from 'react'
import { Saira, Yatra_One } from 'next/font/google'
import { LayoutDashboard, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/app/contexts/authContext'
import EventModal from '../dashboard/components/EventModal'
import { supabase } from '../../../lib/supabase'
import Image from 'next/image'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoggedIn } = useAuth();

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

  const handleSubmit = async (formData: {
    title: string;
    event_date: string;
    location: string;
    expires_on: string;
    image: File | null;
    registration_link: string;
    organizer_name: string;
    organizing_company: string;
  }) => {
    try {
      let image_url = '/placeholder.svg';
      
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, formData.image);
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(fileName);
          
          image_url = publicUrl;
        }
      }

      const { error } = await supabase
        .from('events')
        .insert({
          title: formData.title,
          event_date: formData.event_date,
          location: formData.location,
          expires_on: formData.expires_on,
          image_url,
          registration_link: formData.registration_link,
          organizer_name: formData.organizer_name,
          organizing_company: formData.organizing_company
        });

      if (!error) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        className={`py-5 w-[90%] sm:w-[75%] md:w-[60%] lg:w-[45%] text-[#FFD5C2] mx-auto relative z-50 ${className || ''}`}
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
                <Image
                  src="/logonew.png"
                  alt="Logo"
                  width={150}
                  height={40}
                  layout="fixed"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
              <motion.div custom={2} variants={linkVariants}>
                <Link href="/events" className="hover:text-white transition-colors hover:scale-105 inline-block">
                  Events
                </Link>
              </motion.div>
              <motion.div custom={3} variants={linkVariants}>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="hover:text-white transition-colors hover:scale-105 inline-block whitespace-nowrap"
                >
                  Submit event
                </button>
              </motion.div>
            </div>

            {isLoggedIn && (
              <motion.div custom={4} variants={linkVariants} className="hidden md:block absolute -right-60">
                <Link href="/dashboard" className="hover:text-white transition-colors hover:scale-105 inline-flex gap-1 mt-1 items-center">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </motion.div>
            )}

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
          {isLoggedIn && (
            <a 
              href="/dashboard" 
              className="text-[#FFD5C2] hover:text-white transition-colors text-2xl"
              onClick={toggleMenu}
            >
              Dashboard
            </a>
          )}
          <button 
            onClick={() => {
              toggleMenu();
              setIsModalOpen(true);
            }}
            className="text-[#FFD5C2] hover:text-white transition-colors text-2xl"
          >
            Submit event
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <EventModal
            isOpen={isModalOpen}
            mode="add"
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar