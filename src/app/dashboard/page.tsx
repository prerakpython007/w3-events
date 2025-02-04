"use client"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Trash2, LinkIcon, Building, Users, ToggleLeft, ToggleRight } from "lucide-react"
import Image from "next/image"
import { Yatra_One } from "next/font/google"
import { supabase } from "../../../lib/supabase"
import EventModal from "./components/EventModal"

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
}) as { className: string }

interface EventType {
  id: string;
  title: string;
  event_date: string;
  location: string;
  expires_on: string;
  image_url: string;
  registration_link?: string;
  organizer_name?: string;
  organizing_company?: string;
  is_active: boolean;  // New field
}

const Dashboard = () => {
  const [modalMode, setModalMode] = useState<'add' | 'delete'>('add')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [deleteConfirmEvent, setDeleteConfirmEvent] = useState<EventType | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setEvents(data)
      if (error) console.error('Error:', error)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const toggleEventStatus = async (event: EventType) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_active: !event.is_active })
        .eq('id', event.id)

      if (!error) {
        await fetchEvents()
      }
    } catch (error) {
      console.error('Error toggling event status:', error)
    }
  }

  const handleSubmit = useCallback(async (formData: {
    title: string
    event_date: string
    location: string
    expires_on: string
    image: File | null
    registration_link: string
    organizer_name: string
    organizing_company: string
}) => {
    try {
        let image_url = '/placeholder.svg'
        
        if (formData.image) {
            const fileExt = formData.image.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            
            const { error: uploadError } = await supabase.storage
                .from('event-images')
                .upload(fileName, formData.image)
            
            if (!uploadError) {
                const { data: { publicUrl } } = supabase.storage
                    .from('event-images')
                    .getPublicUrl(fileName)
                
                image_url = publicUrl
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
                organizing_company: formData.organizing_company,
                is_active: true  // New events are active by default
            })

        if (!error) {
            await fetchEvents()
            setIsModalOpen(false)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}, [])

  const handleDeleteEvent = useCallback(async (event: EventType) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id)

      if (!error) {
        if (event.image_url && event.image_url !== '/placeholder.svg') {
          const imageName = event.image_url.split('/').pop()
          if (imageName) {
            await supabase.storage
              .from('event-images')
              .remove([imageName])
          }
        }
        await fetchEvents()
        setDeleteConfirmEvent(null)
        setSelectedEvent(null)
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }, [])

  const handleOpenModal = useCallback((mode: 'add' | 'delete', event?: EventType) => {
    setModalMode(mode)
    if (mode === 'delete' && event) {
      setDeleteConfirmEvent(event)
    }
    setIsModalOpen(true)
  }, [])

  if (!mounted) return null

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
            onClick={() => handleOpenModal('add')}
            className="flex items-center gap-2 bg-[#85472B] hover:bg-[#6d3a23] px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-black/80 backdrop-blur-sm p-3 rounded-xl transform relative ${
                !event.is_active ? 'opacity-60' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              <div 
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <Image
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg transition-all duration-700 group-hover:scale-110"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                />
              </div>
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                className="flex justify-between items-center py-3"
              >
                <p className={`${yatraOne.className} group-hover:text-[#85472B] transition-colors duration-300`}>
                  {event.title}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleEventStatus(event)
                    }}
                    className="text-gray-400 hover:text-[#85472B] transition-colors duration-300"
                  >
                    {event.is_active ? (
                      <ToggleRight size={30} className="text-[#85472B]" />
                    ) : (
                      <ToggleLeft size={30} />
                    )}
                  </button>
                  <p className="text-xs text-white/70">{new Date(event.event_date).toLocaleDateString()}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenModal('delete', event)
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0.7 }} whileHover={{ opacity: 1 }}>
                <p className="text-xs text-[#ABABAB] mb-1 group-hover:text-white/90 transition-colors duration-300">
                  📍{event.location}
                </p>
                <p className="text-xs text-[#ABABAB] group-hover:text-white/90 transition-colors duration-300">
                  Expires: {new Date(event.expires_on).toLocaleDateString()}
                </p>
                <p className="text-xs text-[#ABABAB] mt-1">
                  Status: {event.is_active ? 'Active' : 'Inactive'}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <EventModal
              isOpen={isModalOpen}
              mode={modalMode}
              onClose={() => {
                setIsModalOpen(false)
                setDeleteConfirmEvent(null)
              }}
              onSubmit={handleSubmit}
              onConfirmDelete={() => deleteConfirmEvent && handleDeleteEvent(deleteConfirmEvent)}
              eventTitle={deleteConfirmEvent?.title}
            />
          )}
        </AnimatePresence>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1E1E1E] rounded-xl p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
                
                {/* Event Title */}
                <h2 className={`${yatraOne.className} text-2xl font-bold mb-6 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent pr-8`}>
                  {selectedEvent.title}
                </h2>

                {/* Event Image */}
                <div className="relative aspect-video mb-6">
                  <Image
                    src={selectedEvent.image_url || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    width={800}
                    height={400}
                    className="w-full rounded-lg object-cover"
                  />
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Event Date</p>
                      <p className="text-white">
                        {new Date(selectedEvent.event_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white flex items-center gap-2">
                        📍 {selectedEvent.location}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Expires On</p>
                      <p className="text-white">
                        {new Date(selectedEvent.expires_on).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Organizer</p>
                      <p className="text-white flex items-center gap-2">
                        <Users size={16} className="text-[#85472B]" />
                        {selectedEvent.organizer_name || 'Not specified'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Organizing Company</p>
                      <p className="text-white flex items-center gap-2">
                        <Building size={16} className="text-[#85472B]" />
                        {selectedEvent.organizing_company || 'Not specified'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Registration Link</p>
                      {selectedEvent.registration_link ? (
                        <a
                          href={selectedEvent.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#85472B] hover:text-[#6d3a23] flex items-center gap-2 transition-colors duration-300"
                        >
                          <LinkIcon size={16} />
                          Register Here
                        </a>
                      ) : (
                        <p className="text-gray-400">No registration link available</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-white/10">
                
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleOpenModal('delete', selectedEvent)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                    Delete Event
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}

export default Dashboard