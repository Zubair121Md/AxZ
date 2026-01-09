import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { users, initializeUsers } from "@/lib/data/users";
import {
  getUserNotifications,
  addNotification,
  markNotificationAsRead,
  Notification,
} from "@/lib/data/notifications";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(request: NextRequest) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const notifications = getUserNotifications(decoded.userId);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const body = await request.json();
    const { type, title, message, courseId, link } = body;

    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: decoded.userId,
      type: type || "announcement",
      title: title || "New Notification",
      message: message || "",
      courseId,
      link,
      read: false,
      createdAt: new Date(),
    };

    addNotification(notification);

    return NextResponse.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await initializeUsers();
    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const body = await request.json();
    const { notificationId } = body;

    if (notificationId) {
      markNotificationAsRead(decoded.userId, notificationId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

