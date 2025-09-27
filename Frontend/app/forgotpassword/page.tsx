"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BASE_URL } from "@/config";

type Step = 'email' | 'otp' | 'reset';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(BASE_URL + '/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP sent to your email!");
        setCurrentStep('otp');
      } else {
        setError(data.message || "User with this email is not found.");
      }
    } catch (error: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtp(otp)) {
      return;
    }

    setCurrentStep('reset');
    setError(null);
    setSuccessMessage(null);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswordReset(newPassword, confirmPassword)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(BASE_URL + '/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Invalid or expired OTP.");
      }
    } catch (error: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
      setError("Email is required.");
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError(null);
    return true;
  };

  const validateOtp = (otp: string): boolean => {
    if (otp.trim() === "") {
      setError("OTP is required.");
      return false;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return false;
    }

    setError(null);
    return true;
  };

  const validatePasswordReset = (newPassword: string, confirmPassword: string): boolean => {
    const passwordMinLength = 6;

    if (newPassword.trim() === "") {
      setError("New password is required.");
      return false;
    }

    if (newPassword.trim().length < passwordMinLength) {
      setError(`Password must be at least ${passwordMinLength} characters.`);
      return false;
    }

    if (confirmPassword.trim() === "") {
      setError("Please confirm your password.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError(null);
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <h2 className="text-center text-2xl font-semibold font-genos text-gray-900 mb-1">
              Forgot Password?
            </h2>
            <p className="text-center text-sm text-gray-700 mb-6">
              Enter your email address and we'll send you an OTP to reset your password.
            </p>

            <form className="flex flex-col space-y-4" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-4 py-2 
                bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 
                border border-white/50 shadow-inner 
                focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md 
                bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] 
                hover:from-[#996515] hover:via-[#e6c200] hover:to-[#996515]
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        );

      case 'otp':
        return (
          <>
            <h2 className="text-center text-2xl font-semibold font-genos text-gray-900 mb-1">
              Enter OTP
            </h2>
            <p className="text-center text-sm text-gray-700 mb-6">
              Please enter the 6-digit OTP sent to your email address.
            </p>

            <form className="flex flex-col space-y-4" onSubmit={handleOtpSubmit}>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full rounded-lg px-4 py-2 text-center text-lg tracking-widest
                bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 
                border border-white/50 shadow-inner 
                focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                maxLength={6}
              />

              <button
                type="submit"
                className="w-full py-2 rounded-md text-black font-semibold shadow-md 
                bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] 
                hover:from-[#996515] hover:via-[#e6c200] hover:to-[#996515]"
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep('email')}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Back to email entry
              </button>
            </form>
          </>
        );

      case 'reset':
        return (
          <>
            <h2 className="text-center text-2xl font-semibold font-genos text-gray-900 mb-1">
              Reset Password
            </h2>
            <p className="text-center text-sm text-gray-700 mb-6">
              Enter your new password below.
            </p>

            <form className="flex flex-col space-y-4" onSubmit={handlePasswordReset}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg px-4 py-2 
                bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 
                border border-white/50 shadow-inner 
                focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
              />
              
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg px-4 py-2 
                bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 
                border border-white/50 shadow-inner 
                focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md 
                bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] 
                hover:from-[#996515] hover:via-[#e6c200] hover:to-[#996515]
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep('otp')}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Back to OTP verification
              </button>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-white overflow-hidden">
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

      <div className="relative z-10 w-[380px] rounded-2xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30 p-8">
        <div className="flex justify-center mb-4">
          <img
            src="/Bidzylogo.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {renderStepContent()}

        {error && (
          <div className="mt-4 p-3 bg-red-100/80 backdrop-blur-md border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-3 bg-green-100/80 backdrop-blur-md border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
            Back to Login
          </Link>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <div className={`h-2 w-2 rounded-full ${currentStep === 'email' ? 'bg-yellow-600' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full ${currentStep === 'otp' ? 'bg-yellow-600' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full ${currentStep === 'reset' ? 'bg-yellow-600' : 'bg-gray-300'}`}></div>
        </div>
      </div>
    </div>
  );
}