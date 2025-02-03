import Link from "next/link";
import React from "react";
import DarkModeButton from "./DarkModeButton";
// import DarkModeButton from "./DarkModeButton"; // Make sure these components are available

const Header = () => {
  //   const { data } = authApi.useGetUserQuery(); // If you still use the API

  //   const handleLogout = () => {
  //     // Handle logout logic here (e.g., API call, cookie deletion)
  //     console.log("Logout clicked"); // Placeholder
  //   };

  return (
    <div className=" absolute mt-3 rounded-lg text-white ml-[300px] w-[calc(100%-320px)] flex justify-between drop-shadow-md p-4 bg-[#2b353db9]">
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <div className="w-1 h-6 bg-orange-500 mr-2 rounded-sm"> </div>{" "}
          <span className="text-xl font-medium ">
            Rabitə Vasitələrinin Uçotu Proqram Təminatı
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
            <span className="">Admin</span>
          </Link>
        )}
        {/* <DarkModeButton /> */}
      </div>
    </div>
  );
};

export default Header;
