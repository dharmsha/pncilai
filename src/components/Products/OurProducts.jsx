"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const products = [
  {
    id: 1,
    title: "PencilAi Android A14 – AI-Powered 4K Interactive Flat Panel",
    subtitle: "Smart Digital Board for Modern Classrooms & Collaborative Learning",
    image: "/led.jpg",
    features: [
      "4K Ultra HD Display with Multi-Touch Support (20-Point Touch)",
      "Android 14 OS with EDLA Certification for Seamless App Integration",
      "AI-Powered Voice Control & Gesture Recognition System",
      "Built-in 8MP Camera with Auto-Framing for Video Conferencing",
      "Wireless Screen Sharing & Annotation Tools"
    ],
  },
  {
    id: 2,
    title: "PencilAi Android A14 Plus – Advanced Interactive Display",
    subtitle: "Enhanced Teaching Solution for Large Classrooms & Lecture Halls",
    image: "/led.jpg",
    features: [
      "86-inch 4K Display with Anti-Glare Technology",
      "AI-Assisted Lesson Planning & Content Creation Tools",
      "Dual Operating System (Android 14 + Windows 11 Pro)",
      "Integrated 12MP Camera with Speaker Tracking",
      "Multi-User Collaboration with Split-Screen Capability"
    ],
  },
  {
    id: 3,
    title: "PencilAi Android A14 Pro – Premium Interactive Panel",
    subtitle: "Enterprise-Grade Solution for Corporate Training & Universities",
    image: "/led.jpg",
    features: [
      "98-inch 4K Display with HDR10+ & Eye Comfort Technology",
      "AI-Powered Analytics for Student Engagement Tracking",
      "Enterprise Security Features with Remote Management",
      "Integrated Soundbar with Beamforming Microphones",
      "Smart Whiteboarding with Real-Time Collaboration"
    ],
  },
  {
    id: 4,
    title: "PencilAi Pro Studio Cam – 360° PTZ AI Camera",
    subtitle: "Professional-Grade Tracking Camera for Hybrid Learning Environments",
    image: "/ptz2.jpg",
    features: [
      "4K Ultra HD Resolution with 20x Optical Zoom",
      "360° Auto-Tracking with AI Subject Detection",
      "Dual HDMI/USB 3.0 Output for Flexible Connectivity",
      "Voice-Activated Camera Control & Preset Scenes",
      "Low-Light Optimization & Noise Reduction Technology"
    ],
  },
  {
    id: 5,
    title: "PencilAi Smart Mic – Intelligent Audio System",
    subtitle: "Crystal Clear Audio Capture for Any Learning Environment",
    image: "/airb.jpg",
    features: [
      "360° Omnidirectional Sound Capture (15ft Radius)",
      "AI-Powered Noise Cancellation & Echo Elimination",
      "Multi-Device Pairing via Bluetooth 5.2 & USB-C",
      "Voice Activity Detection for Automatic Activation",
      "Portable Design with 12-Hour Battery Life"
    ],
  },
  {
    id: 6,
    title: "PencilAi Light – Smart Lighting Solution",
    subtitle: "Professional Studio Lighting for Enhanced Visual Clarity",
    image: "/light.jpg",
    features: [
      "Adjustable Color Temperature (3000K-6500K)",
      "Smart Brightness Control with Ambient Light Sensor",
      "Flicker-Free Illumination with Uniform Diffusion",
      "Memory Presets for Different Teaching Scenarios",
      "Energy-Efficient LED Technology with 50,000+ Hour Lifespan"
    ],
  },
];

export default function PremiumProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <section className="bg-gradient-to-br from-[#0f0f1f] to-black text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute w-[700px] h-[700px] bg-purple-700 rounded-full blur-[200px] opacity-20 top-[-300px] right-[-300px] z-0" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-[200px] opacity-20 bottom-[-200px] left-[-200px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Premium Products
            </span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="flex h-full">
                <div className="w-1/2 p-4 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="rounded-xl object-contain h-64"
                  />
                </div>
                <div className="w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 mr-1" />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">(128 reviews)</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{product.subtitle}</p>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <span className="bg-blue-500 w-2 h-2 rounded-full mt-1 mr-3 block"></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-5 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-purple-700 transition-all">
                    More Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="p-4 flex items-center justify-center">
                <Image
                  src={products[currentSlide].image}
                  alt={products[currentSlide].title}
                  width={300}
                  height={300}
                  className="rounded-xl object-contain h-64"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">(128 reviews)</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{products[currentSlide].title}</h3>
                <p className="text-sm text-gray-400 mb-4">{products[currentSlide].subtitle}</p>
                <ul className="space-y-2 mb-4">
                  {products[currentSlide].features.map((feat, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="bg-blue-500 w-2 h-2 rounded-full mt-1 mr-3 block"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-5 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-purple-700 transition-all">
                  More Details
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800/80 p-3 rounded-full border border-gray-700 z-20"
            aria-label="Previous product"
          >
            <FaArrowLeft className="text-blue-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800/80 p-3 rounded-full border border-gray-700 z-20"
            aria-label="Next product"
          >
            <FaArrowRight className="text-blue-400" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-blue-500" : "bg-gray-600"
                }`}
                aria-label={`View product ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="max-w-4xl mx-auto mt-28 text-center">
          <h3 className="text-3xl font-bold mb-10">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              PencilAi Products?
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-Edge AI Technology",
                text: "Our products integrate advanced AI algorithms that adapt to your teaching style, automate routine tasks, and provide actionable insights to enhance learning outcomes.",
              },
              {
                title: "Seamless Ecosystem Integration",
                text: "All PencilAi devices work together in a unified ecosystem, creating a cohesive teaching environment that simplifies classroom management and enhances collaboration.",
              },
              {
                title: "Future-Proof Education Solutions",
                text: "Regular software updates and modular hardware design ensure your investment remains at the forefront of educational technology for years to come.",
              },
            ].map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-white font-bold text-xl">{i + 1}</div>
                </div>
                <h4 className="text-xl font-semibold mb-3">{reason.title}</h4>
                <p className="text-gray-400">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}