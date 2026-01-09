"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { courses } from "@/lib/data/courses";
import { BookOpen, Star } from "lucide-react";

export default function PopularByCategory() {
  // Get popular courses by category
  const businessCourses = courses
    .filter((c) => c.category === "Business")
    .slice(0, 3)
    .map((c) => ({
      ...c,
      type: c.certificate ? "Professional Certificate" : "Course",
    }));

  const dataCourses = courses
    .filter((c) => c.category === "Data Science")
    .slice(0, 3)
    .map((c) => ({
      ...c,
      type: c.certificate ? "Professional Certificate" : "Course",
    }));

  const techCourses = courses
    .filter((c) => c.category === "Computer Science" || c.category === "Information Technology" || c.category === "Artificial Intelligence")
    .slice(0, 3)
    .map((c) => ({
      ...c,
      type: c.certificate ? "Professional Certificate" : "Course",
    }));

  const categories = [
    {
      title: "Popular in Business",
      courses: businessCourses,
    },
    {
      title: "Popular in Data",
      courses: dataCourses,
    },
    {
      title: "Popular in Tech",
      courses: techCourses,
    },
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Most popular by category
          </h2>
          <div className="w-32 h-2 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Discover the most popular courses in each category, handpicked by our experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="space-y-8"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{category.title}</h3>
              {category.courses.map((course, index) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-gray-100 hover:border-primary"
                >
                  <div className="flex gap-6 p-6">
                    {/* Course Image/Icon */}
                    <div className="flex-shrink-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform shadow-lg relative">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                  <svg class="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                  </svg>
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-24 h-24 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    {/* Course Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg md:text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          {course.title}
                        </h4>
                        <p className="text-base font-semibold text-gray-600 mb-4">{course.type}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-base font-bold text-gray-700 ml-2">
                            {course.rating}
                          </span>
                        </div>
                        <span className="text-base text-gray-400">•</span>
                        <span className="text-base text-gray-600 font-semibold">
                          {course.courseType === "live" ? "Live" : "Self-Paced"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

