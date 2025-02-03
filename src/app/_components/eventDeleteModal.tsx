"use client"
import { motion } from "framer-motion"
import { Yatra_One } from "next/font/google"

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
}) as { className: string }

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  eventTitle: string
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1E1E1E] rounded-xl p-6 max-w-md w-full relative"
      >
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
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteConfirmationModal;