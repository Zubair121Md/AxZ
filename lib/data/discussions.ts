// Discussion forum data structure

export interface DiscussionPost {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  replies: DiscussionReply[];
  upvotes: number;
  downvotes: number;
  isPinned?: boolean;
  tags?: string[];
}

export interface DiscussionReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  upvotes: number;
  downvotes: number;
  isInstructorReply?: boolean;
}

// In-memory storage for discussions
export const discussionsStore: Map<string, DiscussionPost[]> = new Map();

// Get discussions for a course
export function getCourseDiscussions(courseId: string): DiscussionPost[] {
  return discussionsStore.get(courseId) || [];
}

// Add a new discussion post
export function addDiscussionPost(post: DiscussionPost): void {
  const courseDiscussions = discussionsStore.get(post.courseId) || [];
  courseDiscussions.push(post);
  discussionsStore.set(post.courseId, courseDiscussions);
}

// Add a reply to a discussion
export function addDiscussionReply(courseId: string, postId: string, reply: DiscussionReply): boolean {
  const courseDiscussions = discussionsStore.get(courseId) || [];
  const post = courseDiscussions.find((p) => p.id === postId);
  if (post) {
    post.replies.push(reply);
    return true;
  }
  return false;
}

