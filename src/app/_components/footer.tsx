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
    <div className="">
        <Image 
          src="/div.png" 
          alt="" 
          width={700} 
          height={400}
          className="w-[50%] m-auto"
        />
      
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
        <div className="flex justify-center">
        <button className="bg-[#DA5B23] p-2 rounded-xl mt-4" >Send Message</button>
        </div>
        
      </div>
      <hr className="w-[1300px] opacity-15 m-auto mt-36" />
      <div className="grid grid-cols-2 w-[1300px]  pt-8">
        <div className="flex space-x-8 pt-8">
            <p>© 2024 Web3events</p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
        </div>
        <div className="flex space-x-4 justify-end pt-8">
            <Image
            src={"/vector1.png"}
            alt="img"
            width={10}
            height={100}
            className="w-4 h-4"
            />
            <Image
            src={"/vector2.png"}
            alt="img"
            width={100}
            height={100}
            className="w-4 h-4"
            />
            <Image
            src={"/vector3.png"}
            alt="img"
            width={100}
            height={100}
            className="w-4 h-4"
            />
        </div>
        <div className="pt-8 text-sm text-[#646464]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>


      </div>
    </div>
  );
}

export default Footer;