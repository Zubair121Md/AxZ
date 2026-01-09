// Assignment submission data structure

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  courseId: string;
  studentId: string;
  studentName: string;
  submissionType: "file" | "link" | "text";
  fileUrl?: string;
  linkUrl?: string;
  textContent?: string;
  submittedAt: Date;
  graded: boolean;
  score?: number;
  maxScore: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
}

export interface Assignment {
  id: string;
  courseId: string;
  projectId: string; // Links to project in course content
  title: string;
  description: string;
  dueDate?: string;
  maxScore: number;
  submissions: AssignmentSubmission[];
}

// In-memory storage for assignments
export const assignmentsStore: Map<string, Assignment[]> = new Map();

// Get assignments for a course
export function getCourseAssignments(courseId: string): Assignment[] {
  return assignmentsStore.get(courseId) || [];
}

// Add assignment submission
export function addAssignmentSubmission(submission: AssignmentSubmission): void {
  const courseAssignments = assignmentsStore.get(submission.courseId) || [];
  const assignment = courseAssignments.find((a) => a.id === submission.assignmentId);
  if (assignment) {
    assignment.submissions.push(submission);
  }
}

// Grade assignment submission
export function gradeAssignmentSubmission(
  courseId: string,
  assignmentId: string,
  submissionId: string,
  score: number,
  feedback: string,
  gradedBy: string
): boolean {
  const courseAssignments = assignmentsStore.get(courseId) || [];
  const assignment = courseAssignments.find((a) => a.id === assignmentId);
  if (assignment) {
    const submission = assignment.submissions.find((s) => s.id === submissionId);
    if (submission) {
      submission.graded = true;
      submission.score = score;
      submission.feedback = feedback;
      submission.gradedBy = gradedBy;
      submission.gradedAt = new Date();
      return true;
    }
  }
  return false;
}

