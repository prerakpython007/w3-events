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
    <div className="grid min-h-screen w-full px-4 mt-24 lg:mt-32 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 items-center justify-items-center  font-[family-name:var(--font-geist-sans)]">
      <motion.h1 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={{
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: [1, 0.98, 1, 0.94, 1, 0.96, 1, 0.92, 1],
      y: 0,
      textShadow: [
        "0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(133,71,43,0.4)",
        "0 0 12px rgba(255,255,255,0.7), 0 0 25px rgba(255,255,255,0.5), 0 0 35px rgba(133,71,43,0.3)",
        "0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(133,71,43,0.4)",
        "0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4), 0 0 30px rgba(133,71,43,0.2)",
        "0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(133,71,43,0.4)",
        "0 0 13px rgba(255,255,255,0.7), 0 0 27px rgba(255,255,255,0.5), 0 0 37px rgba(133,71,43,0.3)",
        "0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(133,71,43,0.4)",
        "0 0 11px rgba(255,255,255,0.6), 0 0 22px rgba(255,255,255,0.4), 0 0 32px rgba(133,71,43,0.2)",
        "0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(133,71,43,0.4)"
      ],
      transition: {
        y: { duration: 0.8 },
        opacity: {
          duration: 4,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
          repeatDelay: 0.5
        },
        textShadow: {
          duration: 4,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
          repeatDelay: 0.5
        }
      }
    }
  }}
  className={`
    ${yatraOne.className} 
    text-3xl sm:text-4xl md:text-5xl lg:text-[60px]
    text-center 
    text-transparent 
    leading-normal sm:leading-relaxed lg:leading-[70px] 
    bg-clip-text 
    bg-gradient-to-br from-[#FFFFFF] to-[#85472B]
    [text-shadow:0_0_15px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.6),0_0_40px_rgba(133,71,43,0.4)]
  `}
  style={{
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
>
  Join the <br className="md:hidden" /> Web3 Revolution
</motion.h1>
      
      
      
      
      <ButtonGroup scrollToEvents={scrollToEvents} />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full pt-7"
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
  );
}