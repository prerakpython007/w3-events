import { type FC } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={` my-5 w-[50%] text-[#FFD5C2] m-auto top-0 z-50 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <a href="/contact" className=" hover:text-white transition-colors">
              Contact us
            </a>
            <a href="/about" className=" hover:text-white transition-colors">
              About
            </a>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="flex items-center">
              <img src="./logo.png" alt="" />
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-8">
            <a href="/events" className=" hover:text-white transition-colors">
              Events
            </a>
            <a href="/submit-event" className=" hover:text-white transition-colors">
              Submit event
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;