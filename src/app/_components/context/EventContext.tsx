"use client"
import React, { createContext, useContext, useState } from 'react';

// Define the event type
export interface EventCardType {
    image: string;
    title: string;
    date: string;
    location: string;
    eventDate: string;
    totalUsers?: number;
}

// Define the context type
interface EventContextType {
    events: EventCardType[];
    setEvents: React.Dispatch<React.SetStateAction<EventCardType[]>>;
}

// Create the context
const EventContext = createContext<EventContextType | undefined>(undefined);

// Create the provider component
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<EventCardType[]>([]);
    
    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    );
};

// Create the hook to use the context
export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};