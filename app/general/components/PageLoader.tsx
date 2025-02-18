// components/PageLoader.js
import radarAnimation from '../../assets/images/radar-animation-bg.gif';
export default function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000000] rounded-lg w-full">
      <img src={radarAnimation.src} alt="radar animation" width="100px" />
      {/* <div className="w-16 h-16 border-t-4 border-gray-600 border-solid rounded-full animate-spin"> */}
      {/* </div> */}
    </div>
  );
}
