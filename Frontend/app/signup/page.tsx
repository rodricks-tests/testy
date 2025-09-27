"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("Bidder");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);

  // Handle file preview
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Cleanup on unmount or file change
    } else {
      setFilePreview(null);
    }
  }, [file]);

  const validateStep1 = async () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 🔍 Basic validations
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // ✅ If no client-side errors, check email existence
    if (Object.keys(newErrors).length === 0) {
      setIsCheckingEmail(true);

      const emailCheckPromise = fetch(BASE_URL + "/api/auth/exitemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      try {
        const response = await toast.promise(emailCheckPromise, {
          loading: "Checking email...",
          error: "Failed to check email",
        });

        const data = await response.json();
        if (data.exists) {
          newErrors.email = "Email already exists";
          toast("This email is already registered.", { icon: "⚠️" });
        }
      } catch (err) {
        newErrors.email = "Error checking email availability";
      } finally {
        setIsCheckingEmail(false);
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else {
      setIsSendingOtp(true);
      try {
        const response = await fetch(BASE_URL + "/api/auth/otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, action: "verify", otp }),
        });
        const data = await response.json();
        if (!data.success) {
          newErrors.otp = data.message || "Invalid OTP";
        }
      } catch (err) {
        newErrors.otp = "Error verifying OTP";
      } finally {
        setIsSendingOtp(false);
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (phoneNumber && !/^\+?\d{10,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    const otpRequest = fetch(BASE_URL + "/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, action: "send" }),
    });

    try {
      const response = await toast.promise(otpRequest, {
        loading: "Sending OTP...",
        success: "OTP sent successfully",
        error: "Failed to send OTP",
      });

      const data = await response.json();

      if (!data.success) {
        setErrors({ otp: data.message || "Failed to send OTP" });
        toast("OTP could not be delivered.", { icon: "⚠️" });
      }
    } catch (err) {
      console.error("❌ OTP send error:", err);
      setErrors({ otp: "Error sending OTP" });
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      if (await validateStep1()) {
        await sendOtp();
        setStep(2);
      }
    } else if (step === 2) {
      if (await validateStep2()) {
        setStep(3);
      }
    } else if (step === 3) {
      setErrors({});
      setStep(4);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep4()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("phoneNumber", phoneNumber);
      if (file) {
        formData.append("file", file);
      }
      const signupPromise = fetch(BASE_URL + "/api/auth", {
        method: "POST",
        body: formData,
      });

      const response = await toast.promise(signupPromise, {
        loading: "Creating your account...",
        success: "Account created successfully!",
        error: "Signup failed. Please try again.",
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();
      console.log("Account created:", data);

      // ✅ Reset form and redirect
      router.push("/login");
      setStep(1);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
      setFile(null);
      setOtp("");
      setRole("Bidder");
      setFilePreview(null);
    } catch (err: any) {
      console.error("❌ Signup error:", err);
      setErrors({ submit: err.message || "An error occurred during signup" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 w-full">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 z-10">
        {errors.submit && (
          <div className="text-red-500 text-center mb-4">{errors.submit}</div>
        )}

        {step === 1 && (
          <>
            <div className="flex justify-center mb-6">
              <Image src="/logo.svg" width={100} height={100} alt="logo" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
              Create an Account
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={nextStep}
                disabled={isCheckingEmail}
                className="w-full cursor-pointer py-2 rounded-md text-black font-semibold shadow-md bg-gold-gradient transition-colors duration-300 disabled:opacity-50"
              >
                {isCheckingEmail ? "Checking..." : "Next"}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
              Enter OTP
            </h2>
            <div className="flex flex-col space-y-4">
              <h2>check you email {email}</h2>
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  required
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
              </div>
              <button
                type="button"
                onClick={nextStep}
                disabled={isSendingOtp}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-gold-gradient transition-colors duration-300 disabled:opacity-50"
              >
                {isSendingOtp ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={sendOtp}
                disabled={isSendingOtp}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-gold-gradient transition-colors duration-300 disabled:opacity-50"
              >
                {isSendingOtp ? "Sending..." : "Resend OTP"}
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-gold-middle/20 transition-colors duration-300"
              >
                Back
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
              What are you interested in?
            </h2>
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                className={
                  "w-full py-2 rounded-md border " +
                  (role === "Seller"
                    ? "bg-yellow-800 text-white font-semibold shadow-md"
                    : " text-gray-600")
                }
                onClick={() => setRole("Seller")}
              >
                Sell and Buy items
              </button>
              <button
                type="button"
                className={
                  "w-full py-2 rounded-md border " +
                  (role === "Bidder"
                    ? "bg-yellow-800 text-white font-semibold shadow-md"
                    : "text-gray-600")
                }
                onClick={() => setRole("Bidder")}
              >
                Only Buy items
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-gold-gradient transition-colors duration-300"
              >
                Next
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-gold-middle/20 transition-colors duration-300"
              >
                Back
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
              Finish Creating Your Account
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <div className="mt-4 w-full flex justify-center">
                  {filePreview ? (
                    <Image
                      src={filePreview}
                      alt="Selected file preview"
                      width={100}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <Image
                      src="/default-profile.jpeg"
                      alt="Default profile"
                      width={100}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="mt-2">Upload your profile picture</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full rounded-lg px-4 py-2  backdrop-blur-md text-gray-900 placeholder-gray-600 border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 "
                />
              </div>

              <div className="text-sm text-gray-700">
                By clicking <b>"Create my account now"</b> I agree that I have
                read the site’s{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                and accept Bidzy{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Terms & Conditions
                </a>
                .
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-gold-gradient transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create my account now"}
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="w-full py-2 rounded-md text-black font-semibold shadow-md bg-amber-500/20  transition-colors duration-300"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>

      {/* Decorative Images */}
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
    </div>
  );
}
