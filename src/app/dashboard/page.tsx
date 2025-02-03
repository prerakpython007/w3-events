"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, X, Trash2 } from "lucide-react"
import Image from "next/image"
import { Yatra_One } from "next/font/google"
import { supabase } from "../../../lib/supabase"
import EventFormModal from "../_components/eventModal"
import DeleteConfirmationModal from "../_components/eventDeleteModal"
import EventModal from "../_components/eventModal"


const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
}) as { className: string }

interface EventType {
  id: string
  title: string
  event_date: string
  location: string
  expires_on: string
  image_url: string
}

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [deleteConfirmEvent, setDeleteConfirmEvent] = useState<EventType | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setEvents(data)
    if (error) console.error('Error:', error)
  }

  const handleSubmit = async (formData: {
    title: string
    event_date: string
    location: string
    expires_on: string
    image: File | null
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
          image_url
        })

      if (!error) {
        await fetchEvents()
        setIsFormOpen(false)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteEvent = async (event: EventType) => {
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
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }
  const [modalMode, setModalMode] = useState<'add' | 'delete'>('add')
const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen text-white p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
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

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-black/80 backdrop-blur-sm p-3 rounded-xl transform relative"
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
                  <p className="text-xs text-white/70">{new Date(event.event_date).toLocaleDateString()}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteConfirmEvent(event)
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
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modals */}
        <EventModal
      isOpen={isModalOpen}
      mode={modalMode}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      onConfirmDelete={() => deleteConfirmEvent && handleDeleteEvent(deleteConfirmEvent)}
      eventTitle={deleteConfirmEvent?.title}
    />

        <DeleteConfirmationModal
          isOpen={!!deleteConfirmEvent}
          onClose={() => setDeleteConfirmEvent(null)}
          onConfirm={() => deleteConfirmEvent && handleDeleteEvent(deleteConfirmEvent)}
          eventTitle={deleteConfirmEvent?.title || ''}
        />

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1E1E1E] rounded-xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className={`${yatraOne.className} text-xl font-bold mb-6 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
                {selectedEvent.title}
              </h2>
              <div className="space-y-4">
                <Image
                  src={selectedEvent.image_url || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p><strong>Event Date:</strong> {new Date(selectedEvent.event_date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {selectedEvent.location}</p>
                <p><strong>Expires On:</strong> {new Date(selectedEvent.expires_on).toLocaleDateString()}</p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setDeleteConfirmEvent(selectedEvent)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                    Delete Event
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard