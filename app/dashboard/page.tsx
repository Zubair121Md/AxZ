"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { checkAuth } from "@/lib/auth";
import { courses } from "@/lib/data/courses";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Calendar,
  Target,
  BarChart3,
  CheckCircle,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalProgress: 0,
    certificates: 0,
    studyStreak: 0,
  });

  useEffect(() => {
    async function loadData() {
      const auth = await checkAuth();
      
      if (!auth.isAuthenticated) {
        router.push("/login?redirect=/dashboard");
        return;
      }
      
      setUser(auth.user);
      
      // Load enrolled courses
      const enrolled = courses.filter((course) =>
        auth.user?.enrolledCourses?.includes(course.id)
      );
      setEnrolledCourses(enrolled);
      
      // Calculate stats
      const totalCourses = enrolled.length;
      let completedCourses = 0;
      let totalProgress = 0;
      
      enrolled.forEach((course) => {
        const progressData = localStorage.getItem(`course-progress-${course.id}`);
        if (progressData) {
          const progress = JSON.parse(progressData);
          totalProgress += progress.progress || 0;
          if (progress.progress === 100) {
            completedCourses++;
          }
        }
      });
      
      const avgProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
      
      setStats({
        totalCourses,
        completedCourses,
        inProgressCourses: totalCourses - completedCourses,
        totalProgress: avgProgress,
        certificates: completedCourses,
        studyStreak: 7, // Mock data
      });
      
      setLoading(false);
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p>Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-26">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">Here&apos;s your learning overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
                <BookOpen className="w-12 h-12 text-primary opacity-20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Average Progress</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalProgress}%</p>
                </div>
                <TrendingUp className="w-12 h-12 text-primary opacity-20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Certificates</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.certificates}</p>
                </div>
                <Award className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
            </motion.div>
          </div>

          {/* Progress Chart Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Learning Progress
            </h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const progressData = localStorage.getItem(`course-progress-${course.id}`);
                const progress = progressData ? JSON.parse(progressData).progress || 0 : 0;
                
                return (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.category}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-600">{course.duration}</span>
                      <Link
                        href={`/lms/${course.id}`}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        Continue Learning →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {enrolledCourses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">You enrolled in {course.title}</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/courses"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <BookOpen className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Browse Courses</h3>
              <p className="text-sm text-gray-600">Explore new courses to enhance your skills</p>
            </Link>

            <Link
              href="/my-courses"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <Target className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">My Courses</h3>
              <p className="text-sm text-gray-600">View all your enrolled courses</p>
            </Link>

            <Link
              href="/account"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <Award className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Certificates</h3>
              <p className="text-sm text-gray-600">View and download your certificates</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

