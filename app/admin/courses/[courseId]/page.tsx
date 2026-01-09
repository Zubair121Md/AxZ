"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { checkAuth } from "@/lib/auth";
import { courses } from "@/lib/data/courses";
import { CourseContent, Module, Lesson, Quiz, Project } from "@/lib/data/courseContent";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Video, 
  FileText, 
  HelpCircle,
  Briefcase,
  GripVertical,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function AdminCourseEditPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingQuiz, setEditingQuiz] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      const auth = await checkAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setIsAdmin(auth.user?.role === "admin");

      if (!auth.isAuthenticated || auth.user?.role !== "admin") {
        router.push("/");
        return;
      }

      const foundCourse = courses.find((c) => c.id === params.courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Load course content from API
        try {
          const response = await fetch(`/api/admin/courses/${params.courseId}/content`);
          if (response.ok) {
            const content = await response.json();
            setCourseContent(content);
            // Expand all modules by default
            setExpandedModules(new Set(content.modules.map((m: Module) => m.id)));
          } else {
            // Initialize empty content
            setCourseContent({
              courseId: params.courseId,
              modules: [],
              quizzes: [],
              projects: [],
              resources: [],
            });
          }
        } catch (error) {
          console.error("Error loading course content:", error);
          setCourseContent({
            courseId: params.courseId,
            modules: [],
            quizzes: [],
            projects: [],
            resources: [],
          });
        }
      }
      
      setLoading(false);
    }
    loadData();
  }, [params.courseId, router]);

  const saveCourseContent = async () => {
    if (!courseContent) return;
    
    try {
      const response = await fetch(`/api/admin/courses/${params.courseId}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseContent),
        credentials: "include",
      });

      if (response.ok) {
        alert("Course content saved successfully!");
      } else {
        alert("Failed to save course content");
      }
    } catch (error) {
      console.error("Error saving course content:", error);
      alert("Error saving course content");
    }
  };

  const addModule = () => {
    if (!courseContent) return;
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: "New Module",
      lessons: [],
      order: courseContent.modules.length + 1,
    };
    setCourseContent({
      ...courseContent,
      modules: [...courseContent.modules, newModule],
    });
    setExpandedModules(new Set([...expandedModules, newModule.id]));
  };

  const addLesson = (moduleId: string, type: "video" | "quiz" | "project" | "resource") => {
    if (!courseContent) return;
    const module = courseContent.modules.find((m) => m.id === moduleId);
    if (!module) return;
    
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: `New ${type}`,
      type,
      duration: "0:00",
      completed: false,
      order: module.lessons.length + 1,
    };
    
    const updatedModules = courseContent.modules.map((m) =>
      m.id === moduleId
        ? { ...m, lessons: [...m.lessons, newLesson] }
        : m
    );
    
    setCourseContent({ ...courseContent, modules: updatedModules });
  };

  const addQuiz = () => {
    if (!courseContent) return;
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: "New Quiz",
      description: "",
      questions: [],
      passingScore: 70,
      order: courseContent.quizzes.length + 1,
    };
    setCourseContent({
      ...courseContent,
      quizzes: [...courseContent.quizzes, newQuiz],
    });
  };

  const addProject = () => {
    if (!courseContent) return;
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "New Project",
      description: "",
      requirements: [],
      submissionType: "file",
      maxScore: 100,
      order: courseContent.projects.length + 1,
    };
    setCourseContent({
      ...courseContent,
      projects: [...courseContent.projects, newProject],
    });
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-26">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin || !course || !courseContent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-26">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Course Content</h1>
              <p className="text-gray-600 mt-1">{course.title}</p>
            </div>
            <button
              onClick={saveCourseContent}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save All Changes
            </button>
          </div>

          {/* Modules Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Modules & Lessons</h2>
              <button
                onClick={addModule}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Module
              </button>
            </div>

            <div className="space-y-4">
              {courseContent.modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedModules.has(module.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => {
                          const updated = { ...courseContent };
                          updated.modules[moduleIndex].title = e.target.value;
                          setCourseContent(updated);
                        }}
                        className="text-lg font-semibold border-b-2 border-transparent focus:border-primary focus:outline-none flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addLesson(module.id, "video")}
                        className="p-2 text-primary hover:bg-primary/10 rounded"
                        title="Add Video Lesson"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addLesson(module.id, "quiz")}
                        className="p-2 text-primary hover:bg-primary/10 rounded"
                        title="Add Quiz"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addLesson(module.id, "project")}
                        className="p-2 text-primary hover:bg-primary/10 rounded"
                        title="Add Project"
                      >
                        <Briefcase className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addLesson(module.id, "resource")}
                        className="p-2 text-primary hover:bg-primary/10 rounded"
                        title="Add Resource"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const updated = { ...courseContent };
                          updated.modules = updated.modules.filter((m) => m.id !== module.id);
                          setCourseContent(updated);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {expandedModules.has(module.id) && (
                    <div className="pl-6 space-y-2 mt-3">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => {
                              const updated = { ...courseContent };
                              updated.modules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                              setCourseContent(updated);
                            }}
                            className="flex-1 border-b border-transparent focus:border-primary focus:outline-none"
                          />
                          <span className="text-xs text-gray-500 px-2 py-1 bg-white rounded">
                            {lesson.type}
                          </span>
                          {lesson.type === "video" && (
                            <input
                              type="text"
                              placeholder="Video URL"
                              value={lesson.videoUrl || ""}
                              onChange={(e) => {
                                const updated = { ...courseContent };
                                updated.modules[moduleIndex].lessons[lessonIndex].videoUrl = e.target.value;
                                setCourseContent(updated);
                              }}
                              className="text-sm border rounded px-2 py-1 w-48"
                            />
                          )}
                          {lesson.type === "quiz" && (
                            <select
                              value={lesson.quizId || ""}
                              onChange={(e) => {
                                const updated = { ...courseContent };
                                updated.modules[moduleIndex].lessons[lessonIndex].quizId = e.target.value;
                                setCourseContent(updated);
                              }}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="">Select Quiz</option>
                              {courseContent.quizzes.map((q) => (
                                <option key={q.id} value={q.id}>{q.title}</option>
                              ))}
                            </select>
                          )}
                          {lesson.type === "project" && (
                            <select
                              value={lesson.projectId || ""}
                              onChange={(e) => {
                                const updated = { ...courseContent };
                                updated.modules[moduleIndex].lessons[lessonIndex].projectId = e.target.value;
                                setCourseContent(updated);
                              }}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="">Select Project</option>
                              {courseContent.projects.map((p) => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                              ))}
                            </select>
                          )}
                          <input
                            type="text"
                            placeholder="Duration (e.g., 15:30)"
                            value={lesson.duration}
                            onChange={(e) => {
                              const updated = { ...courseContent };
                              updated.modules[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                              setCourseContent(updated);
                            }}
                            className="text-sm border rounded px-2 py-1 w-24"
                          />
                          <button
                            onClick={() => {
                              const updated = { ...courseContent };
                              updated.modules[moduleIndex].lessons = updated.modules[moduleIndex].lessons.filter(
                                (l) => l.id !== lesson.id
                              );
                              setCourseContent(updated);
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Quizzes</h2>
              <button
                onClick={addQuiz}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Quiz
              </button>
            </div>

            <div className="space-y-4">
              {courseContent.quizzes.map((quiz, quizIndex) => (
                <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={quiz.title}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.quizzes[quizIndex].title = e.target.value;
                        setCourseContent(updated);
                      }}
                      className="text-lg font-semibold border-b-2 border-transparent focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const updated = { ...courseContent };
                        updated.quizzes = updated.quizzes.filter((q) => q.id !== quiz.id);
                        setCourseContent(updated);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={quiz.description}
                    onChange={(e) => {
                      const updated = { ...courseContent };
                      updated.quizzes[quizIndex].description = e.target.value;
                      setCourseContent(updated);
                    }}
                    placeholder="Quiz description"
                    className="w-full border rounded p-2 mb-2"
                    rows={2}
                  />
                  <div className="flex gap-4 mb-3">
                    <input
                      type="number"
                      value={quiz.passingScore}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.quizzes[quizIndex].passingScore = parseInt(e.target.value);
                        setCourseContent(updated);
                      }}
                      placeholder="Passing Score %"
                      className="border rounded px-2 py-1 w-32"
                    />
                    <input
                      type="number"
                      value={quiz.timeLimit || ""}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.quizzes[quizIndex].timeLimit = parseInt(e.target.value);
                        setCourseContent(updated);
                      }}
                      placeholder="Time Limit (minutes)"
                      className="border rounded px-2 py-1 w-32"
                    />
                  </div>
                  <button
                    onClick={() => setEditingQuiz(editingQuiz === quiz.id ? null : quiz.id)}
                    className="text-primary hover:underline text-sm"
                  >
                    {editingQuiz === quiz.id ? "Hide Questions" : "Edit Questions"}
                  </button>
                  {editingQuiz === quiz.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded">
                      <div className="space-y-4">
                        {quiz.questions.map((question, qIndex) => (
                          <div key={question.id} className="border rounded p-3 bg-white">
                            <input
                              type="text"
                              value={question.question}
                              onChange={(e) => {
                                const updated = { ...courseContent };
                                updated.quizzes[quizIndex].questions[qIndex].question = e.target.value;
                                setCourseContent(updated);
                              }}
                              placeholder="Question"
                              className="w-full border rounded px-2 py-1 mb-2"
                            />
                            {question.type === "multiple-choice" && question.options && (
                              <div className="space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <input
                                    key={optIndex}
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const updated = { ...courseContent };
                                      if (!updated.quizzes[quizIndex].questions[qIndex].options) {
                                        updated.quizzes[quizIndex].questions[qIndex].options = [];
                                      }
                                      updated.quizzes[quizIndex].questions[qIndex].options![optIndex] = e.target.value;
                                      setCourseContent(updated);
                                    }}
                                    placeholder={`Option ${optIndex + 1}`}
                                    className="w-full border rounded px-2 py-1 text-sm"
                                  />
                                ))}
                              </div>
                            )}
                            <input
                              type="text"
                              value={typeof question.correctAnswer === "string" ? question.correctAnswer : question.correctAnswer.join(", ")}
                              onChange={(e) => {
                                const updated = { ...courseContent };
                                updated.quizzes[quizIndex].questions[qIndex].correctAnswer = e.target.value;
                                setCourseContent(updated);
                              }}
                              placeholder="Correct Answer"
                              className="w-full border rounded px-2 py-1 mt-2 text-sm"
                            />
                            <button
                              onClick={() => {
                                const updated = { ...courseContent };
                                updated.quizzes[quizIndex].questions = updated.quizzes[quizIndex].questions.filter(
                                  (q) => q.id !== question.id
                                );
                                setCourseContent(updated);
                              }}
                              className="mt-2 text-red-600 text-sm hover:underline"
                            >
                              Remove Question
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const updated = { ...courseContent };
                            updated.quizzes[quizIndex].questions.push({
                              id: `q-${Date.now()}`,
                              question: "New Question",
                              type: "multiple-choice",
                              options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                              correctAnswer: "Option 1",
                              points: 10,
                            });
                            setCourseContent(updated);
                          }}
                          className="px-3 py-1 bg-primary text-white rounded text-sm"
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Projects</h2>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <div className="space-y-4">
              {courseContent.projects.map((project, projectIndex) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.projects[projectIndex].title = e.target.value;
                        setCourseContent(updated);
                      }}
                      className="text-lg font-semibold border-b-2 border-transparent focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const updated = { ...courseContent };
                        updated.projects = updated.projects.filter((p) => p.id !== project.id);
                        setCourseContent(updated);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={project.description}
                    onChange={(e) => {
                      const updated = { ...courseContent };
                      updated.projects[projectIndex].description = e.target.value;
                      setCourseContent(updated);
                    }}
                    placeholder="Project description"
                    className="w-full border rounded p-2 mb-2"
                    rows={3}
                  />
                  <div className="flex gap-4 mb-3">
                    <select
                      value={project.submissionType}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.projects[projectIndex].submissionType = e.target.value as any;
                        setCourseContent(updated);
                      }}
                      className="border rounded px-2 py-1"
                    >
                      <option value="file">File Upload</option>
                      <option value="link">Link</option>
                      <option value="text">Text</option>
                    </select>
                    <input
                      type="number"
                      value={project.maxScore}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.projects[projectIndex].maxScore = parseInt(e.target.value);
                        setCourseContent(updated);
                      }}
                      placeholder="Max Score"
                      className="border rounded px-2 py-1 w-32"
                    />
                    <input
                      type="date"
                      value={project.dueDate || ""}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.projects[projectIndex].dueDate = e.target.value;
                        setCourseContent(updated);
                      }}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-semibold">Requirements (one per line):</label>
                    <textarea
                      value={project.requirements.join("\n")}
                      onChange={(e) => {
                        const updated = { ...courseContent };
                        updated.projects[projectIndex].requirements = e.target.value.split("\n").filter(r => r.trim());
                        setCourseContent(updated);
                      }}
                      placeholder="Requirement 1&#10;Requirement 2"
                      className="w-full border rounded p-2 mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

