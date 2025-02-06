"use client";

import Login from "./login";
import DashboardStatistics from "./dashboard/DashboardStatistics";
import { useAppSelector } from "./redux/hooks";

export default function Home() {
  const auth = useAppSelector((state) => state.auth);
  return (
    <>
      {auth.accessToken ? (
        <>
          <DashboardStatistics />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
