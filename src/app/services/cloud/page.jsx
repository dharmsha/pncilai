"use client";

import Layout from "../../../components/Layout/Layout";
import { motion } from "framer-motion";

const CloudSolutions = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-4 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            Cloud Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Future-ready, scalable, and secure cloud services for businesses of all sizes. Accelerate your digital transformation with our end-to-end cloud expertise.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Cloud Migration",
              desc: "Seamlessly move your applications and data to the cloud without disruption.",
            },
            {
              title: "DevOps & CI/CD",
              desc: "Automate deployment, scaling, and monitoring using best DevOps practices.",
            },
            {
              title: "Cloud Security",
              desc: "Advanced protection with encryption, access control, and compliance solutions.",
            },
            {
              title: "Cloud-Native Apps",
              desc: "Build modern applications that are scalable, resilient, and fast.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition duration-300 shadow-md"
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CloudSolutions;
