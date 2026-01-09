import { NextRequest, NextResponse } from "next/server";
import { courseContentStore, initializeCourseContent, CourseContent } from "@/lib/data/courseContent";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    let content = courseContentStore.get(params.courseId);
    
    if (!content) {
      // Initialize default content if it doesn't exist
      content = initializeCourseContent(params.courseId);
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

