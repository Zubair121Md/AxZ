// In-memory user storage (replace with database in production)
import * as bcryptjs from "bcryptjs";

export interface LMSCredentials {
  lmsId: string;
  lmsPassword: string;
  courseId: string;
  generatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role?: "student" | "instructor" | "admin";
  enrolledCourses?: string[]; // Array of course IDs
  lmsCredentials?: LMSCredentials[]; // Array of LMS credentials per course
}

// Mock users database (in production, use a real database)
export const users: User[] = [];

let initialized = false;

// Initialize with default users
export async function initializeUsers() {
  if (initialized) return; // Already initialized
  
  const adminPassword = await hashPassword("admin123");
  const user1Password = await hashPassword("user123");
  const user2Password = await hashPassword("user123");
  const user3Password = await hashPassword("user123");
  
  // Admin user
  users.push({
    id: "1",
    email: "admin@amity.edu",
    password: adminPassword,
    name: "Admin User",
    role: "admin",
  });
  
  // User 1 - enrolled in live courses (course IDs: 1-live, 3-live, 5-live)
  users.push({
    id: "2",
    email: "user1@example.com",
    password: user1Password,
    name: "John Doe",
    role: "student",
    enrolledCourses: ["1-live", "3-live", "5-live"], // Live courses
  });
  
  // User 2 - enrolled in self-paced courses (course IDs: 2-self-paced, 4-self-paced, 6-self-paced)
  users.push({
    id: "3",
    email: "user2@example.com",
    password: user2Password,
    name: "Jane Smith",
    role: "student",
    enrolledCourses: ["2-self-paced", "4-self-paced", "6-self-paced"], // Self-paced courses
  });
  
  // User 3 - enrolled in both (course IDs: 1-live, 2-self-paced, 7-live, 8-self-paced)
  users.push({
    id: "4",
    email: "user3@example.com",
    password: user3Password,
    name: "Bob Johnson",
    role: "student",
    enrolledCourses: ["1-live", "2-self-paced", "7-live", "8-self-paced"], // Mixed
  });
  
  initialized = true;
}

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function createUser(userData: Omit<User, "id">): User {
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
  };
  users.push(newUser);
  return newUser;
}

