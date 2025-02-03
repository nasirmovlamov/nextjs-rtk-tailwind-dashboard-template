"use client";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import bgImage from "../../assets/images/bg-space.webp";
export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div
        className="absolute -z-10 left-0 top-0 w-full h-full bg-center"
        style={{
          position: "absolute",
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
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width:'100vw',
          height:'100vh',
        }}
        className="-z-10"
      ></div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
