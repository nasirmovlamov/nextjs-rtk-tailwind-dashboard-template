'use client';

import { RequestLogin } from './redux/interfaces/request/auth';
import armyBg from '../public/army-bg.jpg';
import { authApi } from './redux/apis/AuthApi';
import { useForm } from 'react-hook-form';

export default function Login() {
  const [login, { error, isLoading }] = authApi.useLoginMutation();

  // React Hook Form setup
  const { handleSubmit, register } = useForm();

  // Form submission handler
  const onSubmit = async (data: RequestLogin) => {
    await login(data);
  };

  return (
    <>
      <div
        className="absolute -z-10 left-0 top-0 w-full h-full bg-center"
        style={{
          backgroundImage: `url(${armyBg.src})`,
        }}
      ></div>
      <div className="bg-[#00000066] backdrop-blur min-h-screen  z-20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-10 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-gray-800 text-center text-3xl font-extrabold ">Daxil ol</h2>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  İstifadəçi adı
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register('username')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Şifrə
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register('password')}
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error?.data?.message}</div>}

              <div>
                <button
                  type="submit"
                  disabled={isLoading} // Disable button while isLoading
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md font-medium ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed' // Style for isLoading state
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isLoading ? (
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
                    'Davam et'
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
