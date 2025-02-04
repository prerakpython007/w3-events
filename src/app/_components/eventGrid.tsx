"use client"
import { FC, useRef, useEffect, useState } from "react";
import { Yatra_One } from 'next/font/google'
import Image from 'next/image'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { supabase } from "../../../lib/supabase"
import { Router } from "next/router";
import Link from "next/link";

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
}) as { className: string };

interface Event {
    id: string;
    title: string;
    event_date: string;
    location: string;
    expires_on: string;
    image_url: string;
}

const EventCard: FC<Event & { index: number }> = ({ id, image_url, title, event_date, location, expires_on, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { 
        once: true, 
        amount: 0.3,
        margin: "0px 0px -150px 0px"
    });
    
    return (
        <motion.div 
            ref={cardRef}
            initial={{ 
                opacity: 0, 
                y: 15
            }}
            animate={isInView ? { 
                opacity: 1, 
                y: 0
            } : { 
                opacity: 0, 
                y: 15
            }}
            transition={{ 
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.15,
            }}
            whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
            }}
            className="group bg-black/80 backdrop-blur-sm p-3 rounded-xl transform cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg">
                <Image 
                    src={image_url || "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg transition-all duration-700 group-hover:scale-110"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                />
            </div>
            <motion.div 
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center py-3"
            >
                <p className={`${yatraOne.className} group-hover:text-[#85472B] transition-colors duration-300`}>
                    {title}
                </p>
                <p className="text-xs text-white/70">
                    {new Date(event_date).toLocaleDateString()}
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-xs text-[#ABABAB] mb-1 group-hover:text-white/90 transition-colors duration-300">
                    📍{location}
                </p>
                <p className="text-xs text-[#ABABAB] group-hover:text-white/90 transition-colors duration-300">
                    Expires: {new Date(expires_on).toLocaleDateString()}
                </p>
            </motion.div>
        </motion.div>
    );
};

const EventGrid: FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (data) setEvents(data);
        if (error) console.error('Error:', error);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
        >
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
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                
                <div className="relative flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-4xl mx-auto text-center space-y-4 mt-4 sm:mt-6 md:mt-8 lg:mt-10"
                    >
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`
                                ${yatraOne.className}
                                text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                                font-bold
                                text-transparent bg-clip-text
                                bg-gradient-to-r from-white to-[#85472B]
                                px-4
                            `}
                        >
                            Discover events around the world
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-sm sm:text-base md:text-lg lg:text-lg text-[#FFD5C2] px-4 mb-8"
                        >
                            Empowering over 10,000 pioneers through {events.length}+ events and 200+ collaborations.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="w-full py-10 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 mb-8"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                                <input
                                    type="text"
                                    placeholder="Search for events"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                        {filteredEvents.map((event, index) => (
                            <EventCard key={event.id} {...event} index={index} />
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
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white w-44 bg-[#1E1E1E] px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
                >
                    Add your event
                </motion.button>
                <Link href="/events">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    
                    className="text-white w-44 bg-[#1E1E1E] px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
                >
                    View more
                </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default EventGrid;