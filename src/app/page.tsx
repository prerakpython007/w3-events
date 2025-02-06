"use client"
import { Yatra_One } from "next/font/google";
import { motion } from "framer-motion";
import { useCallback, useRef } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import ButtonGroup from "./_components/buttonGroup";
import StatsNum from "./_components/stats";
import EventGrid from "./_components/eventGrid";
import Carousel from "./_components/courocel";
import TestimonialCarousel from "./_components/manualCurosel";
import Footer from "./_components/footer";

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
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToEvents = () => {
    eventGridRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="relative grid min-h-screen w-full px-4 mt-24 lg:mt-32 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            color: {
              value: "#85472B",
            },
            links: {
              color: "#85472B",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
            },
            size: {
              value: 3,
            },
            shape: {
              type: "square",
            },
            number: {
              value: 20,
            },
            opacity: {
              value: 0.5,
            },
          },
        }}
      />
      
      {/* Rest of the component remains unchanged */}
      <motion.h1 
        initial="hidden"
        whileInView="visible"
       
        className={`
          ${yatraOne.className} 
          text-3xl sm:text-4xl md:text-5xl lg:text-[80px]
          text-center 
          text-transparent 
          leading-normal sm:leading-relaxed lg:leading-[70px] 
          py-3
          bg-clip-text 
          mt-6
          bg-gradient-to-br from-[#FFFFFF] to-[#85472B]
          
        `}
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        You shape Web3 <br className="" /> Web3 shapes you
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