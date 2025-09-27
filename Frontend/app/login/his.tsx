"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(email, password)) {
      return;
    }
    setIsLoading(true);

    try {
      await login(email, password);
      // toast({
      //   title: "Login Successful",
      //   description: "Welcome back!",
      // });
      router.push("/");
    } catch (error: any) {
        setError(error);
      // toast({
      //   variant: "destructive",
      //   title: "Login Error",
      //   description: error.message || "Login failed. Please check your credentials.",
      // })
    } finally {
      setIsLoading(false);
    }
    // Handle login logic here
    console.log("Logging in with:", { email, password });
    // Reset fields after login attempt
    setEmail("");
    setPassword("");
  };
  const validateForm = (email: string, password: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;

    if (email.trim() === "") {
      setError("Email is required.");
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.trim() === "") {
      setError("Password is required.");
      return false;
    }

    if (password.trim().length < passwordMinLength) {
      setError(`Password must be at least ${passwordMinLength} characters.`);
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className=" backdrop-blur-sm border border-white/20 p-10 rounded-3xl w-[400px] text-center">
          <div className="mb-6">
            <Image
              src="/logo.svg"
              alt="Bidzy Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
            <h1 className="text-yellow-500 font-bold text-2xl mt-4">
              Welcome Back!
            </h1>
            <p className="text-gray-300 text-sm mt-1">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsClicked(!isClicked)}
                className={`text-white font-semibold focus:outline-none ${
                  isClicked ? "underline" : ""
                }`}
              >
                Sign In
              </button>
            </p>
          </div>

          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              className="px-4 py-2 rounded-md bg-gray-200 text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="px-4 py-2 rounded-md bg-gray-200 text-black focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="mt-2 bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-medium py-2 rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-gray-400 text-xs mt-2">
              By logging in, you agree to our{" "}
              <a href="#" className="text-yellow-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-yellow-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
