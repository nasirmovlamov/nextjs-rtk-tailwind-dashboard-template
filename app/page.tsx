"use client";

import { useState } from "react";
import Login from "./login";
import DashboardStatistics from "./dashboard/DashboardStatistics";

export default function Home() {
  const [auth, setAuth] = useState(true);
  return (
    <>
      {auth ? (
        <>
          <DashboardStatistics />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
