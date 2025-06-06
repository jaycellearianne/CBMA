"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signInStatus, setSignInStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email") {
      const emailError = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: emailError }));
    } else if (field === "password") {
      const passwordError = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: passwordError }));
    }
  };

  const isFormValid = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    return !emailError && !passwordError && email.trim() && password.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    // Only proceed if no errors
    if (!emailError && !passwordError) {
      setIsLoading(true);

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // TODO: Implement authentication logic
        console.log("Sign in:", { email, password });
      } catch (error) {
        console.error("Sign in error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main content - optimized for mobile */}
      <div className="px-4 py-6 max-w-sm mx-auto">
        {/* Logo - mobile optimized size */}
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

        {/* Sign In heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-medium text-black mb-1">Sign In</h1>
          <p className="text-gray-500 text-md">Access your account</p>
        </div>

        {/* Status message */}
        {signInStatus && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              signInStatus.success
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
            role="alert"
          >
            <div className="flex items-center">
              {signInStatus.success ? (
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {signInStatus.message}
            </div>
          </div>
        )}

        {/* Form - mobile optimized */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-md text-black mb-2 font-medium">
              Email
            </label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  const emailError = validateEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: emailError }));
                }
              }}
              onBlur={() => handleBlur("email")}
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

          {/* Password field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-md text-black font-medium">Password</label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-700 active:text-gray-800 transition-colors touch-manipulation"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  const passwordError = validatePassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: passwordError }));
                }
              }}
              onBlur={() => handleBlur("password")}
              className={`w-full h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.password && touched.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50"
                  : password && !errors.password
                  ? "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
                  : "border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              }`}
              autoComplete="current-password"
              disabled={isLoading}
            />
            {errors.password && touched.password && (
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
                {errors.password}
              </p>
            )}
          </div>

          {/* Sign In button - mobile optimized */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full h-12 text-base font-medium rounded-lg transition-all touch-manipulation ${
                isLoading || !isFormValid()
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
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>

        {/* Sign up link - mobile optimized touch target */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-gray-600 hover:text-gray-800 active:text-gray-900 font-medium transition-colors touch-manipulation underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
