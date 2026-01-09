"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '180px' }}>
      {/* Light Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-blue-100 to-white">
        <div className="absolute inset-0">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight mb-6"
              >
                Achieve your career goals with{" "}
                <span className="text-primary-dark">Amity x ZMT EdTech</span>
              </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-10"
            >
              Subscribe to build job-ready skills from world-class institutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                ₹2,099/month, cancel anytime
              </p>
              <button 
                onClick={() => {
                  router.push("/register?trial=true");
                }}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-5 px-12 rounded-xl text-xl md:text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Start 7-day Free Trial
              </button>
              <p className="text-lg md:text-xl text-primary font-semibold">
                or ₹13,999/year with 14-day money-back guarantee
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Student Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Abstract blue shapes background */}
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-3xl transform rotate-12 opacity-30"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-300 rounded-2xl transform -rotate-12 opacity-20"></div>
              
              {/* Student image placeholder - using a professional student image */}
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
                  alt="Student learning"
                  className="rounded-2xl shadow-2xl w-full max-w-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-96 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl flex items-center justify-center">
                          <div class="text-center">
                            <div class="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                              <svg class="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                              </svg>
                            </div>
                            <p class="text-gray-700 font-semibold">Student Success</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

