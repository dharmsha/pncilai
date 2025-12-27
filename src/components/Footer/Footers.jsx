// components/Footer.jsx
"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading with strong styling */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Get Connected With Us
          </h2>
          
          {/* Social icons with actual links */}
          <div className="flex justify-center space-x-4 mt-6">
            {[
              { 
                icon: <FaFacebookF className="text-lg" />, 
                color: "bg-blue-600 hover:bg-blue-700",
                link: "https://www.linkedin.com/company/pencilai/",
                label: "Facebook"
              },
              { 
                icon: <FaYoutube className="text-lg" />, 
                color: "bg-red-600 hover:bg-red-700",
                link: "https://www.youtube.com/@PencilAiEdutech",
                label: "YouTube"
              },
              { 
                icon: <FaInstagram className="text-lg" />, 
                color: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90",
                link: "https://www.instagram.com/?hl=en",
                label: "Instagram"
              },
              { 
                icon: <FaLinkedinIn className="text-lg" />, 
                color: "bg-blue-500 hover:bg-blue-600",
                link: "https://www.linkedin.com/company/pencil-ai/",
                label: "LinkedIn"
              },
              { 
                icon: <FaTwitter className="text-lg" />, 
                color: "bg-sky-500 hover:bg-sky-600",
                link: "https://twitter.com/PencilAiEdu",
                label: "Twitter"
              },
            ].map((social, index) => (
              <a 
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${social.color} transition-all duration-300 transform hover:scale-110`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Grid layout with strong borders and accents */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12 border-t border-gray-800 pt-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-500 inline-block">Quick Links</h3>
            <ul className="space-y-3 mt-4">
              {["Home", "Product", "Blog", "Contact Us"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform font-medium">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Popular Products */}
          <div>
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-500 inline-block">Popular Products</h3>
            <ul className="space-y-3 mt-4">
              {[
                "Turbo Tab", 
                "4K PTZ Pro Lens", 
                "4K Interactive Flat Panel", 
                "4K PTZ Camera", 
                "4 Channel HDMI"
              ].map((item, index) => (
                <li key={index} className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Pro Creator Kit */}
          <div>
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-500 inline-block">Pro Creator Kit</h3>
            <ul className="space-y-3 mt-4">
              {[
                "4K Viscocam", 
                "4K HDMI / SDI", 
                "Display Pen Tab", 
                "Wireless Microphones", 
                "Ring Lights"
              ].map((item, index) => (
                <li key={index} className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-500 inline-block">Resources</h3>
            <ul className="space-y-3 mt-4">
              {[
                "Blogs", 
                "Download", 
                "Product Guides", 
                "Tutorials & Videos"
              ].map((item, index) => (
                <li key={index} className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Who We Are */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-500 inline-block">Who We Are</h3>
            <p className="text-gray-300 mt-4 font-medium leading-relaxed">
              At PencilAi, we aim to equip everyone with advanced tools for dynamic and accessible experiences. 
              We are leaders in smart technology, making interactions engaging and interactive for all.
            </p>
            <div className="mt-6">
              <h4 className="font-bold text-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Contact Us
              </h4>
              <p className="text-gray-300 mt-2 hover:text-blue-400 transition-colors font-medium">
                <a href="tel:+919973725719">+91 9973725719</a>
              </p>
              <p className="text-gray-300 mt-1 hover:text-blue-400 transition-colors font-medium">
                <a 
                  href="mailto:pencilaiedutech@gmail.com" 
                  className="block md:inline break-all md:break-normal"
                >
                  pencilaiedutech@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 font-bold">
            © {currentYear} All rights reserved by PencilAi 
          </p>
          <p className="text-gray-500 mt-2 font-medium">
            Support: 
            <a 
              href="mailto:pencilaiedutech@gmail.com" 
              className="underline hover:text-blue-400 ml-1"
            >
              pencilaiedutech@gmail.com
            </a>
          </p>
        </div>
        
        {/* Back to top button */}
        <div className="text-center mt-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;