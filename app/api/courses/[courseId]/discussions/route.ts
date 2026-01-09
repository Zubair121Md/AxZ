import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { users, initializeUsers } from "@/lib/data/users";
import { getCourseDiscussions, addDiscussionPost, DiscussionPost } from "@/lib/data/discussions";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const discussions = getCourseDiscussions(params.courseId);
    return NextResponse.json(discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post: DiscussionPost = {
      id: `post-${Date.now()}`,
      courseId: params.courseId,
      authorId: user.id,
      authorName: user.name,
      title,
      content,
      createdAt: new Date(),
      replies: [],
      upvotes: 0,
      downvotes: 0,
    };

    addDiscussionPost(post);

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error creating discussion post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

