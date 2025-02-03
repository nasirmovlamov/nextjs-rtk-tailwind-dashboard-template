"use client";
import { useState } from "react";
import armyBg from "../public/army-bg.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Simulate API call (replace with your actual login logic)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await new Promise((resolve) => {
        setTimeout(() => {
          if (email === "test@example.com" && password === "password") {
            resolve({ success: true }); // Successful login
          } else {
            resolve({ success: false, message: "Invalid credentials" });
          }
        }, 1500); // Simulate 1.5-second delay
      });

      if (response.success) {
        // Store authentication token or user info (e.g., using cookies or localStorage)
        localStorage.setItem("isAuthenticated", "true"); // Example
        // router.push("/dashboard"); // Redirect to dashboard or protected page
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError("An error occurred during login.");
      console.error("Login Error:", err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="absolute -z-10 left-0 top-0 w-full h-full bg-center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${armyBg.src})`,
          backdropFilter: 'blur(10px)'
        }}
      ></div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(5px)",
        }}
        className="min-h-screen  z-20 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-10 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-gray-800 text-center text-3xl font-extrabold ">
                Daxil ol
              </h2>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Elektron poçt
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Şifrə
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <button
                  type="submit"
                  disabled={loading} // Disable button while loading
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md font-medium ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed" // Style for loading state
                      : "bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }`}
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  ) : (
                    "Davam et"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
