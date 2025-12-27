"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaAndroid,
  FaApple,
  FaServer,
  FaRocket,
  FaCodeBranch,
  FaSearch,
  FaPencilAlt,
  FaCogs,
  FaBug,
  FaUpload,
  FaSyncAlt,
  FaMobile,
} from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import Layout from "../../../components/Layout/Layout";

const technologies = [
  { icon: <SiFlutter className="text-3xl" />, name: "Flutter", description: "Beautiful native apps from a single codebase" },
  { icon: <FaReact className="text-3xl" />, name: "React Native", description: "JavaScript framework for cross-platform apps" },
  { icon: <FaAndroid className="text-3xl" />, name: "Android (Kotlin)", description: "Native Android development" },
  { icon: <FaApple className="text-3xl" />, name: "iOS (Swift)", description: "Native iOS development" },
];

const processSteps = [
  { icon: <FaSearch className="text-xl" />, title: "Discovery & Research", description: "Understand the user needs and market demands" },
  { icon: <FaPencilAlt className="text-xl" />, title: "UI/UX Design", description: "Craft visually appealing and intuitive designs" },
  { icon: <FaCogs className="text-xl" />, title: "Development", description: "Code, integrate APIs, and build robust features" },
  { icon: <FaBug className="text-xl" />, title: "Testing & QA", description: "Ensure flawless performance across devices" },
  { icon: <FaUpload className="text-xl" />, title: "Deployment", description: "Launch on Google Play & App Store" },
  { icon: <FaSyncAlt className="text-xl" />, title: "Maintenance", description: "Keep your app updated and bug-free" },
];

const features = [
  { icon: <FaMobile className="text-2xl" />, title: "Responsive Design", description: "Perfect experience on all devices" },
  { icon: <FaRocket className="text-2xl" />, title: "High Performance", description: "Lightning fast and efficient apps" },
  { icon: <FaServer className="text-2xl" />, title: "Backend Integration", description: "Seamless API and database connections" },
  { icon: <FaCodeBranch className="text-2xl" />, title: "Continuous Updates", description: "Regular feature enhancements" },
];

const MobileApps = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transform Your Ideas Into <span className="text-cyan-400">Mobile Experiences</span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl mb-8 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We build sleek, high-performance Android & iOS applications that users love
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30">
                  Start Your Project
                </button>
                <button className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-full border-2 border-white transition-all">
                  View Our Work
                </button>
              </motion.div>
            </div>
            
            <div className="flex-1 flex justify-center">
              {/* Abstract Phone Visualization */}
              <div className="relative">
                <div className="relative w-64 h-[500px] bg-gray-800 rounded-[40px] border-8 border-gray-900 shadow-2xl">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-lg"></div>
                  
                  <div className="absolute inset-4 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                    <div className="absolute inset-0 bg-grid-white/[0.05]">
                      <div className="absolute top-8 left-8 w-12 h-12 bg-white rounded-lg"></div>
                      <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full"></div>
                      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-white/80 rounded-full"></div>
                      
                      <motion.div 
                        className="absolute bottom-24 left-8 w-48 h-24 bg-white rounded-xl shadow-lg"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                      ></motion.div>
                      
                      <motion.div 
                        className="absolute bottom-24 right-8 w-48 h-24 bg-white/90 rounded-xl shadow-lg"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                      ></motion.div>
                      
                      <div className="absolute bottom-4 left-4 right-4 h-12 bg-white/90 rounded-full flex justify-around items-center">
                        {[1,2,3,4].map((item) => (
                          <div key={item} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="text-blue-600">Our Mobile Apps</span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We deliver solutions that stand out in performance and user experience
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="text-blue-600">Technology Stack</span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We use modern tools to build future-proof mobile applications
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4 text-indigo-500">{tech.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                <p className="text-gray-500">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="text-blue-600">Development Process</span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A streamlined approach to building successful mobile applications
            </motion.p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 z-0 hidden md:block"></div>
            
            <div className="space-y-12 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="md:w-5/12 mb-6 md:mb-0">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-full inline-block shadow-lg">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl text-blue-600">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/12 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  
                  <div className="md:w-6/12 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                    <div className="text-blue-500 font-bold mb-2">Step {index + 1}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <FaRocket className="text-5xl text-indigo-600 mx-auto mb-4" />
              <h4 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                Ready to Launch Your Mobile App?
              </h4>
              <p className="text-gray-600 mb-8 text-lg">
                From ideation to launch and beyond, we are your trusted tech partner for mobile app excellence.
              </p>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Let's Build Together
              </button>
            </div>
            
            {/* Floating tech icons */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-full shadow-lg">
              <SiFlutter className="text-3xl text-blue-400" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-full shadow-lg">
              <FaReact className="text-3xl text-blue-500" />
            </div>
            <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-full shadow-lg">
              <FaAndroid className="text-2xl text-green-500" />
            </div>
            <div className="absolute top-1/2 -left-8 bg-white p-3 rounded-full shadow-lg">
              <FaApple className="text-2xl text-gray-700" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MobileApps;