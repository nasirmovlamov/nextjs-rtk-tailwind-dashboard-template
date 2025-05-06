import { ReactNode, useEffect, useState } from 'react';

export default function MainContent({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 150); // Slight delay for a natural effect
  }, []);

  return (
    <div
      className={`pt-24 p-4 ml-[285px] h-[calc(100vh-72px)] w-[calc(100%-290px)] 
      transition-all duration-[800ms] ease-out 
      ${!isMounted ? 'opacity-0 translate-y-[10px]' : 'opacity-100 translate-y-0'}`}
    >
      {children}
    </div>
  );
}
