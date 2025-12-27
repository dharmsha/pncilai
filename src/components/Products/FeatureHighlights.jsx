"use client";

import { FaShippingFast, FaShieldAlt, FaTools, FaHeadset } from "react-icons/fa";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

const FeatureHighlights = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl" />,
      title: "FAST & FREE SHIPPING",
      description: "Delivery within 3-5 business days with no extra charges",
      color: "from-blue-500 to-cyan-400",
      delay: 0.1,
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "100% SECURE CHECKOUT",
      description: "Bank-level encryption for all transactions",
      color: "from-green-500 to-emerald-400",
      delay: 0.2,
    },
    {
      icon: <FaTools className="text-4xl" />,
      title: "EASY INSTALLATION",
      description: "Professional setup assistance included",
      color: "from-orange-500 to-amber-400",
      delay: 0.3,
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "PREMIUM SUPPORT",
      description: "24/7 expert assistance for all products",
      color: "from-purple-500 to-fuchsia-400",
      delay: 0.4,
    },
  ];

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".feature-item",
      { opacity: 1, y: 0 },
      { delay: stagger(0.1), duration: 0.5 }
    );
  }, [animate]);

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"
        ></motion.div>

        <motion.div
          initial={{ x: 100, y: 100 }}
          animate={{
            x: ["0%", "-100%", "0%"],
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[120px]"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Professional Solutions Delivered with Care
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "backOut",
            }}
            className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full mt-6 w-48"
          ></motion.div>
        </div>

        <div
          ref={scope}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: feature.delay,
                ease: "easeOut",
              }}
              whileHover={{
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/90 border border-gray-700 rounded-2xl p-8 h-full flex flex-col items-center text-center relative overflow-hidden backdrop-blur-sm text-white">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-xl blur-lg`}
                ></motion.div>

                <motion.div
                  whileHover={{
                    rotate: -10,
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl mb-6 z-10`}
                >
                  {feature.icon}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay + 0.2 }}
                  className="text-xl font-bold mb-3 group-hover:text-white transition-colors"
                >
                  {feature.title}
                </motion.h3>

                <p className="text-white text-sm mb-6 group-hover:text-white transition-colors z-10">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "64px" }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay + 0.3 }}
                  className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-auto`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: "easeOut",
          }}
          className="mt-16 bg-gradient-to-r from-gray-800/80 to-gray-900/90 border border-gray-700 rounded-2xl p-8 max-w-3xl mx-auto backdrop-blur-sm text-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Why Choose Our Professional Solutions?
            </h3>
            <p className="text-white">
              At PencilAi, we don't just deliver products - we deliver complete
              solutions. Our team of experts ensures that every aspect of your
              experience, from ordering to installation and support, is handled
              with the utmost professionalism and care. We stand behind our
              products with comprehensive warranties and a commitment to your
              complete satisfaction.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
