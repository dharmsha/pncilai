"use client";

import Layout from "../../../components/Layout/Layout";
import { motion } from "framer-motion";

const AIProductPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white py-16 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 mb-4">
            AI-Powered Digital Board
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Revolutionize your classroom, studio, or meeting room with our intelligent, interactive, and cloud-connected AI Digital Board — designed for tomorrow’s minds.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Voice Commands",
              desc: "Control board functions using natural language with built-in voice AI.",
            },
            {
              title: "Smart Annotations",
              desc: "Convert handwritten notes into digital text with precision recognition.",
            },
            {
              title: "Cloud Sync",
              desc: "Real-time syncing of your content to the cloud for universal access.",
            },
            {
              title: "Gesture Controls",
              desc: "Navigate and interact using simple hand gestures — no remote needed.",
            },
            {
              title: "Multi-user Access",
              desc: "Enable collaboration with multiple users across locations.",
            },
            {
              title: "Analytics & Reports",
              desc: "Get intelligent reports and usage stats through AI analytics.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition duration-300 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-semibold text-indigo-400 mb-4">Why Choose Our AI Board?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Designed for educators, creators, and professionals, our Digital AI Board combines cutting-edge artificial intelligence with seamless user experience. Easy to install, simpler to use.
          </p>
          <button className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-full text-lg transition-all">
            Book a Demo Now
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AIProductPage;
