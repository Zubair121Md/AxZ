import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { users, initializeUsers } from "@/lib/data/users";
import { courseContentStore, CourseContent } from "@/lib/data/courseContent";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = users.find((u) => u.id === decoded.userId);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const content = courseContentStore.get(params.courseId);
    if (!content) {
      return NextResponse.json({
        courseId: params.courseId,
        modules: [],
        quizzes: [],
        projects: [],
        resources: [],
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching course content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = users.find((u) => u.id === decoded.userId);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const content: CourseContent = {
      ...body,
      courseId: params.courseId,
      updatedAt: new Date(),
    };

    courseContentStore.set(params.courseId, content);

    return NextResponse.json({
      success: true,
      message: "Course content saved successfully",
    });
  } catch (error) {
    console.error("Error saving course content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

