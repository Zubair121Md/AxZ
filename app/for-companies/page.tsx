"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Lightbulb, GraduationCap, Users, BarChart3, HelpCircle } from "lucide-react";

export default function ForCompaniesPage() {
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
                Upskill Your Workforce
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Train your employees with industry-leading courses and certifications. Build a skilled workforce ready for tomorrow's challenges.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Solutions for Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Corporate Training",
                  description: "Customized training programs tailored to your company's needs.",
                  icon: Building2,
                },
                {
                  title: "Skill Development",
                  description: "Develop in-demand skills in your workforce with our comprehensive courses.",
                  icon: Lightbulb,
                },
                {
                  title: "Certification Programs",
                  description: "Get your employees certified in cutting-edge technologies.",
                  icon: GraduationCap,
                },
                {
                  title: "Talent Acquisition",
                  description: "Access our pool of skilled candidates for your hiring needs.",
                  icon: Users,
                },
                {
                  title: "Learning Analytics",
                  description: "Track and measure your team's learning progress with detailed analytics.",
                  icon: BarChart3,
                },
                {
                  title: "24/7 Support",
                  description: "Get dedicated support for all your training needs.",
                  icon: HelpCircle,
                },
              ].map((solution, index) => (
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
                      <solution.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Trusted by Leading Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  company: "Tech Corp",
                  testimonial: "Amity x ZMT EdTech helped us upskill 500+ employees in cloud technologies. The results were outstanding!",
                  author: "John Doe, CTO",
                },
                {
                  company: "Global Industries",
                  testimonial: "Their corporate training programs are top-notch. Our team's productivity increased by 40%.",
                  author: "Jane Smith, HR Director",
                },
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <p className="text-gray-700 mb-4 italic">"{story.testimonial}"</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">{story.company}</p>
                      <p className="text-sm text-gray-600">{story.author}</p>
                    </div>
                  </div>
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

