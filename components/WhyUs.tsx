"use client";

import { motion } from "framer-motion";
import { Globe, BookOpen, Users, GraduationCap, Heart, Headphones } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Quality Training",
    description: "We teach the skills needed to design, develop, and implement technology into the real world.",
  },
  {
    icon: BookOpen,
    title: "Updated Curriculum",
    description: "We are globally known to bring latest technologies, innovation and advancements in our curriculum.",
  },
  {
    icon: Users,
    title: "Experienced Instructors",
    description: "All our instructors are from top-notch universities having years of teaching experience in their domain.",
  },
  {
    icon: GraduationCap,
    title: "250+ Courses",
    description: "Amity x ZMT EdTech offers multiple courses all across the techno-managerial fields with most updated curriculum.",
  },
  {
    icon: Heart,
    title: "Dedicated Team",
    description: "We are a bunch of passion-driven graduates with a vision to redefine the technical education.",
  },
  {
    icon: Headphones,
    title: "Helpline 24x7",
    description: "Our dedicated team of executives is easily approachable at any point of time, in case you need some assistance.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Amity x ZMT EdTech?
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

