import { useEffect, useState } from 'react';

import Link from 'next/link';

// import DarkModeButton from "./DarkModeButton"; // Make sure these components are available

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 100); // Delay to ensure smooth transition
  }, []);

  return (
    <div
      className={`absolute mt-3 rounded-lg ml-[300px] w-[calc(100%-320px)] 
      flex justify-between drop-shadow-md p-4 bg-[#131313b2] text-white 
      transition-transform duration-[700ms] ease-out 
      ${!isMounted ? '-translate-y-[20px]' : 'translate-y-0'}`}
    >
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <div className="w-1 h-6 bg-orange-500 mr-2 rounded-sm"> </div>{' '}
          <span className="text-xl font-medium ">Example Software Name</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Right side: User & Logout */}
        {true && ( // Conditionally render if user data is available
          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center  font-medium">
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
