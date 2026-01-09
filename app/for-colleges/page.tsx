"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Target, Users, Network } from "lucide-react";

export default function ForCollegesPage() {
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
                Transform Your College with World-Class Education
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Partner with us to provide your students access to industry-leading courses, certifications, and career support.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Partner With Us
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits for Colleges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Enhanced Curriculum",
                  description: "Add industry-relevant courses to your existing curriculum.",
                  icon: BookOpen,
                },
                {
                  title: "Student Placement",
                  description: "Improve placement rates with our career support programs.",
                  icon: Target,
                },
                {
                  title: "Faculty Development",
                  description: "Train your faculty with our professional development programs.",
                  icon: Users,
                },
                {
                  title: "Industry Partnerships",
                  description: "Connect with top companies through our network.",
                  icon: Network,
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
            <h2 className="text-3xl font-bold mb-8">Programs for Colleges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Workshop Programs",
                  description: "Conduct workshops on emerging technologies and industry trends.",
                  link: "/programs/workshops",
                },
                {
                  title: "Internship Programs",
                  description: "Provide students with real-world industry experience.",
                  link: "/programs/internships",
                },
                {
                  title: "Placement Programs",
                  description: "Comprehensive placement assistance and training.",
                  link: "/programs/placements",
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
                  <Link
                    href={program.link}
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

