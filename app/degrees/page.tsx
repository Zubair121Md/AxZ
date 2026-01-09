"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { degrees } from "@/lib/data/courses";

export default function DegreesPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-26">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Earn an Online Degree</h1>
            <p className="text-lg text-gray-600">Transform your career with accredited online degrees from world-class universities</p>
          </div>
        </section>

        {/* Degree Types */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(degrees).map(([degreeType, programs], index) => (
                <motion.div
                  key={degreeType}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <h2 className="text-2xl font-bold mb-4">{degreeType}</h2>
                  <ul className="space-y-3 mb-6">
                    {programs.map((program, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        <span className="text-gray-700">{program}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/degrees?type=${encodeURIComponent(degreeType)}`}
                    className="text-primary hover:underline font-semibold"
                  >
                    View Programs →
                  </Link>
                </motion.div>
              ))}
            </div>

            {type && (
              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">{type} Programs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {degrees[type as keyof typeof degrees]?.map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-xl font-bold mb-2">{program}</h3>
                      <p className="text-gray-600 mb-4">
                        Earn your {program} degree online with flexible schedules and world-class instruction.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold">Learn More</span>
                        <Link
                          href={`/degrees/${encodeURIComponent(program)}`}
                          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

