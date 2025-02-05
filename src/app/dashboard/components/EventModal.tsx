"use client"
import { motion } from "framer-motion"
import { X, Upload } from "lucide-react"
import { Yatra_One } from "next/font/google"
import { ChangeEvent, FormEvent, useState, useCallback } from "react"

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
}) as { className: string }

interface EventModalProps {
  isOpen: boolean
  mode: 'add' | 'delete'
  onClose: () => void
  onSubmit?: (formData: {
    title: string
    event_date: string
    location: string
    expires_on: string
    image: File | null
    registration_link: string
    organizer_name: string
    organizing_company: string
  }) => void
  onConfirmDelete?: () => void
  eventTitle?: string
}

const EventModal = ({ 
  isOpen, 
  mode,
  onClose, 
  onSubmit,
  onConfirmDelete,
  eventTitle 
}: EventModalProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dateError, setDateError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    location: "",
    expires_on: "",
    image: null as File | null,
    registration_link: "",
    organizer_name: "",
    organizing_company: ""
  })

  const validateDates = useCallback(() => {
    const eventDate = new Date(formData.event_date)
    
    // Reset error state
    setDateError("")
    
    // Only check if expiry date is before event date
    if (new Date(formData.expires_on) < eventDate) {
      setDateError("Expiry date must be after or equal to the event date")
      return false
    }
    
    return true
}, [formData.event_date, formData.expires_on])

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setFormData(prev => ({ ...prev, image: file }))
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "image" && files && files[0]) {
      handleImageUpload(files[0])
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
      // Clear date error when dates are modified
      if (name === "event_date" || name === "expires_on") {
        setDateError("")
      }
    }
  }, [handleImageUpload])

  // In the EventModal component, remove or modify validateDates:
const handleSubmit = useCallback((e: FormEvent) => {
  e.preventDefault()
  
  if (mode === 'add' && onSubmit) {
    // Format dates for Supabase
    const formattedData = {
      ...formData,
      event_date: new Date(formData.event_date).toISOString(),
      expires_on: new Date(formData.expires_on).toISOString()
    }
    
    onSubmit(formattedData)
    setFormData({
      title: "",
      event_date: "",
      location: "",
      expires_on: "",
      image: null,
      registration_link: "",
      organizer_name: "",
      organizing_company: ""
    })
  }
}, [mode, onSubmit, formData])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }, [handleImageUpload])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#1E1E1E] rounded-xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
      >
        {mode === 'add' && (
          <>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className={`${yatraOne.className} text-xl font-bold mb-6 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
              Add New Event
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {dateError && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-500 text-sm">
                  {dateError}
                </div>
              )}
              
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
                  min={new Date().toISOString().split('T')[0]}
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
                <label className="block text-sm text-gray-400 mb-1">Registration Link</label>
                <input
                  type="url"
                  name="registration_link"
                  value={formData.registration_link}
                  onChange={handleChange}
                  placeholder="https://"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Organizer's Name</label>
                <input
                  type="text"
                  name="organizer_name"
                  value={formData.organizer_name}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#85472B]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Organizing Company</label>
                <input
                  type="text"
                  name="organizing_company"
                  value={formData.organizing_company}
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
                <label className="block text-sm text-gray-400 mb-1">Event Banner</label>
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
          </>
        )}

        {mode === 'delete' && (
          <>
            <h2 className={`${yatraOne.className} text-xl font-bold mb-6 bg-gradient-to-r from-white to-[#85472B] bg-clip-text text-transparent`}>
              Delete Event
            </h2>
            <p className="mb-6">Are you sure you want to delete "{eventTitle}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default EventModal;