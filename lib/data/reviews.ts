// Reviews and ratings data structure

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  helpful: number;
  verified: boolean; // Whether user completed the course
}

// In-memory storage for reviews
export const reviewsStore: Map<string, Review[]> = new Map();

// Get reviews for a course
export function getCourseReviews(courseId: string): Review[] {
  return reviewsStore.get(courseId) || [];
}

// Add a review
export function addReview(review: Review): void {
  const courseReviews = reviewsStore.get(review.courseId) || [];
  courseReviews.push(review);
  reviewsStore.set(review.courseId, courseReviews);
}

// Get average rating for a course
export function getAverageRating(courseId: string): number {
  const reviews = reviewsStore.get(courseId) || [];
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

// Mark review as helpful
export function markReviewAsHelpful(courseId: string, reviewId: string): void {
  const reviews = reviewsStore.get(courseId) || [];
  const review = reviews.find((r) => r.id === reviewId);
  if (review) {
    review.helpful += 1;
  }
}

