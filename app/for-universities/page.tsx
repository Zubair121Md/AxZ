"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Users, Globe, FlaskConical } from "lucide-react";

export default function ForUniversitiesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-26">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Partner with Leading Universities
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Collaborate with us to offer world-class online degrees, certificates, and professional development programs to your students.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Become a Partner
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Partnership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Online Degree Programs",
                  description: "Offer accredited online degrees to students worldwide.",
                  icon: GraduationCap,
                },
                {
                  title: "Faculty Exchange",
                  description: "Collaborate on research and share expertise with partner institutions.",
                  icon: Users,
                },
                {
                  title: "Student Exchange",
                  description: "Enable student mobility and cross-cultural learning experiences.",
                  icon: Globe,
                },
                {
                  title: "Research Collaboration",
                  description: "Joint research projects and publications.",
                  icon: FlaskConical,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Programs for Universities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Bachelor's Degrees",
                  description: "Accredited online bachelor's degree programs in various fields.",
                  programs: ["Computer Science", "Business Administration", "Data Science"],
                },
                {
                  title: "Master's Degrees",
                  description: "Advanced master's degree programs for career advancement.",
                  programs: ["MBA", "MSc Computer Science", "MSc Data Science"],
                },
                {
                  title: "Professional Certificates",
                  description: "Industry-recognized professional certificate programs.",
                  programs: ["Cloud Computing", "Cybersecurity", "AI & ML"],
                },
              ].map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                    {program.programs.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <Link
                    href="/degrees"
                    className="text-primary hover:underline font-semibold"
                  >
                    Learn More →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

