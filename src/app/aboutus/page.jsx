"use client";

import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "@/components/Layout/Layout";
import { FiTarget, FiEye, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const AboutUs = () => {
  const teamMembers = [
    // {
    //   name: "Mohnish Vats",
    //   role: "Founder & CEO",
    //   bio: "Tech visionary with 10+ years in digital transformation",
    //   image: "/manish.jpg", // Place in public/images/
    //   social: {
    //     linkedin: "",
       
    //     email: "mailto:mohnish@example.com",
    //   },
    // },
    // {
    //   name: "Gandharv Vats",
    //   role: "CMO",
    //   bio: "Visionary marketing leader with a passion for crafting powerful brand stories and driving measurable growth",
    //   image: "/gandharv.jpg", // Place in public/images/
    //   social: {
    //     linkedin: "",
        
    //     email: "mailto:gandharv@example.com",
    //   },
    // },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Head>
        <title>About Us - PencilAi</title>
        <meta
          name="description"
          content="Learn about our mission, vision, and talented team"
        />
      </Head>
      <Layout>
        <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900">
          {/* Hero Section */}
          <section className="relative py-20 px-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 left-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                About PencilAi
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Where <span className="font-bold text-purple-600">creativity</span> meets{" "}
                <span className="font-bold text-blue-600">technology</span> to build digital
                experiences that matter
              </motion.p>
            </div>
          </section>

          {/* Mission & Vision */}
          <motion.section
            className="max-w-6xl mx-auto grid gap-16 md:grid-cols-2 px-4 py-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
              variants={itemVariants}
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FiTarget className="text-blue-600 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We empower visionaries with cutting-edge digital solutions. From responsive
                websites to scalable cloud systems, we build tools that transform ideas into
                thriving digital businesses.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100"
              variants={itemVariants}
            >
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FiEye className="text-purple-600 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To create a world where technology amplifies human potential. We envision
                digital experiences so intuitive they feel like magic, driving innovation
                across industries.
              </p>
            </motion.div>
          </motion.section>

          {/* Team Section */}
          <section className="py-16 px-4">
            {/* <div className="max-w-6xl mx-auto text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Meet The Innovators
              </motion.h2>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our team combines technical expertise with creative passion
              </motion.p>
            </div> */}

            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="p-6 -mt-16">
                    <div className="bg-white rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.social.github}
                        className="text-gray-500 hover:text-gray-900 transition"
                        target="_blank"
                      >
                        <FiGithub size={20} />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-gray-500 hover:text-blue-700 transition"
                        target="_blank"
                      >
                        <FiLinkedin size={20} />
                      </a>
                      <a
                        href={member.social.email}
                        className="text-gray-500 hover:text-red-600 transition"
                      >
                        <FiMail size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <motion.section
            className="py-20 px-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Bring Your Vision to Life?
              </h2>
              <p className="text-gray-700 text-xl mb-8">
                Let's collaborate and create something extraordinary together
              </p>
              <motion.a
                href="/contact"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.a>
            </div>
          </motion.section>
        </main>
      </Layout>
    </>
  );
};

export default AboutUs;
