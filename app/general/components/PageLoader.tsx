'use client';

import localFont from 'next/font/local';
// components/PageLoader.js

// Font files can be colocated inside of `pages`
const armyFont = localFont({ src: '../../assets/fonts/New Stencil tfb.ttf' });

export default function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000000] rounded-lg w-full">
      <div className="flex flex-col items-center">
        <span className={'text-white text-2xl ' + armyFont.className}>Example</span>
      </div>
    </div>
  );
}
