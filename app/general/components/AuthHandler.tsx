'use client';

import { useEffect, useMemo, useState } from 'react';

import Header from './Header';
import MainContent from '../MainContent';
import PageLoader from './PageLoader';
import Sidebar from './Sidebar';
import { authApi } from '@/app/redux/apis/AuthApi';
import catImage from '../../assets/images/image.png';
import { deleteCookie } from '@/app/utils/deleteCookie';
import { getCookie } from '@/app/utils/getCookie';
import { useAppSelector } from '@/app/redux/hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthHandler({ children }: any) {
  const auth = useAppSelector((state) => state.auth);
  const [isAuthActive, setIsAuthActive] = useState(false);
  const [getUser, { isLoading: isLoadingGetUser, isError: isErrorGetUser }] =
    authApi.useLazyGetUserQuery();

  const [awaiter, setAwaiter] = useState(true);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      getUser();
    }

    setTimeout(() => {
      setAwaiter(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (isErrorGetUser) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('user');
    }
  }, [isErrorGetUser]);

  const isAuthenticated = useMemo(() => {
    if (!isAuthActive) {
      return true;
    }else{
      return !isLoadingGetUser && !awaiter && auth?.accessToken
    }
  }, [auth, isLoadingGetUser, awaiter]);

  return (
    <>
      {awaiter && <PageLoader />}
      { isAuthenticated ? (
        <>
          <div
            className="absolute -z-10 left-0 top-0 w-full h-full bg-center bg-cover"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${catImage.src})`,
              // background: "linear-gradient(90deg, rgba(227, 228, 231, 1) 0%, rgba(249, 235, 182, 1) 100%)"
            }}
          ></div>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(3px)',
              position: 'fixed',
              backgroundPosition: 'center',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
            }}
            className="-z-10"
          ></div>
          <Sidebar />
          <Header />
          <MainContent>{children}</MainContent>
        </>
      ) : (
        <>{!awaiter ? <>{children}</> : ''}</>
      )}
    </>
  );
}
