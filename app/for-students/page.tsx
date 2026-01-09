"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { courses, roles } from "@/lib/data/courses";
import { BookOpen, Star, Pencil, ChevronDown, Search, ArrowRight, ArrowLeft, Check, Plus, Rocket, RefreshCw, TrendingUp, Compass, X } from "lucide-react";
import { checkAuth } from "@/lib/auth";

const goals = [
  { id: "start-career", label: "Start my career", icon: Rocket },
  { id: "change-career", label: "Change my career", icon: RefreshCw },
  { id: "grow-role", label: "Grow in my current role", icon: TrendingUp },
  { id: "explore", label: "Explore topics outside of work", icon: Compass },
];

const skills = [
  "Data Science", "Machine Learning", "Python Programming", "SQL", "Data Analysis",
  "Statistics", "Algorithms", "Data Visualization", "Deep Learning", "Artificial Intelligence",
  "Excel", "Power BI", "Tableau", "R Programming", "Business Analytics"
];

const educationLevels = [
  "Less than high school diploma (or equivalent)",
  "High school diploma (or equivalent)",
  "Some college, but no degree",
  "Associate Degree (e.g., AA, AS)",
  "Bachelor's degree (e.g., BA, AB, BS)",
  "Master's degree (e.g., MA, MS, MEng, MEd, MSW, MBA)",
  "Professional school degree (e.g., MD, DDS, DVM, LLB, JD)",
  "Doctorate degree (e.g., PhD, EdD)",
];

export default function ForStudentsPage() {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("Student");
  const [education, setEducation] = useState<string>("");
  const [roleSearch, setRoleSearch] = useState<string>("");
  const [skillSearch, setSkillSearch] = useState<string>("");
  const [careerGoal, setCareerGoal] = useState<string>("Data Analyst");
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState<string>("Data Analyst");
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const auth = await checkAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setUser(auth.user);
      
      // Check if onboarding is complete
      const onboardingDone = localStorage.getItem("onboardingComplete");
      if (onboardingDone === "true") {
        setOnboardingComplete(true);
        const savedGoal = localStorage.getItem("careerGoal");
        if (savedGoal) {
          setCareerGoal(savedGoal);
          setGoalInput(savedGoal);
        }
      }
    }
    checkUser();
  }, []);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      if (selectedRoles.length > 0) {
        setCareerGoal(selectedRoles[0]);
        setGoalInput(selectedRoles[0]);
        localStorage.setItem("careerGoal", selectedRoles[0]);
      }
      localStorage.setItem("onboardingComplete", "true");
      setOnboardingComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalChange = (newGoal: string) => {
    setCareerGoal(newGoal);
    setGoalInput(newGoal);
    setIsEditingGoal(false);
    setShowGoalDropdown(false);
    localStorage.setItem("careerGoal", newGoal);
  };

  const handleGoalSubmit = () => {
    if (goalInput.trim()) {
      handleGoalChange(goalInput.trim());
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.toLowerCase().includes(roleSearch.toLowerCase())
  );

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  // Filter courses based on career goal
  const getGoalRelevantCourses = () => {
    const goalLower = careerGoal.toLowerCase();
    return courses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(goalLower);
      const descMatch = course.description.toLowerCase().includes(goalLower);
      const skillsMatch = course.skills.some((skill) =>
        skill.toLowerCase().includes(goalLower)
      );
      const categoryMatch = course.category.toLowerCase().includes(goalLower);
      
      if (goalLower.includes("data analyst")) {
        return course.category === "Data Science" || 
               course.skills.some(s => s.toLowerCase().includes("data") || s.toLowerCase().includes("excel") || s.toLowerCase().includes("sql") || s.toLowerCase().includes("analytics"));
      }
      if (goalLower.includes("data scientist") || goalLower.includes("data science")) {
        return course.category === "Data Science" || 
               course.skills.some(s => s.toLowerCase().includes("data") || s.toLowerCase().includes("python") || s.toLowerCase().includes("machine learning"));
      }
      if (goalLower.includes("project manager")) {
        return course.category === "Business" || 
               course.skills.some(s => s.toLowerCase().includes("project") || s.toLowerCase().includes("management"));
      }
      if (goalLower.includes("cyber security") || goalLower.includes("cybersecurity")) {
        return course.category === "Information Technology" || 
               course.skills.some(s => s.toLowerCase().includes("security") || s.toLowerCase().includes("cyber"));
      }
      if (goalLower.includes("business intelligence")) {
        return course.category === "Business" || course.category === "Data Science" ||
               course.skills.some(s => s.toLowerCase().includes("business") || s.toLowerCase().includes("intelligence") || s.toLowerCase().includes("analytics"));
      }
      
      return titleMatch || descMatch || skillsMatch || categoryMatch;
    });
  };

  const goalRelevantCourses = getGoalRelevantCourses();
  const otherCourses = courses
    .filter((c) => !goalRelevantCourses.some((grc) => grc.id === c.id))
    .slice(0, 6);

  const userName = user?.name || "Guest";

  // Show onboarding if not complete
  if (!onboardingComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Select Goal */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Hello {userName}!
                  </h1>
                  <p className="text-lg text-gray-700 mb-8">
                    Tell me a little about yourself so I can make the best recommendations. First, what&apos;s your goal?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {goals.map((goal) => {
                      const Icon = goal.icon;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => handleGoalSelect(goal.id)}
                          className={`p-6 rounded-lg border-2 transition-all text-left ${
                            selectedGoal === goal.id
                              ? "border-primary bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-primary"
                          }`}
                        >
                          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <p className="font-semibold text-gray-900">{goal.label}</p>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!selectedGoal}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  >
                    Next <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Select Roles */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-8">
                    <p className="text-sm text-gray-600 mb-2">Step 2 of 5</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Great! Which role(s) are you interested in?
                    </h2>
                  </div>
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Find a role"
                        value={roleSearch}
                        onChange={(e) => setRoleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {filteredRoles.slice(0, 9).map((role) => {
                      const isSelected = selectedRoles.includes(role);
                      return (
                        <button
                          key={role}
                          onClick={() => handleRoleToggle(role)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? "border-yellow-400 bg-yellow-50"
                              : "border-gray-200 hover:border-primary"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isSelected ? "bg-yellow-400" : "bg-gray-200"
                              }`}>
                                {isSelected ? (
                                  <Check className="w-5 h-5 text-white" />
                                ) : (
                                  <Plus className="w-5 h-5 text-gray-600" />
                                )}
                              </div>
                              <span className="font-medium text-gray-900">{role}</span>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {filteredRoles.length > 9 && (
                    <Link
                      href="/courses?view=roles"
                      className="text-primary hover:underline text-center block mb-8"
                    >
                      + View more roles
                    </Link>
                  )}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleBack}
                      className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={selectedRoles.length === 0}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Select Skills */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-8">
                    <p className="text-sm text-gray-600 mb-2">Step 3 of 5</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Select the skills you&apos;d like to develop
                    </h2>
                    <p className="text-gray-600">These are recommended based on your role(s).</p>
                  </div>
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Find a skill"
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {filteredSkills.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-primary bg-blue-50"
                              : "border-gray-200 hover:border-primary"
                          }`}
                        >
                          <span className="font-medium text-gray-900">{skill}</span>
                          {isSelected ? (
                            <Check className="w-5 h-5 text-primary" />
                          ) : (
                            <Plus className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleBack}
                      className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Job Title */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-2">Step 4 of 5</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                      What&apos;s your current job title?
                    </h2>
                  </div>
                  <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Enter your job title"
                        className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                      />
                      {jobTitle && (
                        <button
                          onClick={() => setJobTitle("")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleBack}
                      className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Education Level */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-8">
                    <p className="text-sm text-gray-600 mb-2">Step 5 of 5</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                      Got it! What&apos;s your highest level of education?
                    </h2>
                  </div>
                  <div className="max-w-2xl mx-auto mb-8">
                    <div className="space-y-2">
                      {educationLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setEducation(level)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            education === level
                              ? "border-primary bg-blue-50"
                              : "border-gray-200 hover:border-primary"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleBack}
                      className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!education}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Finish
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show personalized dashboard after onboarding
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-26">
        {/* Welcome Section */}
        <section className="bg-white py-8 px-4 border-b">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Welcome, {userName}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-lg text-gray-700">
                  Your goal is to start a career as a
                </p>
                {isEditingGoal ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleGoalSubmit();
                        }
                        if (e.key === "Escape") {
                          setIsEditingGoal(false);
                          setGoalInput(careerGoal);
                        }
                      }}
                      className="text-lg font-semibold text-primary border-b-2 border-primary focus:outline-none px-2 py-1 min-w-[200px]"
                      autoFocus
                    />
                    <button
                      onClick={handleGoalSubmit}
                      className="text-primary hover:text-primary-dark"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingGoal(false);
                        setGoalInput(careerGoal);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="relative flex items-center gap-2">
                    <button
                      onClick={() => setShowGoalDropdown(!showGoalDropdown)}
                      className="text-lg font-semibold text-primary border-b-2 border-primary hover:border-primary-dark transition-colors flex items-center gap-2"
                    >
                      {careerGoal}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsEditingGoal(true)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label="Edit career goal"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {showGoalDropdown && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-[250px] max-h-60 overflow-y-auto">
                        {roles.map((role) => (
                          <button
                            key={role}
                            onClick={() => handleGoalChange(role)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                              careerGoal === role ? "bg-primary/10 text-primary font-semibold" : ""
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Goal-Specific Courses */}
        {goalRelevantCourses.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                Courses to help you become a {careerGoal}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goalRelevantCourses.slice(0, 6).map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden relative">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                  <svg class="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                  </svg>
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-24 h-24 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{course.category}</span>
                        <span className="text-sm font-semibold text-yellow-500 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          {course.rating}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold">₹{course.price}</span>
                        <Link
                          href={`/courses/${course.id}`}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {goalRelevantCourses.length > 6 && (
                <div className="text-center mt-8">
                  <Link
                    href={`/courses?role=${encodeURIComponent(careerGoal)}`}
                    className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    View All {careerGoal} Courses
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Other Recommended Courses */}
        {otherCourses.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Other courses you might like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 overflow-hidden relative">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                  <svg class="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                  </svg>
                                </div>
                              `;
                            }
                          })}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-24 h-24 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{course.category}</span>
                        <span className="text-sm font-semibold text-yellow-500 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          {course.rating}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold">₹{course.price}</span>
                        <Link
                          href={`/courses/${course.id}`}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/courses"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  View All Courses
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
