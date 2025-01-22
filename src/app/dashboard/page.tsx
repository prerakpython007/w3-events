"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"
import { Yatra_One } from "next/font/google"
import { supabase } from "../../../lib/supabase"

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
  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    location: "",
    expires_on: "",
    image: null as File | null,
  })
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [isDragging, setIsDragging] = useState(false)
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

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setFormData(prev => ({ ...prev, image: file }))
  }

  const handleDeleteEvent = async (event: EventType) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id)

      if (!error) {
        // If the event has an image, delete it from storage
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
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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
        setFormData({
          title: "",
          event_date: "",
          location: "",
          expires_on: "",
          image: null
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "image" && files && files[0]) {
      handleImageUpload(files[0])
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }

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

        {/* Add Event Form Modal */}
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
                  <label className="block text-sm text-gray-400 mb-1">Event Date</label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
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
                  <label className="block text-sm text-gray-400 mb-1">Expires On</label>
                  <input
                    type="date"
                    name="expires_on"
                    value={formData.expires_on}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B] calendar-icon-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Cover Image</label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
                      isDragging ? "border-[#85472B] bg-[#85472B]/10" : "border-white/10 hover:border-[#85472B]"
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
                      <p className="text-sm text-gray-400 mb-1">Drag and drop your image here</p>
                      <p className="text-xs text-gray-500">or click to browse (max 5MB)</p>
                    </div>
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

        {/* Delete Confirmation Modal */}
        {deleteConfirmEvent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1E1E1E] rounded-xl p-6 max-w-md w-full relative"
            >
              <h2 className={`${yatraOne.className} text-xl font-bold mb-6 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
                Delete Event
              </h2>
              <p className="mb-6">Are you sure you want to delete "{deleteConfirmEvent.title}"? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmEvent(null)}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEvent(deleteConfirmEvent)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard