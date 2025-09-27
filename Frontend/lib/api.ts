"use client";

import toast from "react-hot-toast";

// import { toast } from '@/hooks/use-toast';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Unauthorized, likely expired token
    if (typeof window !== "undefined") {
      const publicPaths = ["/", "/signup", "/forgot-password"];
      if (!publicPaths.includes(window.location.pathname)) {
        localStorage.removeItem("authToken");
        toast.error("please login again");
        console.log("please login");
        // Redirect to login page
        window.location.href = "/login";
        // Throw an error to stop further processing in the original caller
        throw new Error("Unauthorized");
      }
    }
  }
  // console.log(response);
  return response;
}
