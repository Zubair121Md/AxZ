"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Business", active: true },
  { name: "Computer Science", active: false },
  { name: "Data Science", active: false },
  { name: "Health", active: false },
  { name: "Information Technology", active: false },
  { name: "Arts and Humanities", active: false },
];

export default function SearchSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Business");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to courses page with search query
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // If no search query, just navigate to courses page with category filter
      router.push(`/courses?category=${encodeURIComponent(activeCategory)}`);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    // Navigate to courses page with category filter
    router.push(`/courses?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Search 10,000+ learning programs
          </h2>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative flex items-center">
              <div className="absolute left-4">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="e.g. Machine Learning"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-20 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
              <button
                type="submit"
                className="absolute right-2 bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-700 font-medium mr-2">Popular:</span>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeCategory === category.name
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-primary border-gray-300 hover:border-primary hover:bg-blue-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

