"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store/store";
import {
  clearSignupError,
  clearLoginError,
  selectSignupError,
  selectLoginError,
  selectSignupStatus,
  selectLoginStatus,
} from "@/features/userAuth/userAuthSlice";

import {
  useSignupUserMutation,
  useLoginUserMutation,
} from "@/features/userAuth/userApi";

// Define a type for API errors to avoid using 'any'
type ApiError = {
  data?: {
    message?: string;
  };
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const loginError = useSelector(selectLoginError);
  const signupError = useSelector(selectSignupError);
  const loginStatus = useSelector(selectLoginStatus);
  const signupStatus = useSelector(selectSignupStatus);

  const [signupUserMutation, { isLoading: isSigningUp, data: signupData }] =
    useSignupUserMutation();

  const [loginUserMutation, { isLoading: isLoggingIn, data: loginData }] =
    useLoginUserMutation();

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearSignupError());

    const phone = phoneNumber.trim();
    if (!phone) {
      toast.error("Phone number is required.");
      return;
    }

    try {
      await signupUserMutation({
        fullName: name,
        email,
        password,
        phoneNumber: parseInt(phone, 10), // Convert string to number
      }).unwrap(); // Use unwrap to handle errors in the catch block
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(apiError.data?.message || "Error registering user");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearLoginError());

    try {
      await loginUserMutation({ email, password }).unwrap(); // Use unwrap
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(apiError.data?.message || "Error logging in");
    }
  };

  useEffect(() => {
    if (signupStatus === "succeeded" && signupData) {
      toast.success("Signup successful!");
      setIsLogin(true);
    }
    if (signupError) {
      toast.error(signupError);
    }
  }, [signupStatus, signupData, signupError]);

  useEffect(() => {
    if (loginStatus === "succeeded" && loginData) {
      toast.success("Login successful!");
      // Consider redirecting the user after successful login
      // e.g., window.location.href = "/dashboard";
    }
    if (loginError) {
      toast.error(loginError);
    }
  }, [loginStatus, loginData, loginError]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center px-6 sm:px-4 lg:px-8 relative"
      style={{ backgroundImage: "url('/logo.jpg')" }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <div className="bg-white/30 backdrop-blur-md shadow-md rounded-full cursor-pointer hover:bg-white/50 transition-all duration-300">
            <Image
              src="/Famous Store logo 2.jpg"
              alt="Logo"
              width={100}
              height={10}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg py-6 px-4 rounded-lg sm:px-12 lg:px-10">
          <div className="flex border-b border-white/50 mb-6 text-center text-xs sm:text-sm text-white">
            <button
              onClick={() => {
                setIsLogin(true);
                dispatch(clearLoginError());
              }}
              className={`flex-1 py-3 sm:py-4 font-medium ${
                isLogin ? "text-white border-b-2 border-white" : "text-gray-300"
              }`}>
              I HAVE AN ACCOUNT
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                dispatch(clearSignupError());
              }}
              className={`flex-1 py-3 sm:py-4 font-medium ${
                !isLogin
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}>
              I DO NOT HAVE AN ACCOUNT
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5 rounded-sm">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                    aria-label="Toggle password visibility">
                    {showPassword ? (
                      <IoEyeOff size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-200 hover:text-white">
                  Forget Your Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
                  isLoggingIn
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black/70 hover:bg-black"
                }`}>
                {isLoggingIn ? "LOGGING IN..." : "LOGIN"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-white">
                  Fullname *
                </label>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                    aria-label="Toggle password visibility">
                    {showPassword ? (
                      <IoEyeOff size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="signup-phoneNumber"
                  className="block text-sm font-medium text-white">
                  Phone Number *
                </label>
                <input
                  id="signup-phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
                  isSigningUp
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black/70 hover:bg-black"
                }`}>
                {isSigningUp ? "SIGNING UP..." : "SIGN UP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
