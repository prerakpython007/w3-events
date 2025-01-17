"use client"

import { FC } from "react"
import { Yatra_One } from 'next/font/google'

const yatraOne = Yatra_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yatra'
}) as { className: string; variable: string };

const StatsNum: FC = () => {
    return (
        <div className="w-full px-4 mb-8 sm:mb-12 lg:mb-16">
            <div className="mt-32 sm:mt-40 lg:mt-64">
                <h1 className={`${yatraOne.className} text-center text-2xl sm:text-3xl md:text-4xl`}>
                    We&apos;re changing lives
                </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-16 lg:gap-20 py-6 sm:py-8 md:py-10">
                <div className="text-center">
                    <h3 className={`${yatraOne.className} text-3xl sm:text-4xl md:text-5xl`}>
                        10,000+
                    </h3>
                    <h5 className="text-xs sm:text-sm md:text-base pt-2 sm:pt-3 text-[#959595]">
                        Individuals Onboarded
                    </h5>
                </div>
                
                <div className="text-center">
                    <h3 className={`${yatraOne.className} text-3xl sm:text-4xl md:text-5xl`}>
                        500+
                    </h3>
                    <h5 className="text-xs sm:text-sm md:text-base pt-2 sm:pt-3 text-[#959595]">
                        Events Hosted
                    </h5>
                </div>
                
                <div className="text-center">
                    <h3 className={`${yatraOne.className} text-3xl sm:text-4xl md:text-5xl`}>
                        200+
                    </h3>
                    <h5 className="text-xs sm:text-sm md:text-base pt-2 sm:pt-3 text-[#959595]">
                        Collaborations
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default StatsNum;