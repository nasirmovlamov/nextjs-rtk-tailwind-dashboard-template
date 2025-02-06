"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "../MainContent";
import bgImage from "../../assets/images/bg-space.webp";
import { useAppSelector } from "@/app/redux/hooks";
import { authApi } from "@/app/redux/apis/AuthApi";
import { useEffect, useState } from "react";
import { getCookie } from "@/app/utils/getCookie";
import PageLoader from "./PageLoader";
import { deleteCookie } from "@/app/utils/deleteCookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthHandler({ children }: any) {
  const auth = useAppSelector((state) => state.auth);
  const [getUser, { isLoading: isLoadingGetUser, isError: isErrorGetUser }] =
    authApi.useLazyGetUserQuery();

  const [awaiter, setAwaiter] = useState(true);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      getUser();
    }

    setTimeout(() => {
      setAwaiter(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (isErrorGetUser) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("user");
    }
  }, [isErrorGetUser]);

  return (
    <>
      {awaiter && <PageLoader />}
      {!isLoadingGetUser && !awaiter && auth?.accessToken ? (
        <>
          <div
            className="absolute -z-10 left-0 top-0 w-full h-full bg-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${bgImage.src})`,
            }}
          ></div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
            }}
            className="-z-10"
          ></div>
          <Sidebar />
          <Header />
          <MainContent>{children}</MainContent>
        </>
      ) : (
        <>{!awaiter ? <>{children}</> : ""}</>
      )}
    </>
  );
}
