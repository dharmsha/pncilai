"use client";

import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import Layout from '@/components/Layout/Layout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bgCircles, setBgCircles] = useState([]);

  useEffect(() => {
    // Generate animated background circles only on client
    const circles = Array.from({ length: 10 }, () => ({
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      duration: Math.random() * 10 + 10
    }));
    setBgCircles(circles);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const contactCardVariants = {
    hover: {
      y: -10,
      backgroundColor: "#f0f8ff",
      transition: { duration: 0.3 }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#e6f7ff] py-16 px-4 md:px-10 relative">
        {/* Animated Background Circles (hydration-safe) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {bgCircles.map((circle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                width: `${circle.width}px`,
                height: `${circle.height}px`,
                top: `${circle.top}%`,
                left: `${circle.left}%`,
              }}
              animate={{
                x: [0, circle.x],
                y: [0, circle.y],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
              Have questions or want to discuss your project? Reach out to us! We're here to help.
            </p>
          </motion.div>

          {/* Main Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Contact Info (Left) */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10"></div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-white/30 inline-block">
                  Contact Information
                </h3>
              </motion.div>

              {[
                {
                  icon: <FaMapMarkerAlt className="text-xl" />,
                  title: "Our Office",
                  text: (
                    <>
                      PencilAi<br />
                      First Floor, Siyaram Mention, opposite Telephone Exchange,<br />
                      near P&M Mall, Kurji, Patna (Bihar), PIN: 800001
                    </>
                  )
                },
                {
                  icon: <FaPhoneAlt className="text-xl" />,
                  title: "Phone",
                  text: "+91 9262919322"
                },
                {
                  icon: <FaEnvelope className="text-xl" />,
                  title: "Email",
                  text: "pencilaiedutech@gmail.com"
                }
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} className="mb-8 relative z-10">
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                    variants={contactCardVariants}
                    whileHover="hover"
                  >
                    <div className="p-3 bg-white/20 rounded-full">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-white/90">{item.text}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form (Right) */}
            <motion.div variants={itemVariants} className="p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-blue-500 inline-block">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Your Name", name: "name", type: "text", placeholder: "Enter your name", delay: 0.2 },
                  { label: "Mobile Number", name: "phone", type: "tel", placeholder: "Enter your mobile number", delay: 0.3 },
                  { label: "Your Message", name: "message", type: "textarea", placeholder: "How can we help you?", delay: 0.4 }
                ].map(({ label, name, type, placeholder, delay }, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <div className="relative">
                      {type === "textarea" ? (
                        <textarea
                          name={name}
                          placeholder={placeholder}
                          rows={4}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pt-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                        />
                      ) : (
                        <input
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      )}
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        {/* icon can go here */}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Submit Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-white" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-green-100 text-green-700 rounded-lg text-center"
                  >
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">Our Location</h3>
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-blue-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
