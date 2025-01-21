"use client"
import { FC, useState, useRef } from "react";
import { Yatra_One } from 'next/font/google';
import Image from 'next/image';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { X } from 'lucide-react';
import { EventCardType, useEvents } from "./context/EventContext";

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
}) as { className: string };

// Event Detail Modal Component
interface EventDetailModalProps {
    event: EventCardType;
    onClose: () => void;
}

const EventDetailModal: FC<EventDetailModalProps> = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1E1E1E] rounded-xl p-6 max-w-2xl w-full relative"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <h2 className={`${yatraOne.className} text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
                    {event.title}
                </h2>

                <div className="space-y-3">
                    <div>
                        <label className="text-sm text-gray-400">Date Added</label>
                        <p className="text-white">{event.date}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Location</label>
                        <p className="text-white">📍 {event.location}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Event Date</label>
                        <p className="text-white">{event.eventDate}</p>
                    </div>

                    {event.totalUsers && (
                        <div>
                            <label className="text-sm text-gray-400">Total Users</label>
                            <p className="text-white">{event.totalUsers.toLocaleString()} users</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

interface EventCardProps {
    event: EventCardType;
    index: number;
    onClick: () => void;
}

const EventCard: FC<EventCardProps> = ({ event, index, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { 
        once: true, 
        amount: 0.3,
        margin: "0px 0px -150px 0px"
    });
    
    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ 
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.15,
            }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            onClick={onClick}
            className="group bg-black/80 backdrop-blur-sm p-3 rounded-xl transform cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg">
                <Image 
                    src={event.image}
                    alt={event.title}
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
                    {event.title}
                </p>
                <p className="text-xs text-white/70">{event.date}</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-xs text-[#ABABAB] mb-1 group-hover:text-white/90 transition-colors duration-300">
                    📍{event.location}
                </p>
                <p className="text-xs text-[#ABABAB] group-hover:text-white/90 transition-colors duration-300">
                    {event.eventDate}
                </p>
            </motion.div>
        </motion.div>
    );
};

const EventGrid: FC = () => {
    const { events } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState<EventCardType | null>(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const [searchQuery, setSearchQuery] = useState("");

    // Filter events based on search query
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
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
                            Empowering over 10,000 pioneers through 500+ events and 200+ collaborations.
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
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                            <EventCard 
                                key={index}
                                event={event}
                                index={index}
                                onClick={() => setSelectedEvent(event)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </motion.div>
    );
};

export default EventGrid;