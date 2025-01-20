"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { Yatra_One } from 'next/font/google';
import { style } from 'framer-motion/client';

const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
}) as { className: string };

interface EventCardType {
    image: string;
    title: string;
    date: string;
    location: string;
    eventDate: string;
    totalUsers?: number;
}

const Dashboard: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [events, setEvents] = useState<EventCardType[]>([]);
    const [formData, setFormData] = useState<EventCardType>({
        image: '',
        title: '',
        date: '',
        location: '',
        eventDate: '',
    });
    const [isDragging, setIsDragging] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const newEvent: EventCardType = {
            ...formData,
            image: formData.image || '/api/placeholder/400/300',
        };
        setEvents(prevEvents => [...prevEvents, newEvent]);
        setFormData({
            image: '',
            title: '',
            date: '',
            location: '',
            eventDate: '',
        });
        setIsFormOpen(false);
    };

    const handleImageUpload = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({
            ...prev,
            image: imageUrl
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, files } = e.target;
        
        if (name === 'image' && files && files[0]) {
            handleImageUpload(files[0]);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    

    return (
        <div className="min-h-screen text-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className={`${yatraOne.className} lg:text-3xl md:text-2xl text-lg font-bold bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
                        Event Dashboard
                    </h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 bg-[#85472B] hover:bg-[#6d3a23] px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                        <Plus size={20} />
                        Add Event
                    </button>
                </div>

                {/* Event Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1E1E1E] rounded-xl p-6 max-w-md w-full relative"
                        >
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                            
                            <h2 className={`${yatraOne.className} text-xl font-bold mb-6 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
                                Add New Event
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B]"
                                        required
                                    />
                                   
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B] calendar-icon-white"
                                        required
                                    />
                                    
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Event Date</label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Cover Image</label>
                                    <div className="space-y-4">
                                        {formData.image ? (
                                            <div className="relative group">
                                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={formData.image}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                            className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <X size={16} className="text-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
                                                    isDragging 
                                                        ? 'border-[#85472B] bg-[#85472B]/10' 
                                                        : 'border-white/10 hover:border-[#85472B]'
                                                }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <input
                                                    type="file"
                                                    name="image"
                                                    onChange={handleChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    accept="image/*"
                                                />
                                                <div className="p-8 text-center">
                                                    <Upload className="mx-auto mb-2 text-gray-400" />
                                                    <p className="text-sm text-gray-400 mb-1">
                                                        Drag and drop your image here
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        or click to browse (max 5MB)
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#85472B] hover:bg-[#6d3a23] py-2 rounded-lg transition-colors duration-300 mt-6"
                                >
                                    Add Event
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-black/80 backdrop-blur-sm p-3 rounded-xl transform cursor-pointer"
                            whileHover={{ y: -5 }}
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
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;