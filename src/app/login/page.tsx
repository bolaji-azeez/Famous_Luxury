"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-12 sm:px-4 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/Famous Store logo 2.jpg"
              alt="OMEGA Logo"
              width={300}
              height={60}
              className="h-auto w-[180px] sm:w-[250px] lg:w-[300px] object-contain"
              priority
            />
          </Link>
        </div>
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-12 lg:px-10">
          {/* Toggle Login/Signup */}
          <div className="flex border-b mb-6 text-center text-xs sm:text-sm">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 sm:py-4 font-medium ${
                isLogin ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
            >
              I HAVE AN ACCOUNT
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 sm:py-4 font-medium ${
                !isLogin ? "text-black border-b-2 border-black" : "text-gray-500"
              }`}
            >
              I DON'T HAVE AN ACCOUNT
            </button>
          </div>

          {isLogin ? (
            <form className="space-y-5  rounded-sm" >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-900">
                  Forget Your Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                LOGIN
              </button>
            </form>
          ) : (
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Fullname *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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