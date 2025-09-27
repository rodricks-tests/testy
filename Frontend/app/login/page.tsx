"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, setUser } = useAuth();
  const passwordRef = useRef<HTMLInputElement>(null);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm(email, password)) return;

  setIsLoading(true);
  setError(null);

  const loginPromise = login(email, password);

  try {
    await toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Welcome back!",
      error: "Login failed. Please check your credentials.",
    });

    router.push("/");
  } catch (error: any) {
    console.error("❌ Login error:", error);
    setError("An error occurred during login" );
  } finally {
    setIsLoading(false);
    setEmail("");
    setPassword("");
  }

  console.log("Logging in with:", { email, password });
};


  const validateForm = (email: string, password: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;

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
    <div className="relative flex h-screen w-screen items-center justify-center bg-white overflow-hidden">
      {/* Background Images */}
      <motion.img
        src="/handpic.png"
        alt="Hand"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-6 w-[80%] max-w-[900px] pointer-events-none select-none"
      />

      <div className="absolute top-0 right-0 w-[50%] h-[50%] overflow-hidden pointer-events-none select-none">
        <motion.img
          src="/picframe.png"
          alt="Frame"
          initial={{ scale: 0.8, opacity: 0, x: 100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute bottom-20 right-5 w-[200%] max-w-[1000px] translate-x-1/2 lg:translate-x-[15%]"
        />
      </div>

      {/* Glass Form */}
      <div className="relative z-10 w-[380px] rounded-2xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/Bidzylogo.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold font-genos text-gray-900 mb-6">
          Welcome Back!
        </h2>
        

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passwordRef.current?.focus();
              }
            }}
            className="w-full rounded-lg px-4 py-2 
    bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 
    border border-white/50 shadow-inner 
    focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-2 
    bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 
    border border-white/50 shadow-inner 
    focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              className="text-xs text-gray-600 cursor-pointer hover:underline"
              href="/forgotpassword"
            >
              Forgot password?
            </Link>
          </div>

          {/* Gold Button */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-md text-black font-semibold shadow-md 
            bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] 
            hover:from-[#996515] hover:via-[#e6c200] hover:to-[#996515]"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-700 mb-2">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="font-bold cursor-pointer">Sign Up</span>
          </Link>
        </p>
          <p className="text-gray-700 text-xs mt-2">
            By logging in, you agree to our{" "}
            <a href="#" className="text-yellow-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-yellow-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
