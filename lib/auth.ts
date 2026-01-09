// Client-side auth utility

export async function checkAuth(): Promise<{ isAuthenticated: boolean; user?: any }> {
  try {
    const response = await fetch("/api/auth/me", {
      credentials: "include",
    });
    
    if (response.ok) {
      const data = await response.json();
      return { isAuthenticated: true, user: data.user };
    }
    return { isAuthenticated: false };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

