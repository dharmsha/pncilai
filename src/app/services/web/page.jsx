"use client";
import Layout from "../../../components/Layout/Layout";
import { FaRocket, FaMobile, FaShoppingCart, FaCogs, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";

const WebDevelopment = () => {
  useEffect(() => {
    // Add scroll animation effect
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
          el.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 px-6 py-20 max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Transform Your Digital <span className="text-cyan-400">Presence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
          >
            We craft <span className="font-semibold">lightning-fast</span>, <span className="font-semibold">visually stunning</span> websites that convert visitors into customers
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a 
              href="#contact" 
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Get Your Free Quote
            </a>
            <a 
              href="#services" 
              className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full text-lg border-2 border-white transition-all duration-300"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '98%', label: 'Client Satisfaction' },
            { value: '250+', label: 'Projects Delivered' },
            { value: '0.5s', label: 'Avg. Load Time' },
            { value: '40%', label: 'Avg. Conversion Lift' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-800">{stat.value}</div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-blue-600">Web Development</span> Expertise</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge solutions tailored to your business goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="fade-in opacity-0 translate-y-10 transition-all duration-700 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Online Presence?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Let's build something amazing together. Get a free consultation and project estimate today.
          </p>
          
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get Your Free Quote</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Project Type</option>
                  <option>Business Website</option>
                  <option>E-commerce Store</option>
                  <option>Web Application</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea 
                placeholder="Tell us about your project..." 
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/30"
              >
                Request Free Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Services data
const services = [
  {
    icon: <FaRocket className="text-xl" />,
    title: "Modern Business Websites",
    description: "Professional sites that showcase your brand",
    features: [
      "SEO-optimized structure",
      "Lightning-fast performance",
      "Mobile-responsive design",
      "Content management system"
    ]
  },
  {
    icon: <FaShoppingCart className="text-xl" />,
    title: "E-commerce Solutions",
    description: "Online stores that convert visitors to buyers",
    features: [
      "Secure payment gateways",
      "Product management",
      "Inventory tracking",
      "Checkout optimization"
    ]
  },
  {
    icon: <FaCogs className="text-xl" />,
    title: "Web Applications",
    description: "Custom solutions for complex business needs",
    features: [
      "User authentication",
      "Database integration",
      "API development",
      "Real-time features"
    ]
  },
  {
    icon: <FaMobile className="text-xl" />,
    title: "Mobile-First Development",
    description: "Perfect experience on all devices",
    features: [
      "Responsive frameworks",
      "Touch-friendly interfaces",
      "Performance optimization",
      "Progressive Web Apps"
    ]
  },
  {
    icon: <FaChartLine className="text-xl" />,
    title: "Performance Optimization",
    description: "Blazing fast loading experiences",
    features: [
      "Speed audits",
      "Image optimization",
      "Code minification",
      "Caching strategies"
    ]
  },
  {
    icon: <FaShieldAlt className="text-xl" />,
    title: "Maintenance & Security",
    description: "Keep your site safe and updated",
    features: [
      "Security monitoring",
      "Regular backups",
      "Software updates",
      "24/7 technical support"
    ]
  }
];

export default WebDevelopment;