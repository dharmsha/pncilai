"use client";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useState, useEffect } from "react";

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const products = [
    {
      id: 1,
      name: "4K PTZ Camera Pro",
      description: "Professional 4K PTZ camera with AI tracking, exceptional low-light performance, and silent operation for conference rooms and live streaming.",
      detailedDescription: "The PencilAI 4K PTZ Camera Pro delivers cinema-quality video with ultra-smooth pan, tilt, and zoom controls. Featuring Sony's premium 1/2.5-inch CMOS sensor, this camera captures stunning 4K resolution at 60fps. Our AI-powered subject tracking automatically keeps you in frame, while advanced noise reduction ensures crystal-clear video even in low-light conditions. Perfect for conference rooms, lecture halls, worship spaces, and professional streaming setups.",
      image: "/4kcamera.png",
      features: [
        "True 4K Ultra HD Resolution (3840×2160) at 60fps", 
        "20x Optical Zoom with Auto Focus", 
        "AI-Powered Speaker Tracking", 
        "Preset Positions (Up to 255)", 
        "Noise-Free Operation (<25 dBA)",
        "3G-SDI, HDMI, and IP Stream Outputs",
        "RS-232 and RS-422 Control Interfaces"
      ],
      price: "₹85,000-95,000",
      rating: 4.8,
      reviews: 1245
    },
    {
      id: 2,
      name: "4K Teaching Camera",
      description: "Specialized 4K camera designed for educational environments with whiteboard detection and educator tracking.",
      detailedDescription: "The PencilAI 4K Teaching Camera is specifically engineered for educational institutions. It features advanced whiteboard and document capture technology that automatically enhances text clarity and eliminates glare. The AI tracking seamlessly follows the educator around the classroom while intelligently switching to content focus when approaching the whiteboard. With its wide 75° field of view and 12x zoom, it captures both the instructor and teaching materials perfectly.",
      image: "/4kcamera for teaching.png",
      features: [
        "4K UHD Resolution with HDR", 
        "Whiteboard Content Enhancement", 
        "Dual Tracking (Instructor + Content)", 
        "Wide 75° Field of View", 
        "Auto Framing and Composition",
        "Built-in Audio Capture with Noise Reduction",
        "Education-focused Preset Modes"
      ],
      price: "₹78,000-88,000",
      rating: 4.7,
      reviews: 892
    },
    {
      id: 3,
      name: "Interactive Digital Board (75-inch)",
      description: "Large-format interactive display with multi-touch support, 4K resolution, and collaborative software suite.",
      detailedDescription: "Transform your classroom or boardroom with our 75-inch Interactive Digital Board. Featuring infrared touch technology that supports up to 20 simultaneous touch points, this display enables truly collaborative experiences. The anti-glare 4K UHD panel delivers stunning visuals from any viewing angle. Comes pre-loaded with PencilAI's collaborative software suite including whiteboard, screen sharing, and lesson recording capabilities. With built-in WiFi, Bluetooth, and multiple connectivity options, it integrates seamlessly with your existing devices.",
      image: "/digitalboardforteaching.png",
      features: [
        "75-inch 4K UHD Anti-Glare Display", 
        "20-Point Multi-Touch Support", 
        "Built-in Collaborative Software Suite", 
        "Wireless Screen Sharing", 
        "Android 11 with App Store",
        "HDMI, USB-C, and VGA Inputs",
        "Built-in 4K Camera and Array Microphones"
      ],
      price: "₹1,45,000-1,60,000",
      rating: 4.9,
      reviews: 987
    },
    {
      id: 4,
      name: "Interactive Digital Board (65-inch)",
      description: "Versatile 65-inch interactive display perfect for medium-sized classrooms and meeting rooms.",
      detailedDescription: "The 65-inch Interactive Digital Board strikes the perfect balance between size and functionality. Featuring the same professional-grade touch technology as our larger model, this display offers 10-point multi-touch precision and palm rejection technology. The 4K resolution ensures razor-sharp text and graphics, making it ideal for detailed presentations and educational content. With its integrated computing module, you can turn any wall into an interactive smart board without external devices.",
      image: "/digitalboard.png",
      features: [
        "65-inch 4K UHD Display", 
        "10-Point Multi-Touch with Palm Rejection", 
        "Integrated Android Computing Module", 
        "Wireless Mirroring from Any Device", 
        "Split-Screen and Multi-User Capability",
        "Built-in 30W Stereo Speakers",
        "Vandal-Resistant Tempered Glass"
      ],
      price: "₹1,25,000-1,35,000",
      rating: 4.6,
      reviews: 770
    },
    {
      id: 5,
      name: "Interactive Digital Board (55-inch)",
      description: "Compact 55-inch interactive display for small classrooms, huddle rooms, and executive offices.",
      detailedDescription: "Our 55-inch Interactive Digital Board brings advanced collaboration capabilities to smaller spaces. Despite its compact size, it delivers the same professional features as larger models, including 4K resolution, multi-touch support, and built-in collaboration tools. The ultra-thin bezel design maximizes screen real estate while the modular design allows for easy maintenance and upgrades. Perfect for executive offices, small conference rooms, and specialized teaching environments.",
      image: "/digitalboard.png",
      features: [
        "55-inch 4K UHD Display", 
        "6-Point Multi-Touch Support", 
        "Ultra-Thin Bezel Design", 
        "Modular Design for Easy Service", 
        "Built-in Whiteboard and Annotation Tools",
        "Mobile Casting App Included",
        "Wall Mount or Mobile Stand Options"
      ],
      price: "₹80,000-90,000",
      rating: 4.6,
      reviews: 654
    },
    {
      id: 6,
      name: "PencilAI Studio Mic",
      description: "Professional USB microphone with AI noise suppression and studio-quality audio for recordings and conferences.",
      detailedDescription: "The PencilAI Studio Mic delivers broadcast-quality audio in a compact design. Using advanced AI algorithms, it isolates voice while eliminating background noise, keyboard clicks, and echo. The cardioid pickup pattern captures clear audio from the front while rejecting noise from other directions. With its plug-and-play USB-C connectivity, you get professional audio quality without complicated setups. Perfect for podcasting, video recording, and crystal-clear conference calls.",
      image: "/microphone.png",
      features: [
        "AI-Powered Noise Suppression", 
        "Cardioid Pickup Pattern", 
        "Studio-Quality 24-bit/96kHz Audio", 
        "USB-C Plug-and-Play Connectivity", 
        "Built-in Monitoring Headphone Jack",
        "Desktop Stand and Mount Included",
        "Mute Touch Control with LED Indicator"
      ],
      price: "₹15,000-25,000",
      rating: 4.7,
      reviews: 756
    },
    {
      id: 7,
      name: "PencilAI Wireless Mic System",
      description: "Professional wireless microphone system with lapel and handheld options for presentations and events.",
      detailedDescription: "Our PencilAI Wireless Mic System offers complete audio freedom for presenters, educators, and performers. The system includes both lapel and handheld microphones that connect to a compact receiver with 2.4GHz digital transmission for crystal-clear audio without dropouts. With 100m operating range and 8-hour battery life, it's perfect for large rooms and all-day events. The automatic frequency selection avoids interference while the intuitive controls make setup effortless.",
      image: "/wirelessmc.png",
      features: [
        "2.4GHz Digital Wireless Transmission", 
        "100m Operating Range", 
        "Dual Channel (2 Microphones Simultaneously)", 
        "Lapel and Handheld Microphones Included", 
        "8-Hour Battery Life",
        "Auto Frequency Selection",
        "Compact Receiver with USB and XLR Outputs"
      ],
      price: "₹25,000-35,000",
      rating: 4.5,
      reviews: 432
    },
    {
      id: 8,
      name: "PencilAI OBS Controller",
      description: "Stream deck controller with customizable buttons for live production and streaming workflows.",
      detailedDescription: "Take control of your live productions with the PencilAI OBS Controller. This compact stream deck features 12 fully customizable LCD buttons that can trigger scenes, switch sources, control audio, and launch media with a single touch. The intuitive software allows you to create complex workflows for OBS, vMix, and other production software. With its USB connectivity and built-in stand, it's the perfect companion for live streamers, video producers, and presentation technicians.",
      image: "/ops.png",
      features: [
        "12 Customizable LCD Buttons", 
        "OBS, vMix, and Zoom Integration", 
        "Multi-Layer Configuration Support", 
        "Plug-and-Play USB Connectivity", 
        "Backlit Keys with Adjustable Brightness",
        "Macro Recording and Automation",
        "Portable Design with Non-Slip Base"
      ],
      price: "₹12,000-18,000",
      rating: 4.4,
      reviews: 287
    },
    {
      id: 9,
      name: "PencilAI Media Server",
      description: "Powerful media server for recording, streaming, and managing AV content across multiple displays.",
      detailedDescription: "The PencilAI Media Server is the brain of your AV ecosystem. This powerful device handles recording, live streaming, content management, and display control from a single interface. With support for 4K encoding, multi-camera switching, and simultaneous streaming to multiple platforms, it's the complete solution for professional media production. The intuitive web-based interface allows control from any device, while the robust hardware ensures reliable operation 24/7.",
      image: "/pcser.png",
      features: [
        "4K Video Encoding and Streaming", 
        "Multi-Camera Switching and Recording", 
        "Simultaneous Platform Streaming", 
        "Web-Based Control Interface", 
        "Network Display Management",
        "Automatic Recording and Storage",
        "Redundant Power and Cooling"
      ],
      price: "₹95,000-1,20,000",
      rating: 4.8,
      reviews: 521
    },
    {
      id: 10,
      name: "PencilAI Complete Studio Bundle",
      description: "Everything you need for professional video production in one complete package.",
      detailedDescription: "The PencilAI Complete Studio Bundle provides a turnkey solution for professional video production. This comprehensive package includes our 4K PTZ Camera, Studio Mic, Media Server, and OBS Controller - all optimized to work seamlessly together. With our integrated software platform, you can manage recording, streaming, and content distribution from a single interface. Perfect for educational institutions, corporate studios, houses of worship, and content creators who want a professional setup without the complexity.",
      image: "/fullSetupForTeaching.png",
      features: [
       "4K PTZ Camera with AI Auto-Tracking", 
  "Interactive Flat Panel with AI Integration", 
  "Studio-Grade Microphone with Noise Cancellation", 
  "Media Server with Advanced Streaming Capabilities", 
  "OBS Controller for Seamless Production Control",
  "Professional Lighting Setup",  
  "Integrated Software Management Platform",
  "High-Quality Cabling and Accessories",
  "Single-Vendor Support with Warranty"
      ],
      price: "₹2,50,000-3,75,000",
      rating: 4.9,
      reviews: 389
    }
  ];

  // Auto-rotate products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleRequestDemo = () => {
    window.location.href = "tel:+919262919322";
  };

  const handleContact = () => {
    window.location.href = "tel:+919262919322";
  };

  return (
    <Layout>
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">PencilAI</span> Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our suite of professional AV equipment designed to transform your presentations, classrooms, and streaming setups
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative overflow-hidden rounded-3xl mb-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeProduct * 100}%)` }}
            >
              {products.map((product, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div 
                    className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    <div className="relative h-60 w-full flex items-center justify-center bg-gray-100">
                      <div className="relative h-48 w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        New
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {product.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${activeProduct === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setActiveProduct(index)}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <div className="relative h-60 w-full flex items-center justify-center bg-gray-100">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your AV Experience?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of educational institutions, businesses, and content creators who have elevated their production quality with PencilAI products
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={handleContact}
                  className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
                >
                  Contact Our Experts
                </button>
                <button 
                  onClick={handleRequestDemo}
                  className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition duration-300 transform hover:-translate-y-1"
                >
                  Request Live Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="relative h-72 md:h-96 w-full flex items-center justify-center bg-gray-100">
              <div className="relative h-64 w-full md:h-80">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured Product
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{selectedProduct.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">{selectedProduct.detailedDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Features</h3>
                  <ul className="space-y-3">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Pricing & Warranty</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{selectedProduct.price}</div>
                  <div className="text-gray-600 mb-6">One-time purchase with 3-year comprehensive warranty</div>
                  
                  <div className="flex items-center text-gray-600 mb-6">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free installation and setup</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free shipping across India</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={handleRequestDemo}
                  className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300"
                >
                  Request Demo
                </button>
              </div>
              
              <div className="mt-6 text-center text-gray-500">
                {selectedProduct.reviews}+ satisfied customers
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}