"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ChevronDown, User, LogOut, BookOpen, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { roles, categories, professionalCertificates, degrees, trendingSkills } from "@/lib/data/courses";
import { checkAuth } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  const topNavItems = [
    { label: "For Individuals", href: "/for-students" },
    { label: "For Colleges", href: "/for-colleges" },
    { label: "For Companies", href: "/for-companies" },
    { label: "For Universities", href: "/for-universities" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleJoinFree = () => {
    router.push("/register");
  };

  // Check authentication status
  useEffect(() => {
    async function checkUser() {
      const auth = await checkAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setUser(auth.user);
    }
    checkUser();
    
    // Refresh auth status periodically
    const interval = setInterval(checkUser, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExploreDropdown(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      setIsAuthenticated(false);
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Top Bar - Normal Size */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-10">
            <div className="flex items-center space-x-6 text-sm">
              {topNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-blue-300 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Normal Size */}
      <nav className="fixed top-10 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Left Side: Logo, Navigation, Search - No flex-grow */}
            <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              {/* Logo - Normal Size */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="flex items-center">
                    <span className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">Amity</span>
                    <span className="mx-2 text-primary-dark font-bold text-lg md:text-xl">×</span>
                    <span className="text-xl md:text-2xl font-bold text-primary-dark">ZMT EdTech</span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation - Normal Size */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Explore Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setShowExploreDropdown(true)}
                    className="text-gray-700 hover:text-primary-dark text-sm md:text-base font-semibold transition-colors flex items-center whitespace-nowrap"
                  >
                    Explore
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                  </button>

                  <AnimatePresence>
                    {showExploreDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onMouseLeave={() => setShowExploreDropdown(false)}
                        className="absolute top-full left-0 mt-2 w-[800px] bg-white border border-gray-200 rounded-lg shadow-xl p-6 grid grid-cols-2 gap-6"
                      >
                        {/* Left Column */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Explore roles</h3>
                          <div className="space-y-2 mb-6">
                            {roles.slice(0, 5).map((role) => (
                              <Link
                                key={role}
                                href={`/courses?role=${encodeURIComponent(role)}`}
                                className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setShowExploreDropdown(false)}
                              >
                                {role}
                              </Link>
                            ))}
                            <Link
                              href="/courses?view=roles"
                              className="block text-sm text-primary font-medium hover:underline"
                              onClick={() => setShowExploreDropdown(false)}
                            >
                              View all
                            </Link>
                          </div>

                          <h3 className="font-semibold text-gray-900 mb-3">Explore categories</h3>
                          <div className="space-y-2">
                            {categories.slice(0, 5).map((category) => (
                              <Link
                                key={category}
                                href={`/courses?category=${encodeURIComponent(category)}`}
                                className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setShowExploreDropdown(false)}
                              >
                                {category}
                              </Link>
                            ))}
                            <Link
                              href="/courses?view=categories"
                              className="block text-sm text-primary font-medium hover:underline"
                              onClick={() => setShowExploreDropdown(false)}
                            >
                              View all
                            </Link>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Earn a Professional Certificate</h3>
                          <div className="space-y-2 mb-6">
                            {professionalCertificates.map((cert) => (
                              <Link
                                key={cert}
                                href={`/courses?certificate=${encodeURIComponent(cert)}`}
                                className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setShowExploreDropdown(false)}
                              >
                                {cert}
                              </Link>
                            ))}
                            <Link
                              href="/courses?view=certificates"
                              className="block text-sm text-primary font-medium hover:underline"
                              onClick={() => setShowExploreDropdown(false)}
                            >
                              View all
                            </Link>
                          </div>

                          <h3 className="font-semibold text-gray-900 mb-3">Earn an online degree</h3>
                          <div className="space-y-2 mb-6">
                            {Object.keys(degrees).map((degreeType) => (
                              <Link
                                key={degreeType}
                                href={`/degrees?type=${encodeURIComponent(degreeType)}`}
                                className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setShowExploreDropdown(false)}
                              >
                                {degreeType}
                              </Link>
                            ))}
                            <Link
                              href="/degrees"
                              className="block text-sm text-primary font-medium hover:underline"
                              onClick={() => setShowExploreDropdown(false)}
                            >
                              View all
                            </Link>
                          </div>

                          <h3 className="font-semibold text-gray-900 mb-3">Explore trending skills</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {trendingSkills.slice(0, 4).map((skill) => (
                              <Link
                                key={skill}
                                href={`/courses?skill=${encodeURIComponent(skill)}`}
                                className="text-xs px-3 py-1 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors"
                                onClick={() => setShowExploreDropdown(false)}
                              >
                                {skill}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/courses?view=skills"
                            className="block text-sm text-primary font-medium hover:underline"
                            onClick={() => setShowExploreDropdown(false)}
                          >
                            View all
                          </Link>

                          <div className="mt-4 pt-4 border-t">
                            <Link
                              href="/certifications"
                              className="block text-sm text-gray-700 hover:text-primary transition-colors font-medium"
                              onClick={() => setShowExploreDropdown(false)}
                            >
                              Prepare for a certification exam
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/degrees"
                  className="text-gray-700 hover:text-primary-dark text-sm md:text-base font-semibold transition-colors whitespace-nowrap"
                >
                  Degrees
                </Link>
              </div>

              {/* Search Bar - Desktop - Normal Size */}
              <div className="hidden md:flex ml-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="What do you want to learn?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 md:w-64 px-3 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side: Account/Login Buttons */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated ? (
                  <div className="relative" ref={accountDropdownRef}>
                    <button
                      onMouseEnter={() => setShowAccountDropdown(true)}
                      onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-dark transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>{user?.name || "Account"}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {showAccountDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          onMouseLeave={() => setShowAccountDropdown(false)}
                          className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-600">{user?.email}</p>
                          </div>
                          <Link
                            href="/dashboard"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowAccountDropdown(false)}
                          >
                            <BarChart3 className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            href="/my-courses"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowAccountDropdown(false)}
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>My Courses</span>
                          </Link>
                          <Link
                            href="/account"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowAccountDropdown(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>Account Settings</span>
                          </Link>
                          {user?.role === "admin" && (
                            <Link
                              href="/admin/courses"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowAccountDropdown(false)}
                            >
                              <span>Admin Panel</span>
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              setShowAccountDropdown(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={handleLogin}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-dark transition-colors"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={handleJoinFree}
                      className="px-5 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors shadow-md"
                    >
                      Join for Free
                    </button>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-primary-dark focus:outline-none p-2 rounded-md hover:bg-gray-50 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Promotional Banner */}
      {showBanner && (
        <div className="fixed top-26 left-0 right-0 z-30 bg-blue-100 text-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-12 relative">
              <p className="text-sm">
                Gain skills with <strong>Amity x ZMT EdTech</strong> for ₹7,999/year (regularly ₹13,999).{" "}
                <Link 
                  href="/courses"
                  className="underline font-semibold hover:text-primary"
                >
                  Save now.
                </Link>
              </p>
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 text-gray-600 hover:text-gray-900"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-26 fixed top-26 left-0 right-0 z-30 max-h-[calc(100vh-104px)] overflow-y-auto overscroll-contain"
          >
            <div className="px-4 pt-4 pb-4 space-y-3 bg-white">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
              </form>

              {/* Mobile Nav Items */}
              <div className="space-y-2">
                <div className="font-semibold text-gray-900 py-2">Explore</div>
                <div className="pl-4 space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Roles</div>
                  {roles.slice(0, 5).map((role) => (
                    <Link
                      key={role}
                      href={`/courses?role=${encodeURIComponent(role)}`}
                      className="block text-sm text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {role}
                    </Link>
                  ))}
                  <Link
                    href="/courses?view=roles"
                    className="block text-sm text-primary font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    View all roles
                  </Link>
                </div>
                <div className="pl-4 space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category}
                      href={`/courses?category=${encodeURIComponent(category)}`}
                      className="block text-sm text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                  <Link
                    href="/courses?view=categories"
                    className="block text-sm text-primary font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    View all categories
                  </Link>
                </div>
              </div>

              <Link
                href="/degrees"
                className="block px-3 py-2 text-gray-700 hover:text-primary-dark hover:bg-gray-50 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Degrees
              </Link>

              {/* Mobile Buttons */}
              <div className="pt-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200 mb-2">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      href="/my-courses"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      My Courses
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Account Settings
                    </Link>
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        handleLogin();
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        handleJoinFree();
                      }}
                      className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                    >
                      Join for Free
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
