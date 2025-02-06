"use client";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Toaster } from "react-hot-toast";
export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Provider store={store}>
        <Toaster />
        {children}
      </Provider>
    </div>
  );
}
