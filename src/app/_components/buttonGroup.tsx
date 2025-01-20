"use client"
import { FC } from "react";
import { motion } from "framer-motion";

const ButtonGroup: FC = () => {
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

  const buttons = [
    {
      text: "Joint Our Community",
      className: "border-[#2E2E2E] border-2 p-2 rounded-md hover:border-gray-500 transition-all duration-300"
    },
    {
      text: "Explore Events",
      className: "bg-gradient-to-b from-[#FF4E00] to-[#531900] hover:from-orange-400 hover:to-orange-600 transition-all p-2 rounded-md"
    },
    {
      text: "Submit Your Event",
      className: "border-[#2E2E2E] border-2 p-2 rounded-md hover:border-gray-500 transition-all duration-300"
    }
  ];

  return (
    <div className="button-group flex lg: mt-10 flex-col sm:flex-row gap-3">
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
        >
          {button.text}
        </motion.button>
      ))}
    </div>
  );
};

export default ButtonGroup;