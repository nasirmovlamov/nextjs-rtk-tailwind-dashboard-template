'use client';

import { useMemo, useState } from 'react';

import DashboardStatistics from './dashboard/DashboardStatistics';
import Login from './login';
import { useAppSelector } from './redux/hooks';

export default function Home() {
  const auth = useAppSelector((state) => state.auth);
  const [isAuthActive, setIsAuthActive] = useState(false);

  const isAuthenticated = useMemo(() => {
    if (!isAuthActive) {
      return true;
    }
    if (auth?.accessToken) {
      return true;
    } else {
      return false;
    }
  }, [auth]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <DashboardStatistics />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
