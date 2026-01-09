// Notifications data structure

export interface Notification {
  id: string;
  userId: string;
  type: "course_update" | "deadline" | "new_content" | "grade" | "announcement" | "reply";
  title: string;
  message: string;
  courseId?: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

// In-memory storage for notifications
export const notificationsStore: Map<string, Notification[]> = new Map();

// Get notifications for a user
export function getUserNotifications(userId: string): Notification[] {
  return notificationsStore.get(userId) || [];
}

// Add a notification
export function addNotification(notification: Notification): void {
  const userNotifications = notificationsStore.get(notification.userId) || [];
  userNotifications.unshift(notification); // Add to beginning
  notificationsStore.set(notification.userId, userNotifications);
}

// Mark notification as read
export function markNotificationAsRead(userId: string, notificationId: string): boolean {
  const userNotifications = notificationsStore.get(userId) || [];
  const notification = userNotifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return true;
  }
  return false;
}

// Mark all notifications as read
export function markAllNotificationsAsRead(userId: string): void {
  const userNotifications = notificationsStore.get(userId) || [];
  userNotifications.forEach((n) => (n.read = true));
}

// Get unread count
export function getUnreadCount(userId: string): number {
  const userNotifications = notificationsStore.get(userId) || [];
  return userNotifications.filter((n) => !n.read).length;
}

