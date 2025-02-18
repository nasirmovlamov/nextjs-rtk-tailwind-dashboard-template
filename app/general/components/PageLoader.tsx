'use client';

import localFont from 'next/font/local';
// components/PageLoader.js
import radarAnimation from '../../assets/images/radar-animation-bg.gif';

// Font files can be colocated inside of `pages`
const armyFont = localFont({ src: '../../assets/fonts/New Stencil tfb.ttf' });

export default function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000000] rounded-lg w-full">
      <div className="flex flex-col items-center">
        <span className={'text-white text-2xl ' + armyFont.className}>MOD GOV AZ</span>
        <img src={radarAnimation.src} alt="radar animation" width="200px" />
      </div>
    </div>
  );
}
