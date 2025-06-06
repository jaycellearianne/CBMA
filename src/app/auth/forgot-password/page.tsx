"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleBlur = () => {
    setTouched({ email: true });
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    setTouched({ email: true });

    if (!emailError) {
      setIsLoading(true);

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // TODO: Implement password reset logic
        console.log("Password reset request:", { email });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Password reset error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 max-w-sm mx-auto">
        {!isSubmitted ? (
          <>
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-50 h-50 relative">
                <Image
                  src="/Logo-CBMA.png"
                  alt="CBMA Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Reset Password heading */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-medium text-black mb-2">
                Reset Password
              </h1>
              <p className="text-gray-500 text-md leading-relaxed">
                Enter your email and we'll send you a link to reset your
                password
              </p>
            </div>

            {/* Form - mobile optimized */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block text-md text-black mb-2 font-medium">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) {
                      const emailError = validateEmail(e.target.value);
                      setErrors({ email: emailError });
                    }
                  }}
                  onBlur={handleBlur}
                  className={`w-full h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none transition-all ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50"
                      : email && !errors.email
                      ? "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  }`}
                  autoComplete="email"
                  inputMode="email"
                  disabled={isLoading}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Send Reset Link button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 text-base font-medium rounded-lg transition-all touch-manipulation ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </div>
            </form>

            {/* Sign in link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-gray-600 hover:text-gray-800 active:text-gray-900 font-medium transition-colors touch-manipulation underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[700px]">
            {/* Success message */}
            <div className="bg-green-50 rounded-lg shadow-md p-10 w-full max-w-md text-center relative">
              {/* Close button */}
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Success icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Success text */}
              <h2 className="text-3xl font-semibold text-green-800 mb-2">
                Success!
              </h2>

              <p className="text-gray-600 mb-5">
                We've sent a password reset link to:
              </p>

              <p className="text-black font-medium text-lg">{email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
