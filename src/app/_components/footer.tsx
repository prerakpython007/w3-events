"use client"
import Image from "next/image";
import { Yatra_One } from "next/font/google";
const yatraOne = Yatra_One({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yatra'
  });

const Footer = () => {
  return (
    <footer className="w-full relative">
      <div className="w-full">
        <Image 
          src="/div.png" 
          alt="" 
          width={500} 
          height={500}
          className="w-full"
        />
      </div>
      <div className=" pt-32 text-center">

        <h1 className={`${yatraOne.className} text-transparent  bg-clip-text bg-gradient-to-b from-[#F0F0F0] to-[#DA5B23] text-5xl z-20 `}>Be Among the First to <br /> Redefine Connection!</h1>
        <p className="text-[#CAC9CE] pt-5">Join our early access and unlock exclusive features. Get a <br /> head start in redefining how you connect, share, and <br /> explore.</p>
      </div>
      <div className="w-56 m-auto">
        <input type="text"
        placeholder="Name"
        className="bg-[#0C0C0C] my-5 w-[50% ] h-10 rounded-lg border-2  border-[#4E2616] text-[#CAC9CE] pl-5"
        />
        <input type="text"
        placeholder="soulspace@gmail.com"
        className="bg-[#0C0C0C] w-[50% ] h-10 rounded-lg border-2  border-[#4E2616] text-[#CAC9CE] pl-5"
        />
        <button></button>
      </div>
    </footer>
  );
}

export default Footer;