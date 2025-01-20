"use client"
import { FC, useRef } from "react";
import { Yatra_One } from 'next/font/google'
import Image from 'next/image'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
}) as { className: string };

interface EventCard {
    image: string;
    title: string;
    date: string;
    location: string;
    eventDate: string;
}

const eventCards: EventCard[] = [
    { 
        image: "/frame1.png",
        title: "Arijit Events",
        date: "11 marh",
        location: "Rajpath club, Ahmedabad",
        eventDate: "23 Nov 2023"
    },
    { 
        image: "/frame2.png",
        title: "Creative Designs",
        date: "11 arch",
        location: "Main street, Barcelona",
        eventDate: "10 Oct 2023"
    },
    { 
        image: "/frame3.png",
        title: "Innovative Creations",
        date: "11march",
        location: "Central Park, New York",
        eventDate: "23 Nov2023"
    },
    { 
        image: "/frame4.png",
        title: "Artistic Productions",
        date: "1 march",
        location: "Golden Gate Bridge, San Francisco",
        eventDate: "23 Nov 223"
    },
    { 
        image: "/frame5.png",
        title: "Majestic Events",
        date: "11 marc",
        location: "Taj Mahal, Agra",
        eventDate: "23 Nov 23"
    },
    { 
        image: "/frame6.png",
        title: "Chic Designs",
        date: "11 mach",
        location: "Eiffel Tower, Paris",
        eventDate: "23 Nov 202"
    },
    { 
        image: "/frame7.png",
        title: "Avant-garde Creations",
        date: "11 mrch",
        location: "Sydney Opera House, Sydney",
        eventDate: "23 Nov 023"
    },
    { 
        image: "/frame8.png",
        title: "Timeless Productions",
        date: "1 march",
        location: "Colosseum, Rome",
        eventDate: "23  2023"
    }
];

const EventCard: FC<EventCard & { index: number }> = ({ image, title, date, location, eventDate, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });
    
    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-black p-3 rounded-xl transform transition-transform hover:scale-105"
        >
            <Image 
                src={image}
                alt={title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex justify-between items-center py-3">
                <p className={yatraOne.className}>{title}</p>
                <p className="text-xs">{date}</p>
            </div>
            <p className="text-xs text-[#ABABAB] mb-1">📍{location}</p>
            <p className="text-xs text-[#ABABAB]">{eventDate}</p>
        </motion.div>
    );
};

const EventGrid: FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="w-full min-h-screen">
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-white to-[#85472B] origin-left z-50"
                style={{ scaleX }}
            />
            
            <div className="w-full h-fit min-h-screen relative rounded-3xl overflow-hidden">
                <Image 
                    src="/bg1.png" 
                    alt="Event background"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover"
                    priority
                />
                
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-4xl mx-auto text-center space-y-4 mt-4 sm:mt-6 md:mt-8 lg:mt-10"
                    >
                        <h1 className={`
                            ${yatraOne.className}
                            text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                            font-bold
                            text-transparent bg-clip-text
                            bg-gradient-to-r from-white to-[#85472B]
                            px-4
                        `}>
                            Discover events around the world
                        </h1>
                        
                        <p className="text-sm sm:text-base md:text-lg lg:text-lg text-[#FFD5C2] px-4 mb-8">
                            Empowering over 10,000 pioneers through 500+ events and 200+ collaborations.
                        </p>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full py-10 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 mb-8"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                                <input
                                    type="text"
                                    placeholder="Search for events"
                                    className="w-full py-2.5 sm:py-3.5 md:py-4 pl-12 pr-4 sm:pl-14 sm:pr-6
                                    text-sm sm:text-base md:text-lg
                                    bg-black/30 backdrop-blur-md
                                    border border-white/10 hover:border-white/20
                                    rounded-full 
                                    text-white placeholder-gray-400 
                                    outline-none focus:ring-1 focus:ring-white/30
                                    transition-all duration-300
                                    shadow-lg shadow-black/20"
                                />
                                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                                    <svg 
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white/70 transition-colors duration-300" 
                                        fill="none" 
                                        strokeWidth="2" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="w-full pb-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eventCards.map((card, index) => (
                            <EventCard key={index} {...card} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bottom-14 w-full flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 px-4"
            >
                <button className="text-white w-44 bg-[#1E1E1E] px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300">
                    Add your event
                </button>
                <button className="text-white w-44 bg-[#1E1E1E] px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300">
                    View more
                </button>
            </motion.div>
        </div>
    );
};

export default EventGrid;