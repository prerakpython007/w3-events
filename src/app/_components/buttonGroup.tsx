"use client"
import { FC } from "react";

const ButtonGroup: FC= () => {
  return (
    <div className="button-group flex space-x-3">
      <button className="border-[#2E2E2E] border-2 p-2 rounded-md ">Joint Our Community</button>
      <button className=" bg-gradient-to-b from-[#FF4E00] to-[#531900] hover:from-orange-400 hover:to-orange-600 transition-all p-2 rounded-md ">Explore Events</button>
      <button className="border-[#2E2E2E] border-2 p-2 rounded-md ">Submit Your Event</button>
    </div>
  )

}

export default ButtonGroup;