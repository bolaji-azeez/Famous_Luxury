"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center px-6 sm:px-4 lg:px-8 relative"
      style={{ backgroundImage: "url('/logo.jpg')" }} // Replace with your background image
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logo Link to Home */}
      <div className="absolute top-6 left-6 z-20w-[100px] h-[20px]  rounded-full">
        <Link href="/">
          <div className="bg-white/30 backdrop-blur-md shadow-md rounded-full cursor-pointer hover:bg-white/50 transition-all duration-300">
            <Image
              src="/Famous Store logo 2.jpg" // Replace with your logo path
              alt="Logo"
              width={100}
              height={10}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        {/* Glassmorphic Card */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg py-6 px-4 rounded-lg sm:px-12 lg:px-10">
          {/* Toggle Login/Signup */}
          <div className="flex border-b border-white/50 mb-6 text-center text-xs sm:text-sm text-white">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 sm:py-4 font-medium ${
                isLogin ? "text-white border-b-2 border-white" : "text-gray-300"
              }`}
            >
              I HAVE AN ACCOUNT
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 sm:py-4 font-medium ${
                !isLogin
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}
            >
              I DON'T HAVE AN ACCOUNT
            </button>
          </div>

          {/* Forms */}
          {isLogin ? (
            <form className="space-y-5 rounded-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-gray-200 hover:text-white">
                  Forget Your Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black/70 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                LOGIN
              </button>
            </form>
          ) : (
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Fullname *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 bg-white/10 text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black/70 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                SIGN UP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
