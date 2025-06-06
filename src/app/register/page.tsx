/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasMinLength: false,
  });
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("")


  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFullNameChange = (value: string) => {
    if (!nameRegex.test(value)) {
      setFullNameError("Only letters and spaces are allowed.");
    } else {
      setFullNameError("");
    }
    setFullName(value);
  };

  const handleEmailChange = (value: string) => {
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid address.");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinLength = password.length >= 8;

    setPassword(value);
    setPasswordValidations({
      hasUppercase,
      hasSpecialChar,
      hasNumber,
      hasMinLength,
    });

    const errors = [];
    if (!hasUppercase) {
      errors.push("Must contain an uppercase letter.");
    }
    if (!hasSpecialChar) {
      errors.push("Must contain a special character.");
    }
    if (!hasNumber) {
      errors.push("Must contain a number.");
    }
    if (!hasMinLength) {
      errors.push("Must be at least 8 characters long.");
    }

    setPasswordErrors(errors);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (value != password) {
      setConfirmPasswordError("Password do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <>
      <body className="w-full justify-items-center ">
        <div className=" w-max-64">
          <h5 className="text-white">Create Account</h5>
        </div>{" "}
        <form className="w-full max-w-[320px] ">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="fullName"
              id="fullName"
              value={fullName}
              className="w-full p-2 text-sm text-gray-900 bg-gray-50 border border-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F4E37]"
              placeholder="Juan Dela Cruz"
              onChange={(e) => handleFullNameChange(e.target.value)}
              required
            />
            <div>
              {fullNameError ? (
                <text className="text-[#EE4E4E] italic text-xs">
                  {fullNameError}
                </text>
              ) : null}
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full p-2 text-sm text-gray-900 bg-gray-50 border border-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="name@gmail.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              required
            />
            <div>
              {emailError ? (
                <text className="text-[#EE4E4E] italic text-xs">
                  {emailError}
                </text>
              ) : null}
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="w-full p-2 text-sm text-gray-900 bg-gray-50 border border-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your Password"
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            <div>
              <ul className="text-[#EE4E4E] italic text-xs">
                {passwordErrors.map((err, index) => (
                  <li key={index}> {err} </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              className="w-full p-2 text-sm text-gray-900 bg-gray-50 border border-[#525252] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Confirm your password"
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              required
            />
            <div>
              {confirmPasswordError ? (
                <text className="text-[#EE4E4E] italic text-xs">{confirmPasswordError} </text>
              ): null}
            </div>
          </div>
        </form>
      </body>
    </>
  );
}
