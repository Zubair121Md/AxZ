"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/lib/data/courses";
import { checkAuth } from "@/lib/auth";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Download, 
  CheckCircle, 
  Circle,
  Video,
  Calendar,
  Users,
  FileText,
  Award,
  MessageSquare,
  Bell,
  Briefcase,
  HelpCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
  ThumbsUp,
  X,
  Plus,
  Upload,
  Link as LinkIcon
} from "lucide-react";
import { CourseContent, initializeCourseContent } from "@/lib/data/courseContent";

export default function LMSPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"content" | "discussions" | "assignments" | "reviews">("content");
  const [showDiscussions, setShowDiscussions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showQuizResults, setShowQuizResults] = useState(false);

  useEffect(() => {
    async function loadData() {
      const auth = await checkAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setUser(auth.user);

      if (!auth.isAuthenticated) {
        router.push(`/login?redirect=/lms/${params.courseId}`);
        return;
      }

      // Check if user is enrolled
      const enrolledCourses = auth.user?.enrolledCourses || [];
      if (!enrolledCourses.includes(params.courseId)) {
        router.push(`/courses/${params.courseId}`);
        return;
      }

      const foundCourse = courses.find((c) => c.id === params.courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Load course content
        try {
          const response = await fetch(`/api/courses/${params.courseId}/content`);
          if (response.ok) {
            const content = await response.json();
            setCourseContent(content);
          } else {
            // Initialize default content
            const defaultContent = initializeCourseContent(params.courseId);
            setCourseContent(defaultContent);
          }
        } catch (error) {
          console.error("Error loading course content:", error);
          const defaultContent = initializeCourseContent(params.courseId);
          setCourseContent(defaultContent);
        }
        
        // Load progress
        const savedProgress = localStorage.getItem(`course-progress-${params.courseId}`);
        if (savedProgress) {
          const progressData = JSON.parse(savedProgress);
          setCompletedLessons(new Set(progressData.completedLessons || []));
          setProgress(progressData.progress || 0);
        }

        // Load discussions
        loadDiscussions();
        
        // Load notifications
        loadNotifications();
      }
      
      setLoading(false);
    }
    loadData();
  }, [params.courseId, router]);

  const loadDiscussions = async () => {
    try {
      const response = await fetch(`/api/courses/${params.courseId}/discussions`);
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      }
    } catch (error) {
      console.error("Error loading discussions:", error);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const markLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);

    // Calculate progress
    if (courseContent) {
      const totalLessons = courseContent.modules.reduce(
        (acc, module) => acc + module.lessons.length,
        0
      );
      const newProgress = Math.round((newCompleted.size / totalLessons) * 100);
      setProgress(newProgress);

      // Save to localStorage
      localStorage.setItem(
        `course-progress-${params.courseId}`,
        JSON.stringify({
          completedLessons: Array.from(newCompleted),
          progress: newProgress,
        })
      );

      // Create notification
      if (newProgress === 100) {
        fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "course_update",
            title: "Course Completed!",
            message: `Congratulations! You've completed ${course?.title}`,
            courseId: params.courseId,
          }),
        });
      }
    }
  };

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    if (lesson.type === "quiz" && lesson.quizId && courseContent) {
      const quiz = courseContent.quizzes.find((q) => q.id === lesson.quizId);
      if (quiz) {
        setSelectedQuiz(quiz);
        setQuizAnswers({});
        setQuizScore(null);
        setShowQuizResults(false);
      }
    }
  };

  const submitQuiz = () => {
    if (!selectedQuiz) return;
    
    let correct = 0;
    let total = selectedQuiz.questions.length;
    
    selectedQuiz.questions.forEach((question: any) => {
      const userAnswer = quizAnswers[question.id];
      if (userAnswer === question.correctAnswer || 
          (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(userAnswer))) {
        correct++;
      }
    });
    
    const score = Math.round((correct / total) * 100);
    setQuizScore(score);
    setShowQuizResults(true);
    
    if (score >= selectedQuiz.passingScore) {
      markLessonComplete(selectedLesson.id);
    }
  };

  const submitDiscussionPost = async () => {
    if (!newPostTitle || !newPostContent) return;
    
    try {
      const response = await fetch(`/api/courses/${params.courseId}/discussions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
        }),
      });
      
      if (response.ok) {
        setNewPostTitle("");
        setNewPostContent("");
        loadDiscussions();
      }
    } catch (error) {
      console.error("Error submitting discussion:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p className="text-lg">Loading course content...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course || !courseContent) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <button
              onClick={() => router.push("/my-courses")}
              className="text-primary hover:underline"
            >
              Back to My Courses
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalLessons = courseContent.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-26">
        {/* Course Header */}
        <div className="bg-white border-b sticky top-26 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {course.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.instructor}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.courseType === "live"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {course.courseType === "live" ? "Live Course" : "Self-Paced"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Progress */}
                <div className="text-right hidden md:block">
                  <div className="text-sm text-gray-600 mb-1">Progress</div>
                  <div className="text-xl font-bold text-primary">{progress}%</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Bell className="w-6 h-6 text-gray-600" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="divide-y">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-gray-500 text-sm">No notifications</p>
                        ) : (
                          notifications.map((notif) => (
                            <div key={notif.id} className={`p-4 ${!notif.read ? "bg-blue-50" : ""}`}>
                              <p className="font-semibold text-sm">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-4 border-b">
              <button
                onClick={() => setActiveTab("content")}
                className={`pb-2 px-4 font-semibold ${
                  activeTab === "content"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600"
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab("discussions")}
                className={`pb-2 px-4 font-semibold ${
                  activeTab === "discussions"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600"
                }`}
              >
                Discussions
              </button>
              <button
                onClick={() => setActiveTab("assignments")}
                className={`pb-2 px-4 font-semibold ${
                  activeTab === "assignments"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600"
                }`}
              >
                Assignments
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 px-4 font-semibold ${
                  activeTab === "reviews"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600"
                }`}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === "content" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar - Course Content */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md sticky top-40 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">Course Content</h2>
                    <p className="text-sm text-gray-600">
                      {totalLessons} lessons • {courseContent.modules.length} modules
                    </p>
                  </div>

                  <div className="p-4 space-y-4">
                    {courseContent.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="space-y-2">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <div className="pl-6 space-y-1">
                          {module.lessons.map((lesson) => {
                            const isCompleted = completedLessons.has(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonClick(lesson)}
                                className={`w-full text-left p-3 rounded-lg transition-all ${
                                  selectedLesson?.id === lesson.id
                                    ? "bg-primary text-white"
                                    : "bg-gray-50 hover:bg-gray-100"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1">
                                    {lesson.type === "video" ? (
                                      <Video className={`w-4 h-4 ${selectedLesson?.id === lesson.id ? "text-white" : "text-gray-600"}`} />
                                    ) : lesson.type === "quiz" ? (
                                      <HelpCircle className={`w-4 h-4 ${selectedLesson?.id === lesson.id ? "text-white" : "text-gray-600"}`} />
                                    ) : lesson.type === "project" ? (
                                      <Briefcase className={`w-4 h-4 ${selectedLesson?.id === lesson.id ? "text-white" : "text-gray-600"}`} />
                                    ) : (
                                      <FileText className={`w-4 h-4 ${selectedLesson?.id === lesson.id ? "text-white" : "text-gray-600"}`} />
                                    )}
                                    <span className={`text-sm ${selectedLesson?.id === lesson.id ? "text-white font-semibold" : "text-gray-700"}`}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs ${selectedLesson?.id === lesson.id ? "text-white" : "text-gray-500"}`}>
                                      {lesson.duration}
                                    </span>
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-gray-400" />
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Video Player / Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Video Player Section */}
                {selectedLesson && selectedLesson.type === "video" && (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-video bg-black">
                      {selectedLesson.videoUrl ? (
                        <video
                          key={selectedLesson.id}
                          controls
                          className="w-full h-full"
                          onEnded={() => markLessonComplete(selectedLesson.id)}
                        >
                          <source src={selectedLesson.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <div className="text-center">
                            <Video className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-lg">Video content coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{selectedLesson.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedLesson.duration}
                        </span>
                        {completedLessons.has(selectedLesson.id) && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                      </div>
                      {selectedLesson.description && (
                        <p className="text-gray-700 mb-4">{selectedLesson.description}</p>
                      )}
                      <button
                        onClick={() => markLessonComplete(selectedLesson.id)}
                        disabled={completedLessons.has(selectedLesson.id)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {completedLessons.has(selectedLesson.id) ? "Lesson Completed" : "Mark as Complete"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Quiz Section */}
                {selectedLesson && selectedLesson.type === "quiz" && selectedQuiz && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">{selectedQuiz.title}</h3>
                    <p className="text-gray-600 mb-6">{selectedQuiz.description}</p>
                    
                    {!showQuizResults ? (
                      <>
                        <div className="space-y-6 mb-6">
                          {selectedQuiz.questions.map((question: any, index: number) => (
                            <div key={question.id} className="border rounded-lg p-4">
                              <p className="font-semibold mb-3">
                                {index + 1}. {question.question}
                              </p>
                              {question.type === "multiple-choice" && question.options && (
                                <div className="space-y-2">
                                  {question.options.map((option: string, optIndex: number) => (
                                    <label key={optIndex} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option}
                                        checked={quizAnswers[question.id] === option}
                                        onChange={(e) => setQuizAnswers({ ...quizAnswers, [question.id]: e.target.value })}
                                      />
                                      <span>{option}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={submitQuiz}
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                          Submit Quiz
                        </button>
                      </>
                    ) : (
                      <div className="border rounded-lg p-6 bg-gray-50">
                        <h4 className="text-lg font-bold mb-4">Quiz Results</h4>
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold text-primary mb-2">{quizScore}%</div>
                          <p className="text-gray-600">
                            {quizScore && quizScore >= selectedQuiz.passingScore
                              ? "Congratulations! You passed!"
                              : `You need ${selectedQuiz.passingScore}% to pass. Try again!`}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setShowQuizResults(false);
                            setQuizAnswers({});
                            setQuizScore(null);
                          }}
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Project Section */}
                {selectedLesson && selectedLesson.type === "project" && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Project: {selectedLesson.title}</h3>
                    {(() => {
                      const project = courseContent.projects.find((p) => p.id === selectedLesson.projectId);
                      return project ? (
                        <div>
                          <p className="text-gray-700 mb-4">{project.description}</p>
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Requirements:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {project.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          {project.dueDate && (
                            <p className="text-sm text-gray-600 mb-4">
                              Due Date: {new Date(project.dueDate).toLocaleDateString()}
                            </p>
                          )}
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Submit Your Project:</h4>
                            {project.submissionType === "file" && (
                              <input type="file" className="mb-2 w-full" />
                            )}
                            {project.submissionType === "link" && (
                              <input type="url" placeholder="Enter project URL" className="w-full border rounded p-2 mb-2" />
                            )}
                            {project.submissionType === "text" && (
                              <textarea placeholder="Enter your submission" className="w-full border rounded p-2 mb-2" rows={5} />
                            )}
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                              Submit Project
                            </button>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}

                {/* Resource Section */}
                {selectedLesson && selectedLesson.type === "resource" && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">{selectedLesson.title}</h3>
                      <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
                      <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2 mx-auto">
                        <Download className="w-4 h-4" />
                        Download Resource
                      </button>
                    </div>
                  </div>
                )}

                {/* No Lesson Selected */}
                {!selectedLesson && (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Select a lesson to start learning
                    </h3>
                    <p className="text-gray-600">
                      Choose a lesson from the sidebar to begin your course
                    </p>
                  </div>
                )}

                {/* Live Classes Section (for live courses) */}
                {course.courseType === "live" && courseContent.liveClasses && courseContent.liveClasses.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-primary" />
                      Upcoming Live Classes
                    </h2>
                    <div className="space-y-4">
                      {courseContent.liveClasses.map((liveClass) => (
                        <div
                          key={liveClass.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {liveClass.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(liveClass.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {liveClass.time}
                                </span>
                              </div>
                            </div>
                            <a
                              href={liveClass.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                            >
                              Join Class
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course Resources */}
                {courseContent.resources.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Download className="w-6 h-6 text-primary" />
                      Course Resources
                    </h2>
                    <div className="space-y-2">
                      {courseContent.resources.map((resource) => (
                        <button key={resource.id} className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {resource.title}
                          </span>
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificate Section */}
                {progress === 100 && (
                  <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-md p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <Award className="w-12 h-12 mb-2" />
                        <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                        <p className="text-white/90">
                          You&apos;ve completed the course. Download your certificate.
                        </p>
                      </div>
                      <button className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Download Certificate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Course Discussions</h2>
                <button
                  onClick={() => setShowDiscussions(!showDiscussions)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              </div>

              {showDiscussions && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-3"
                  />
                  <textarea
                    placeholder="Write your question or discussion..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-3"
                    rows={4}
                  />
                  <button
                    onClick={submitDiscussionPost}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Post
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {discussions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No discussions yet. Start the conversation!</p>
                ) : (
                  discussions.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-gray-600">by {post.authorName}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
                          <ThumbsUp className="w-4 h-4" />
                          {post.upvotes}
                        </button>
                        <button className="text-primary hover:underline">
                          Reply ({post.replies?.length || 0})
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Assignments</h2>
              <div className="space-y-4">
                {courseContent.projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                      </div>
                      {project.dueDate && (
                        <span className="text-sm text-gray-500">
                          Due: {new Date(project.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {project.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Submit Assignment:</h4>
                      {project.submissionType === "file" && (
                        <div className="space-y-2">
                          <input type="file" className="w-full" />
                          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Submit
                          </button>
                        </div>
                      )}
                      {project.submissionType === "link" && (
                        <div className="space-y-2">
                          <input type="url" placeholder="Enter project URL" className="w-full border rounded p-2" />
                          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Submit
                          </button>
                        </div>
                      )}
                      {project.submissionType === "text" && (
                        <div className="space-y-2">
                          <textarea placeholder="Enter your submission" className="w-full border rounded p-2" rows={5} />
                          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Course Reviews</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Reviews feature coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

