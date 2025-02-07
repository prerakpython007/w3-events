"use client"
import { Yatra_One } from "next/font/google";
import { motion } from "framer-motion";
import ButtonGroup from "./_components/buttonGroup";
import StatsNum from "./_components/stats";
import EventGrid from "./_components/eventGrid";
import Carousel from "./_components/courocel";
import TestimonialCarousel from "./_components/manualCurosel";
import Footer from "./_components/footer";
import { useRef } from "react";


const yatraOne = Yatra_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yatra'
});

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const eventGridRef = useRef<HTMLDivElement>(null);

  const scrollToEvents = () => {
    eventGridRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
    
    <div className="grid min-h-screen w-full px-4 mt-24 lg:mt-32 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 items-center justify-items-center  font-[family-name:var(--font-geist-sans)]">
      <motion.h1
  initial={{ opacity: 0, y: 50 }} // Starting position when the page loads
  animate={{ opacity: 1, y: 0 }}  // Target position after animation
  transition={{
    duration: 1.2, // Animation duration
    ease: "easeOut",
  }}
  className={`
    ${yatraOne.className} 
    text-3xl sm:text-4xl md:text-5xl lg:text-[80px]
    text-center 
    leading-normal sm:leading-relaxed lg:leading-[70px] 
    py-3
    mt-6
   
  `}
>
<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#85472B] via-[#FFDCB5] to-white">
   You shape Web3
 </span>
 <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFDCB5] to-[#85472B]">
   Web3 shapes you
 </span>
</motion.h1>



      
      
      <ButtonGroup scrollToEvents={scrollToEvents} />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full"
      >
        <StatsNum />
      </motion.div>
      
      <div ref={eventGridRef}>
        <EventGrid />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <Carousel />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <TestimonialCarousel/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <Footer/> 
      </motion.div>
    </div>
    </>
  );
}