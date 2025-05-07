'use client';

import localFont from 'next/font/local';
// Font files can be colocated inside of `pages`
const armyFont = localFont({ src: '../../assets/fonts/New Stencil tfb.ttf' });

export default function PageLoader() {
  return (
    <div
      className={'flex justify-center items-center min-h-screen bg-[#000000] rounded-lg w-full '}
    >
      <div className="flex flex-col items-center">
        <span className={'text-2xl text-white animate-colorChange'}>
          <span className="text-white text-2xl animate-pulse">Loading...</span>
        </span>
      </div>
    </div>
  );
}
