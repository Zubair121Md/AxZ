"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const courses = [
  {
    title: "Data Science, Machine Learning and Generative AI",
    type: "Certificate Course",
    mode: "Instructor-Led Online",
    duration: "2 Months",
    hours: "60+ Hours",
    lastDate: "Nov 30, 2025",
    certification: "Globally Recognized Certification",
    partner: "Microsoft",
  },
  {
    title: "Project Based Winter Internship Program 2025-26",
    type: "Project Based",
    mode: "Instructor-Led Online",
    duration: "2-6 Weeks",
    hours: "40+ Hours",
    lastDate: "Dec 14, 2025",
    certification: "Globally Recognized Certification",
    partner: "Amity x ZMT EdTech",
  },
  {
    title: "End-to-End Placement Program",
    type: "Placement Program",
    mode: "Instructor-Led Online",
    duration: "4-5 Months",
    hours: "250+ Hours",
    lastDate: "Ongoing",
    certification: "Globally Recognized Certification",
    partner: "Amity x ZMT EdTech",
  },
  {
    title: "Full Stack Web Development",
    type: "Certificate Course",
    mode: "Instructor-Led Online",
    duration: "3 Months",
    hours: "80+ Hours",
    lastDate: "Ongoing",
    certification: "Industry Recognized Certification",
    partner: "Amity x ZMT EdTech",
  },
];

export default function CourseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Live Programs and Courses
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn at your own pace and prepare yourself to excel! Be it training, internship, certification or placement, we are here to train you!
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <span className="text-accent font-semibold text-sm">
                        {course.type}
                      </span>
                      <h3 className="text-2xl font-bold text-primary-dark mt-2 mb-4">
                        {course.title}
                      </h3>
                      <div className="bg-primary/10 text-primary-dark text-sm px-3 py-1 rounded inline-block mb-4">
                        {course.certification}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold mr-2">Mode:</span>
                        {course.mode}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold mr-2">Duration:</span>
                        <span className="text-accent font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold mr-2">Hours:</span>
                        {course.hours}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold mr-2">Last Date:</span>
                        {course.lastDate}
                      </div>
                    </div>

                    <button className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                      Apply Now
                    </button>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous course"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Next course"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {courses.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-accent w-8" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

