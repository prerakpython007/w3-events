import { Yatra_One } from "next/font/google";
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

export default function Home() {
  return (
    <div className="grid min-h-screen w-full px-4 lg:mt-32  sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className={`
        ${yatraOne.className} 
        text-3xl sm:text-4xl md:text-5xl lg:text-[60px]
        text-center 
        text-transparent 
        leading-normal sm:leading-relaxed lg:leading-[70px] 
        bg-clip-text 
        bg-gradient-to-br from-[#FFFFFF] to-[#85472B]
      `}>
        Join the <br className="md:hidden" /> Web3 Revolution
      </h1>
      
      <div className="pt-2 sm:pt-3 max-w-2xl">
        <h3 className="text-[#FFD5C2] text-sm sm:text-base md:text-lg text-center">
          Empowering over 10,000 pioneers through 500+ events and 200+ collaborations.
        </h3>
      </div>
      
      <div className="pt-6 sm:pt-8">
        <ButtonGroup />
      </div>

      <div className="w-full">
        <StatsNum />
      </div>
      
      <div className="w-full">
        <EventGrid />
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <TestimonialCarousel/>
      </div>
      <div>
        <Footer/> 
      </div>
    </div>
  );
}