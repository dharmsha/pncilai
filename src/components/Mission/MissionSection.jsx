"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const missionItems = [
  {
    title: "Empower Educators",
    content:
      "We offer advanced tools like PTZ cameras, digital panels, AI software, and studio setups. These make teaching easier, letting teachers focus on inspiring students.",
  },
  {
    title: "Spark Student Engagement",
    content:
      "Interactive tools and visual aids create immersive experiences that keep students excited to learn and explore.",
  },
  {
    title: "Transform Learning",
    content:
      "By combining innovation with accessibility, we reshape traditional classrooms into dynamic, future-ready environments.",
  },
  {
    title: "Enhance Abilities",
    content:
      "Our solutions empower educators and learners to unlock new potential, fostering creativity and collaboration.",
  },
];

export default function MissionSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <section className="bg-black text-white px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Mission</h2>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/ai.jpg" // Replace with your image path
            alt="PencilAi"
            width={800}
            height={600}
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {missionItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4 font-semibold text-lg"
              >
                <span>{`${index + 1}. ${item.title}`}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-sm text-gray-300">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
