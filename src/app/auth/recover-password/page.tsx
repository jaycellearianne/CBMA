"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RecoverPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  const isFormValid = () => {
    return (
      !validatePassword(password) &&
      !validateConfirmPassword(confirmPassword) &&
      password.trim() &&
      confirmPassword.trim()
    );
  };

  const handleBlur = (field: "password" | "confirmPassword") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "password"
          ? validatePassword(password)
          : validateConfirmPassword(confirmPassword),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    setTouched({ password: true, confirmPassword: true });

    if (!passwordError && !confirmPasswordError) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Recovered account with new password:", password);
        // TODO: Implement password reset logic
        setSuccess(true);
      } catch (err) {
        console.error("Error updating password:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 max-w-sm mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 relative">
            <Image
              src="/Logo-CBMA.png"
              alt="CBMA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-medium text-black">
            {success ? "Password Updated!" : "Reset Password"}
          </h1>
        </div>

        {success ? (
          // ✅ Success message with Sign In button
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              Your password has been updated successfully.
            </p>
            <Button
              onClick={() => router.push("/auth/sign-in")}
              className="w-full h-12 text-base font-medium rounded-lg bg-[#6F4E37] hover:bg-[#A67B5B] text-white"
            >
              Go to Sign In
            </Button>
          </div>
        ) : (
          // 🔁 Form shows if not yet successful
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-md text-black mb-2 font-medium">
                New Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: validatePassword(e.target.value),
                    }));
                  }
                }}
                onBlur={() => handleBlur("password")}
                placeholder="••••••••"
                className={`w-full h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none transition-all ${
                  errors.password && touched.password
                    ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500"
                    : password && !errors.password
                    ? "border-green-500 bg-green-50 focus:ring-2 focus:ring-green-500"
                    : "border-gray-300 focus:ring-2 focus:ring-amber-500"
                }`}
                autoComplete="new-password"
                disabled={isLoading}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-md text-black mb-2 font-medium">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (touched.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: validateConfirmPassword(e.target.value),
                    }));
                  }
                }}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="••••••••"
                className={`w-full h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none transition-all ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500"
                    : confirmPassword && !errors.confirmPassword
                    ? "border-green-500 bg-green-50 focus:ring-2 focus:ring-green-500"
                    : "border-gray-300 focus:ring-2 focus:ring-amber-500"
                }`}
                autoComplete="new-password"
                disabled={isLoading}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full h-12 text-base font-medium rounded-lg transition-all ${
                isFormValid() && !isLoading
                  ? "bg-[#6F4E37] hover:bg-amber-900 text-white"
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
                  Updating...
                </div>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        )}

        {!success && (
          <div className="text-center mt-6">
            <Link
              href="/auth/sign-in"
              className="text-sm text-gray-600 hover:text-gray-800 font-medium underline"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
