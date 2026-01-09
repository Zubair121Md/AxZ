"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { courses, roles, categories, professionalCertificates, trendingSkills } from "@/lib/data/courses";
import { checkAuth } from "@/lib/auth";
import { BookOpen, Star } from "lucide-react";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [activeFilter, setActiveFilter] = useState("all");
  const [courseTypeFilter, setCourseTypeFilter] = useState<"all" | "live" | "self-paced">("all");

  useEffect(() => {
    // Ensure page can scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const role = searchParams.get("role");
    const category = searchParams.get("category");
    const skill = searchParams.get("skill");
    const certificate = searchParams.get("certificate");
    const search = searchParams.get("search");
    const view = searchParams.get("view");

    let filtered = [...courses];

    if (role) {
      const roleLower = role.toLowerCase();
      filtered = filtered.filter((c) => 
        c.skills.some((s) => s.toLowerCase().includes(roleLower)) ||
        c.title.toLowerCase().includes(roleLower) ||
        c.description.toLowerCase().includes(roleLower) ||
        c.category.toLowerCase().includes(roleLower)
      );
      setActiveFilter(`role:${role}`);
    } else if (category) {
      filtered = filtered.filter((c) => c.category === category);
      setActiveFilter(`category:${category}`);
    } else if (skill) {
      filtered = filtered.filter((c) => 
        c.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())) ||
        c.title.toLowerCase().includes(skill.toLowerCase()) ||
        c.description.toLowerCase().includes(skill.toLowerCase())
      );
      setActiveFilter(`skill:${skill}`);
    } else if (certificate) {
      filtered = filtered.filter((c) => c.category === certificate && c.certificate);
      setActiveFilter(`certificate:${certificate}`);
    } else if (search) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
      setActiveFilter(`search:${search}`);
    } else if (view === "roles") {
      setActiveFilter("roles");
      // Show all courses when viewing roles list
    } else if (view === "categories") {
      setActiveFilter("categories");
      // Show all courses when viewing categories list
    } else if (view === "certificates") {
      setActiveFilter("certificates");
      // Show all courses when viewing certificates list
    } else if (view === "skills") {
      setActiveFilter("skills");
      // Show all courses when viewing skills list
    } else {
      setActiveFilter("all");
    }

    // Apply course type filter (only if not showing a view list)
    if (courseTypeFilter !== "all" && !view) {
      filtered = filtered.filter((c) => c.courseType === courseTypeFilter);
    }
    
    setFilteredCourses(filtered);
  }, [searchParams, courseTypeFilter]);

  return (
    <div className="w-full">
      <Navbar />
      <main className="pt-26 w-full pb-8">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Courses</h1>
            <p className="text-lg text-gray-600">Discover thousands of courses to advance your career</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-4">
              <Link
                href="/courses"
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeFilter === "all"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                All Courses
              </Link>
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat}
                  href={`/courses?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    activeFilter === `category:${cat}`
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              <span className="text-sm font-medium text-gray-700 py-2">Course Type:</span>
              <button
                onClick={() => setCourseTypeFilter("all")}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  courseTypeFilter === "all"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCourseTypeFilter("live")}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  courseTypeFilter === "live"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                Live/Instructor-Led
              </button>
              <button
                onClick={() => setCourseTypeFilter("self-paced")}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  courseTypeFilter === "self-paced"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                }`}
              >
                Self-Paced
              </button>
            </div>
          </div>
        </section>

        {/* Course Listings */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {activeFilter === "roles" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Explore by Role</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {roles.map((role) => (
                    <Link
                      key={role}
                      href={`/courses?role=${encodeURIComponent(role)}`}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
                    >
                      {role}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === "categories" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Explore by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/courses?category=${encodeURIComponent(category)}`}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === "certificates" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Professional Certificates</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {professionalCertificates.map((cert) => (
                    <Link
                      key={cert}
                      href={`/courses?certificate=${encodeURIComponent(cert)}`}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
                    >
                      {cert}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === "skills" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Trending Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {trendingSkills.map((skill) => (
                    <Link
                      key={skill}
                      href={`/courses?skill=${encodeURIComponent(skill)}`}
                      className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-xl transition-shadow border border-gray-200"
                    >
                      {skill}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Only show course count and list if not viewing a filter list */}
            {!["roles", "categories", "certificates", "skills"].includes(activeFilter) && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">
                    {filteredCourses.length} Course{filteredCourses.length !== 1 ? "s" : ""} Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden relative">
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
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{course.category}</span>
                      <span className="text-sm font-semibold text-yellow-500 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">{course.duration}</span>
                      <span className="text-sm text-gray-600">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-primary font-bold text-lg">₹{course.price}</span>
                        <span className="text-xs text-gray-500 ml-2 block">{course.courseType === "live" ? "Live" : "Self-Paced"}</span>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No courses found. Try adjusting your filters.</p>
                    <Link
                      href="/courses"
                      className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      View All Courses
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

