"use client";

// pages/401.js
import Link from "next/link";
import { authApi } from "../redux/apis/AuthApi";
import { useEffect } from "react";
import { getCookie } from "../utils/getCookie";
import { deleteCookie } from "../utils/deleteCookie";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const [getRefresh] = authApi.useRefreshTokenMutation();
  const router = useRouter();
  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      getRefresh(refreshToken);
    } else {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("user");
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md text-center text-white">
        <h1 className="text-4xl font-bold text-red-500 mb-4">401</h1>
        <p className="text-lg mb-6 font-bold">
          Bu səhifəyə daxil olmaq üçün icazəniz yoxdur.
        </p>
        <p className=" mb-8 text-gray-300">
          Zəhmət olmasa, daxil olun və ya giriş üçün inzibatçı ilə əlaqə
          saxlayın.
        </p>
        <div className="flex justify-center gap-x-5">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-500 hover:bg-gray-400 font-medium rounded-md"
          >
            Əsas səhifə
          </Link>
          {/* Conditionally render the login link if a login page exists */}
          {/*  Check if a /login page exists or if you have a custom login route */}
          {/*  You might want to use next/router and check for a specific route */}
          {/*  For simplicity, I'm assuming you have a /login page */}
          <Link
            href="/login"
            className="px-6 py-3 bg-gray-500 hover:bg-gray-400 font-medium rounded-md"
          >
            Daxil ol
          </Link>
        </div>
      </div>
    </div>
  );
}
