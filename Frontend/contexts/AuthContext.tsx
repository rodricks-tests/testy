// src/contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { fetchWithAuth } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";
import PrimaryToast from "@/components/ui/Toast";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: (token: string) => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await fetchWithAuth(BASE_URL + "/api/auth/profile");
          if (response.ok) {
            const userData = await response.json();
            console.log("Fetched user on mount:", userData);
            setUser(userData);
          } else {
            // Token is invalid or expired
            if (
              pathname !== "/" &&
              pathname !== "/signup" &&
              pathname !== "/forgot-password"
            ) {
              logout();
            }
          }
        } catch (error) {
          console.error("Failed to fetch user on mount", error);
          if (
            pathname !== "/" &&
            pathname !== "/signup" &&
            pathname !== "/forgot-password"
          ) {
            logout();
          }
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("login error", errorData);
        toast.custom((t) => (
          <PrimaryToast
            message={errorData.message || "Login failed"}
            t={t}
            onClose={() => toast.dismiss(t.id)}
          />
        ));
        throw new Error(errorData.message || "Login failed");
      }
      console.log("response ok");
      console.log(response);
      if (response.status === 401) {
        const errorData = await response.json();
        console.log("login error", errorData);
        toast.custom((t) => (
          <PrimaryToast
            message={errorData.message || "Login failed"}
            t={t}
            onClose={() => toast.dismiss(t.id)}
          />
        ));
        throw new Error(errorData.message || "Login failed");
      }

      const { token: newToken } = await response.json();
      localStorage.setItem("authToken", newToken);
      setToken(newToken);

      await fetchProfile(newToken);



    } catch (error) {
      console.log("Network error", error);
      toast.custom((t) => (
        <PrimaryToast
          message={"Login failed, Please try again"}
          error={true}
          t={t}
          onClose={() => toast.dismiss(t.id)}
        />
      ));
      throw new Error("Network error. Please try again.");
    }

    // const userResponse = await fetchWithAuth(BASE_URL+'/api/auth/profile', {
    //     headers: { Authorization: `Bearer ${newToken}` }
    // });

    // if (!userResponse.ok) {
    //     throw new Error("Failed to fetch user data after login.");
    // }

    // const userData = await userResponse.json();
    // setUser(userData);
  };

  const fetchProfile = async (token: string) => {
    const userResponse = await fetchWithAuth(BASE_URL + "/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data after login.");
    }

    const userData = await userResponse.json();
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    router.refresh();
    router.push("/");
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch(BASE_URL + "/api/Auth/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      const response = await fetch(BASE_URL + "/api/Auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword, confirmPassword }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, fetchProfile, setUser: updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
