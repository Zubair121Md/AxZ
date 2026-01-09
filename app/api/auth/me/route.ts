import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { users, initializeUsers } from "@/lib/data/users";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(request: NextRequest) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
      const user = users.find((u) => u.id === decoded.userId);

      if (!user) {
        return NextResponse.json(
          { isAuthenticated: false },
          { status: 401 }
        );
      }

      return NextResponse.json({
        isAuthenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          enrolledCourses: user.enrolledCourses || [],
        },
      });
    } catch (error) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 500 }
    );
  }
}

