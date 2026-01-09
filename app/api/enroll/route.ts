import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { users, initializeUsers } from "@/lib/data/users";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Add course to user's enrolled courses
    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }
    
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
    }

    return NextResponse.json({
      success: true,
      message: "Successfully enrolled in course",
      enrolledCourses: user.enrolledCourses,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

