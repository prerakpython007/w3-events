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
    <div className="px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <Image 
        src="/div.png" 
        alt="" 
        width={700} 
        height={400}
        className="w-full md:w-[70%] lg:w-[50%] mx-auto"
        priority
      />
      
      <div className="pt-16 md:pt-24 lg:pt-32 text-center">
        <h1 className={`${yatraOne.className} text-transparent bg-clip-text bg-gradient-to-b from-[#F0F0F0] to-[#DA5B23] text-3xl md:text-4xl lg:text-5xl z-20`}>
          Be Among the First to <br className="hidden sm:block" /> Redefine Connection!
        </h1>
        <p className="text-[#CAC9CE] pt-3 md:pt-5 text-sm md:text-base px-4">
          Join our early access and unlock exclusive features. Get a <br className="hidden md:block" /> 
          head start in redefining how you connect, share, and <br className="hidden md:block" /> 
          explore.
        </p>
      </div>

      <div className="w-full max-w-sm mx-auto px-4 mt-8">
        <div className="space-y-4">
          <input 
            type="text"
            placeholder="Name"
            className="bg-[#0C0C0C] w-full h-10 rounded-lg border-2 border-[#4E2616] text-[#CAC9CE] px-5"
          />
          <input 
            type="text"
            placeholder="soulspace@gmail.com"
            className="bg-[#0C0C0C] w-full h-10 rounded-lg border-2 border-[#4E2616] text-[#CAC9CE] px-5"
          />
          <div className="flex justify-center">
            <button className="bg-[#DA5B23] px-6 py-2 rounded-xl mt-2 hover:bg-[#c24d1d] transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>

      <hr className="w-full max-w-[90%] lg:max-w-[1300px] opacity-15 mx-auto mt-20 md:mt-28 lg:mt-36" />

      <div className="max-w-[90%] lg:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* Top section */}
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 text-sm text-center md:text-left">
            <p>© 2024 Web3events</p>
            <p className="hover:text-[#DA5B23] cursor-pointer">Privacy Policy</p>
            <p className="hover:text-[#DA5B23] cursor-pointer">Terms of Use</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 justify-center md:justify-end">
            {["/vector1.png", "/vector2.png", "/vector3.png"].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt="social icon"
                width={16}
                height={16}
                className="w-4 h-4 hover:opacity-80 cursor-pointer"
              />
            ))}
          </div>

          {/* Bottom text */}
          <div className="text-sm text-[#646464] col-span-1 md:col-span-2  space-y-4 text-center md:text-left">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;