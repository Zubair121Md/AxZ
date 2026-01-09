import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { users, initializeUsers, LMSCredentials } from "@/lib/data/users";
import { sendEmail, generateLMSCredentialsEmail } from "@/lib/email";
import { courses } from "@/lib/data/courses";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Generate unique LMS ID
function generateLMSId(courseId: string, userId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const coursePrefix = courseId.substring(0, 3).toUpperCase().replace(/-/g, "");
  const userPrefix = userId.substring(0, 3).toUpperCase();
  return `${coursePrefix}-${userPrefix}-${timestamp}`;
}

// Generate secure password
function generateLMSPassword(): string {
  const length = 12;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

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

    // Check if course exists
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Initialize arrays if they don't exist
    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }
    if (!user.lmsCredentials) {
      user.lmsCredentials = [];
    }
    
    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      // Return existing credentials
      const existingCreds = user.lmsCredentials.find((c) => c.courseId === courseId);
      return NextResponse.json({
        success: true,
        message: "Already enrolled in course",
        enrolledCourses: user.enrolledCourses,
        lmsCredentials: existingCreds,
      });
    }

    // Add course to enrolled courses
    user.enrolledCourses.push(courseId);

    // Generate LMS credentials
    const lmsId = generateLMSId(courseId, user.id);
    const lmsPassword = generateLMSPassword();

    const lmsCredentials: LMSCredentials = {
      lmsId,
      lmsPassword,
      courseId,
      generatedAt: new Date(),
    };

    // Store credentials
    user.lmsCredentials.push(lmsCredentials);

    // Send email with credentials
    const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/lms/${courseId}`;
    const emailHtml = generateLMSCredentialsEmail(
      user.name,
      course.title,
      lmsId,
      lmsPassword,
      courseUrl
    );

    const emailSent = await sendEmail({
      to: user.email,
      subject: `Your LMS Credentials for ${course.title} - Amity x ZMT EdTech`,
      html: emailHtml,
    });

    if (!emailSent) {
      console.error("Failed to send email, but enrollment was successful");
    }

    return NextResponse.json({
      success: true,
      message: "Successfully enrolled in course. LMS credentials have been sent to your email.",
      enrolledCourses: user.enrolledCourses,
      lmsCredentials: {
        lmsId,
        courseId,
      },
      emailSent,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

