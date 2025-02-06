// pages/500.js
import Link from 'next/link';

export default function InternalServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md text-center text-white">
        <h1 className="text-5xl font-bold text-red-600 mb-4">500</h1>
        <p className="text-2xl mb-6 font-bold">Daxili Server Xətası</p> {/* Internal Server Error */}
        <p className="text-lg mb-8 text-gray-300">
          Üzr istəyirik, serverdə bir problem yarandı. Zəhmət olmasa, bir az sonra təkrar cəhd edin.
        </p>
        <Link href="/" className="px-6 py-3 bg-gray-500 hover:bg-gray-400 font-medium rounded-md">
          Əsas səhifə
        </Link>
      </div>
    </div>
  );
}