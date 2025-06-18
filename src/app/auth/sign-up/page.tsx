"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    fullName?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateFullName = (name: string) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2)
      return "Full name must be at least 2 characters";
    return "";
  };

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

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  // Add this function after the validation functions and before handleBlur
  const isFormValid = () => {
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    return (
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      fullName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim()
    );
  };

  const handleBlur = (
    field: "fullName" | "email" | "password" | "confirmPassword"
  ) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    let error = "";
    switch (field) {
      case "fullName":
        error = validateFullName(fullName);
        break;
      case "email":
        error = validateEmail(email);
        break;
      case "password":
        error = validatePassword(password);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(confirmPassword, password);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Only proceed if no errors
    if (
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setIsLoading(true);

      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // TODO: Implement account creation logic
        window.location.href = "/dashboard";
        console.log("Create account:", { fullName, email, password });
      } catch (error) {
        console.error("Account creation error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Main content */}
      <div className="px-4 py-6 max-w-sm mx-auto">
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

        {/* Create Account heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-medium text-black mb-1">
            Create Account
          </h1>
        </div>

        {/* Form - mobile optimized */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name field */}
          <div>
            <label className="block text-md text-black mb-2 font-medium">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (touched.fullName) {
                  const fullNameError = validateFullName(e.target.value);
                  setErrors((prev) => ({ ...prev, fullName: fullNameError }));
                }
              }}
              onBlur={() => handleBlur("fullName")}
              className={`w-full h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.fullName && touched.fullName
                  ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50"
                  : fullName && !errors.fullName
                  ? "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
                  : "border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              }`}
              autoComplete="name"
              disabled={isLoading}
            />
            {errors.fullName && touched.fullName && (
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
                {errors.fullName}
              </p>
            )}
          </div>

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
            <label className="block text-md text-black mb-2 font-medium">
              Password
            </label>
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
                // Also revalidate confirm password if it's been touched
                if (touched.confirmPassword) {
                  const confirmPasswordError = validateConfirmPassword(
                    confirmPassword,
                    e.target.value
                  );
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: confirmPasswordError,
                  }));
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
              autoComplete="new-password"
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

          {/* Confirm Password field */}
          <div>
            <label className="block text-md text-black mb-2 font-medium">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (touched.confirmPassword) {
                  const confirmPasswordError = validateConfirmPassword(
                    e.target.value,
                    password
                  );
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: confirmPasswordError,
                  }));
                }
              }}
              onBlur={() => handleBlur("confirmPassword")}
              className={`w-full h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none transition-all ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50"
                  : confirmPassword && !errors.confirmPassword
                  ? "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
                  : "border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              }`}
              autoComplete="new-password"
              disabled={isLoading}
            />
            {errors.confirmPassword && touched.confirmPassword && (
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
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Create Account button - mobile optimized */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full h-12 text-base font-medium rounded-lg transition-all touch-manipulation ${
                isFormValid() && !isLoading
                  ? "bg-[#6F4E37] hover:bg-[#A67B5B] active:bg-[#6F4E37] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>

        {/* Sign in link - mobile optimized touch target */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-gray-600 hover:text-gray-800 active:text-gray-900 font-medium transition-colors touch-manipulation underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
