"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Layout from '@/components/Layout/Layout';
export default function OurMission() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
     <Layout>
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
          >
            Our Mission at <span className="text-blue-600">PencilAi</span>
          </motion.h1>
          
          <motion.div variants={itemVariants}>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl mx-auto">
              Empowering educators to go digital with confidence
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 text-left mb-20">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white shadow-2xl p-8 rounded-2xl border-l-4 border-blue-500 relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-40"></div>
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-700">Why Pencil.ai?</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Pencil.ai is more than a tech solution — it's your digital transformation
              partner. We help teachers, institutes, and educators transition from
              offline to online by providing everything they need: from professional
              websites and mobile applications to complete branding, marketing, and student management solutions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white shadow-2xl p-8 rounded-2xl border-l-4 border-indigo-500 relative overflow-hidden"
          >
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full opacity-40"></div>
            <div className="flex items-start mb-6">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-700">100% Support, Every Step</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our team works side-by-side with educators to make the digital shift
              easy and effective. Whether you're just starting or scaling, we provide
              full tech support, custom app/website development, training, and ongoing
              guidance so you can focus on what you do best: teaching.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl leading-relaxed">
              To become the most trusted platform for educators by enabling every teacher
              in India — no matter how big or small — to create a powerful online
              presence and grow their impact globally.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
    </Layout>
  );
}