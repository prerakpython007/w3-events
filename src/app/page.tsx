"use client"
import { Yatra_One } from "next/font/google";
import { motion } from "framer-motion";
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
  return (
    <div className="grid min-h-screen w-full px-4 mt-24 lg:mt-32 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <motion.h1 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className={`
          ${yatraOne.className} 
          text-3xl sm:text-4xl md:text-5xl lg:text-[60px]
          text-center 
          text-transparent 
          leading-normal sm:leading-relaxed lg:leading-[70px] 
          bg-clip-text 
          bg-gradient-to-br from-[#FFFFFF] to-[#85472B]
        `}
      >
        Join the <br className="md:hidden" /> Web3 Revolution
      </motion.h1>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="pt-2 sm:pt-3 max-w-2xl"
      >
        <h3 className="text-[#FFD5C2] text-sm sm:text-base mb-7 md:text-lg text-center">
          Empowering over 10,000 pioneers through <br className="lg:hidden" /> 500+ events and 200+ collaborations.
        </h3>
      </motion.div>
      
      {/* <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="pt-6 sm:pt-8"
      > */}
        <ButtonGroup />
      {/* </motion.div> */}

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full"
      >
        <StatsNum />
      </motion.div>
      
      {/* <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full"
      > */}
        <EventGrid />
      {/* </motion.div> */}

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