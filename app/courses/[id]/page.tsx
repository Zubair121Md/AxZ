"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { courses } from "@/lib/data/courses";
import { checkAuth } from "@/lib/auth";
import { BookOpen, Star, Clock } from "lucide-react";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [liveCourse, setLiveCourse] = useState<any>(null);
  const [selfPacedCourse, setSelfPacedCourse] = useState<any>(null);
  const [selectedCourseType, setSelectedCourseType] = useState<"live" | "self-paced">("live");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure page can scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    async function loadData() {
      const { id } = await params;
      const foundCourse = courses.find((c) => c.id === id);
      
      if (foundCourse) {
        setCourse(foundCourse);
        setSelectedCourseType(foundCourse.courseType);
        
        // Find both live and self-paced versions of the same course
        // Extract the base course index from the ID
        const idParts = foundCourse.id.split('-');
        const courseIndex = parseInt(idParts[0]) - 1;
        
        // Calculate IDs for both versions
        const liveId = `${courseIndex * 2 + 1}-live`;
        const selfPacedId = `${courseIndex * 2 + 2}-self-paced`;
        
        const live = courses.find((c) => c.id === liveId);
        const selfPaced = courses.find((c) => c.id === selfPacedId);
        
        setLiveCourse(live || null);
        setSelfPacedCourse(selfPaced || null);
      }
      
      const auth = await checkAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setLoading(false);
    }
    loadData();
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [params]);

  // Update displayed course when type changes
  useEffect(() => {
    if (selectedCourseType === "live" && liveCourse) {
      setCourse(liveCourse);
    } else if (selectedCourseType === "self-paced" && selfPacedCourse) {
      setCourse(selfPacedCourse);
    }
  }, [selectedCourseType, liveCourse, selfPacedCourse]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/courses/${course?.id}`);
    } else {
      // Redirect to payment page with selected course
      router.push(`/payment?courseId=${course?.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p className="text-lg">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <Link href="/courses" className="text-primary hover:underline">
              Browse All Courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const fullDescription = `${course.description} This comprehensive course will take you from ${course.level.toLowerCase()} to advanced level, covering all the essential concepts and practical applications. You'll learn through hands-on projects, real-world examples, and expert guidance from industry professionals. By the end of this course, you'll have the skills and knowledge needed to excel in your career.`;

  return (
    <div className="w-full">
      <Navbar />
      <main className="pt-26 w-full pb-8">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <span className="text-sm text-gray-600 mb-2 block">{course.category}</span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-700 mb-6">{course.description}</p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-gray-600 ml-1">({course.students.toLocaleString()} students)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mb-6">
                  <div>
                    <span className="text-sm text-gray-600">Duration</span>
                    <p className="font-semibold">{course.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Level</span>
                    <p className="font-semibold">{course.level}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Instructor</span>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                </div>
                {course.courseType === "live" && course.classTiming && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Live Class Schedule</p>
                        <p className="text-sm text-gray-700 mb-2">{course.classTiming}</p>
                        {course.startDate && (
                          <p className="text-sm text-gray-600">
                            Starts: {new Date(course.startDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {course.courseType === "self-paced" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Self-Paced Learning</p>
                        <p className="text-sm text-gray-700">
                          Learn at your own pace with lifetime access. Start anytime and complete the course on your schedule.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Course Type Selector */}
                {liveCourse && selfPacedCourse && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Course Type:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedCourseType("live")}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedCourseType === "live"
                            ? "border-primary bg-blue-50 shadow-md"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900">Live/Instructor-Led</p>
                          {selectedCourseType === "live" && (
                            <span className="text-xs bg-primary text-white px-2 py-1 rounded">Selected</span>
                          )}
                        </div>
                        {liveCourse.classTiming && (
                          <p className="text-xs text-gray-600 mb-2">{liveCourse.classTiming}</p>
                        )}
                        <p className="text-lg font-bold text-primary">₹{liveCourse.price}</p>
                      </button>
                      <button
                        onClick={() => setSelectedCourseType("self-paced")}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedCourseType === "self-paced"
                            ? "border-primary bg-green-50 shadow-md"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900">Self-Paced</p>
                          {selectedCourseType === "self-paced" && (
                            <span className="text-xs bg-primary text-white px-2 py-1 rounded">Selected</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Learn at your own pace</p>
                        <p className="text-lg font-bold text-primary">₹{selfPacedCourse.price}</p>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-3xl font-bold text-primary">₹{course.price}</span>
                    <span className="text-sm text-gray-600 ml-2 block">
                      {course.courseType === "live" ? "Live Course" : "Self-Paced Course"}
                    </span>
                  </div>
                  <button 
                    onClick={handleEnroll}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
              <div className="h-64 lg:h-full bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg overflow-hidden relative">
                {course?.image ? (
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
                                <svg class="w-32 h-32 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                              </div>
                            `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-32 h-32 text-primary" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">What you&apos;ll learn</h2>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <ul className="space-y-3">
                    {course.skills.map((skill: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {fullDescription}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">What makes this course special:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Hands-on projects and real-world case studies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Expert instruction from industry professionals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Lifetime access to course materials and updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Certificate of completion upon finishing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-26">
                  <h3 className="text-xl font-bold mb-4">Course Features</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>24/7 support</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Mobile and desktop access</span>
                    </li>
                  </ul>
                  {/* Course Type Selector in Sidebar */}
                  {liveCourse && selfPacedCourse && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Course Type:
                      </label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCourseType("live")}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedCourseType === "live"
                              ? "border-primary bg-blue-50"
                              : "border-gray-300 hover:border-primary"
                          }`}
                        >
                          <p className="font-semibold text-sm">Live/Instructor-Led</p>
                          <p className="text-xs text-gray-600">₹{liveCourse.price}</p>
                        </button>
                        <button
                          onClick={() => setSelectedCourseType("self-paced")}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            selectedCourseType === "self-paced"
                              ? "border-primary bg-green-50"
                              : "border-gray-300 hover:border-primary"
                          }`}
                        >
                          <p className="font-semibold text-sm">Self-Paced</p>
                          <p className="text-xs text-gray-600">₹{selfPacedCourse.price}</p>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleEnroll}
                    className="w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors mb-3"
                  >
                    Enroll Now - ₹{course.price}
                  </button>
                  <p className="text-sm text-center text-gray-600">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
