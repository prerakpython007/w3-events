"use client"
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../lib/supabase";
import SocialModal from "./socialModal";
import EventModal from "../dashboard/components/EventModal";

interface ButtonGroupProps {
  scrollToEvents: () => void;
  onEventAdded?: () => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ scrollToEvents, onEventAdded }) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const handleSubmit = async (formData: {
    title: string;
    event_date: string;
    location: string;
    expires_on: string;
    image: File | null;
    registration_link: string;
    organizer_name: string;
    organizing_company: string;
  }) => {
    try {
      let image_url = '/placeholder.svg';
      
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, formData.image);
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(fileName);
          
          image_url = publicUrl;
        }
      }

      const { error } = await supabase
        .from('events')
        .insert({
          title: formData.title,
          event_date: formData.event_date,
          location: formData.location,
          expires_on: formData.expires_on,
          image_url,
          registration_link: formData.registration_link,
          organizer_name: formData.organizer_name,
          organizing_company: formData.organizing_company
        });

      if (!error) {
        setIsEventModalOpen(false);
        if (onEventAdded) onEventAdded();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const buttons = [
    {
      text: "Join Our Community",
      className: "bg-gradient-to-b from-[#FF4E00] to-[#531900] hover:from-orange-400 hover:to-orange-600 rounded-md transition-all p-2 duration-300",
      onClick: () => setIsSocialModalOpen(true)
    },
    {
      text: "Explore Events",
      className: "bg-gradient-to-b from-[#FF4E00] to-[#531900] hover:from-orange-400 hover:to-orange-600 transition-all p-2 rounded-md",
      onClick: scrollToEvents
    },
   
  ];

  return (
    <>
      <div className="button-group flex lg:mt-14 flex-col space-x-4 sm:flex-row gap-10">
        {buttons.map((button, index) => (
          <motion.button
            key={button.text}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={button.className}
            onClick={button.onClick}
          >
            {button.text}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isSocialModalOpen && (
          <SocialModal
            isOpen={isSocialModalOpen} 
            onClose={() => setIsSocialModalOpen(false)} 
          />
        )}
        {isEventModalOpen && (
          <EventModal
            isOpen={isEventModalOpen}
            mode="add"
            onClose={() => setIsEventModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ButtonGroup;