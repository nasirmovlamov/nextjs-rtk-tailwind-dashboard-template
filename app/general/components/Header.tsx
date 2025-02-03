import Link from "next/link";
import React from "react";
// import DarkModeButton from "./DarkModeButton"; // Make sure these components are available

const Header = () => {
  //   const { data } = authApi.useGetUserQuery(); // If you still use the API

  //   const handleLogout = () => {
  //     // Handle logout logic here (e.g., API call, cookie deletion)
  //     console.log("Logout clicked"); // Placeholder
  //   };

  return (
    <header className="ml-[280px] w-[calc(100%-280px)]  flex justify-between  bg-white dark:bg-gray-900 p-4 shadow-md">
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <div className="w-1 h-6 bg-orange-500 mr-2 rounded-sm"> </div>{" "}
          <span className="text-xl font-medium text-gray-800 dark:text-white">
            Rabitə Vasitələrinin İdarə Etmə Proqram Təminatı
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Right side: User & Logout */}
        {true && ( // Conditionally render if user data is available
          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="text-gray-800 dark:text-white">Adminov</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
