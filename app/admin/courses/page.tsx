"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { checkAuth } from "@/lib/auth";
import { courses } from "@/lib/data/courses";
import Link from "next/link";
import { Edit, BookOpen } from "lucide-react";

export default function AdminCoursesPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const auth = await checkAuth();
      if (!auth.isAuthenticated || auth.user?.role !== "admin") {
        router.push("/");
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    }
    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get unique courses (remove duplicates from live/self-paced)
  const uniqueCourses = courses.filter((course, index, self) =>
    index === self.findIndex((c) => c.title === course.title && c.category === course.category)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-26">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <span className={`px-2 py-1 rounded text-xs ${
                    course.courseType === "live" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}>
                    {course.courseType}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.category}</p>
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  <Edit className="w-4 h-4" />
                  Edit Content
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

