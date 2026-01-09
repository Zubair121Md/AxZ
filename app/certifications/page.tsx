"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    duration: "3-6 months",
    level: "Professional",
  },
  {
    name: "Microsoft Azure Fundamentals",
    provider: "Microsoft",
    duration: "2-4 months",
    level: "Beginner",
  },
  {
    name: "Google Cloud Professional",
    provider: "Google",
    duration: "4-6 months",
    level: "Professional",
  },
  {
    name: "Cisco CCNA",
    provider: "Cisco",
    duration: "3-5 months",
    level: "Intermediate",
  },
  {
    name: "CompTIA Security+",
    provider: "CompTIA",
    duration: "2-4 months",
    level: "Intermediate",
  },
  {
    name: "PMP Certification",
    provider: "PMI",
    duration: "3-6 months",
    level: "Professional",
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-26">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Prepare for Certification Exams</h1>
            <p className="text-lg text-gray-600">Get certified and advance your career with industry-recognized certifications</p>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="mb-4">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {cert.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                  <p className="text-gray-600 mb-2">{cert.provider}</p>
                  <p className="text-sm text-gray-500 mb-4">Duration: {cert.duration}</p>
                  <Link
                    href={`/certifications/${encodeURIComponent(cert.name)}`}
                    className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Start Preparation
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

