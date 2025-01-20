"use client"

import { FC } from "react"
import { Yatra_One } from 'next/font/google'
import { motion } from "framer-motion"

const yatraOne = Yatra_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yatra'
}) as { className: string; variable: string };

const StatsNum: FC = () => {
    const stats = [
        {
            number: "10,000+",
            label: "Individuals Onboarded"
        },
        {
            number: "500+",
            label: "Events Hosted"
        },
        {
            number: "200+",
            label: "Collaborations"
        }
    ]

    return (
        <div className="w-full px-4 mb-20 sm:mb-12 lg:mb-16">
            <motion.div 
                className="mt-72 sm:mt-40 lg:mt-64"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={`${yatraOne.className} text-center text-2xl sm:text-3xl md:text-4xl text-white`}>
                    We&apos;re changing lives
                </h1>
            </motion.div>
            
            <motion.div 
                className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-16 lg:gap-20 py-6 sm:py-8 md:py-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="text-center group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className={`${yatraOne.className} text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
                            {stat.number}
                        </h3>
                        <h5 className="text-xs sm:text-sm md:text-base pt-2 sm:pt-3 text-[#959595] group-hover:text-white transition-colors duration-300">
                            {stat.label}
                        </h5>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default StatsNum;