// Course content data structure

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "coding";
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
  attempts?: number;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  submissionType: "file" | "link" | "text";
  dueDate?: string;
  maxScore: number;
  instructions?: string;
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "resource" | "quiz" | "project";
  duration: string;
  videoUrl?: string;
  resourceUrl?: string;
  quizId?: string;
  projectId?: string;
  completed: boolean;
  order: number;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  order: number;
}

export interface LiveClass {
  id: string;
  title: string;
  date: string;
  time: string;
  meetingLink: string;
  status: "upcoming" | "live" | "completed";
  recordingUrl?: string;
  duration?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "doc" | "zip" | "link" | "video";
  url: string;
  description?: string;
  size?: string;
}

export interface CourseContent {
  courseId: string;
  modules: Module[];
  quizzes: Quiz[];
  projects: Project[];
  liveClasses?: LiveClass[];
  resources: Resource[];
  createdAt?: Date;
  updatedAt?: Date;
}

// In-memory storage for course content
export const courseContentStore: Map<string, CourseContent> = new Map();

// Initialize default content for a course
export function initializeCourseContent(courseId: string): CourseContent {
  const defaultContent: CourseContent = {
    courseId,
    modules: [
      {
        id: "module-1",
        title: "Introduction to the Course",
        description: "Get started with the fundamentals",
        order: 1,
        lessons: [
          {
            id: "lesson-1",
            title: "Welcome and Course Overview",
            type: "video",
            duration: "15:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: false,
            order: 1,
            description: "Introduction to the course and what you'll learn",
          },
          {
            id: "lesson-2",
            title: "Setting Up Your Environment",
            type: "video",
            duration: "22:45",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: false,
            order: 2,
            description: "Learn how to set up your development environment",
          },
          {
            id: "lesson-3",
            title: "Course Resources Download",
            type: "resource",
            duration: "5:00",
            resourceUrl: "#",
            completed: false,
            order: 3,
            description: "Download all course materials and resources",
          },
        ],
      },
      {
        id: "module-2",
        title: "Core Concepts",
        description: "Learn the fundamental concepts",
        order: 2,
        lessons: [
          {
            id: "lesson-4",
            title: "Understanding the Fundamentals",
            type: "video",
            duration: "28:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: false,
            order: 1,
            description: "Deep dive into core concepts",
          },
          {
            id: "lesson-5",
            title: "Practical Examples",
            type: "video",
            duration: "35:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: false,
            order: 2,
            description: "Hands-on examples and exercises",
          },
        ],
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        title: "Module 1 Assessment",
        description: "Test your understanding of the introduction module",
        passingScore: 70,
        timeLimit: 30,
        attempts: 3,
        order: 1,
        questions: [
          {
            id: "q1",
            question: "What is the main topic of this course?",
            type: "multiple-choice",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
            points: 10,
            explanation: "This course focuses on the fundamentals",
          },
        ],
      },
    ],
    projects: [
      {
        id: "project-1",
        title: "First Project Assignment",
        description: "Apply what you've learned in a practical project",
        requirements: ["Complete all tasks", "Submit before deadline", "Follow best practices"],
        submissionType: "file",
        maxScore: 100,
        order: 1,
      },
    ],
    resources: [
      {
        id: "resource-1",
        title: "Course Slides (PDF)",
        type: "pdf",
        url: "#",
        description: "Download all course presentation slides",
      },
      {
        id: "resource-2",
        title: "Practice Exercises",
        type: "zip",
        url: "#",
        description: "Additional practice problems and solutions",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  courseContentStore.set(courseId, defaultContent);
  return defaultContent;
}

