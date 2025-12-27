
 "use client";

import React from 'react';
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoCallOutline, IoMailOpenOutline } from 'react-icons/io5';

function TopBar() {
  return (
    <div className="bg-gray-900 text-white py-3 px-4 md:px-8 lg:px-12 text-sm border-b border-gray-700 w-full z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
        
        {/* Social Links */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <span className="font-semibold text-gray-300 hidden sm:block tracking-wide">Follow Us:</span>
          <div className="flex items-center gap-4 text-gray-300">
            <a href="https://www.linkedin.com/company/pencilai/" target="_blank" rel="noopener noreferrer" 
               className="hover:text-[#3b5998] transition-colors duration-200 ease-in-out">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.youtube.com/@PencilAiEdutech" target="_blank" rel="noopener noreferrer" 
               className="hover:text-[#ff0000] transition-colors duration-200 ease-in-out">
              <FaYoutube size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" 
               className="hover:text-[#0077b5] transition-colors duration-200 ease-in-out">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer" 
               className="hover:text-[#e1306c] transition-colors duration-200 ease-in-out">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-300 text-center sm:text-left">
          <a href="tel:9973725719" className="flex items-center gap-2 group hover:text-green-400 transition-colors">
            <IoCallOutline size={20} className="text-green-400 group-hover:text-green-300" />
            <span className="text-sm font-medium tracking-wide">+91 9262919322</span>
          </a>

          <span className="hidden sm:block w-px h-5 bg-gray-600"></span>

          <a href="mailto:support@creatorsmind.co.in" className="flex items-center gap-2 group hover:text-yellow-400 transition-colors">
            <IoMailOpenOutline size={20} className="text-yellow-400 group-hover:text-yellow-300" />
            <span className="text-sm font-medium tracking-wide">pencilaiedutech@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;