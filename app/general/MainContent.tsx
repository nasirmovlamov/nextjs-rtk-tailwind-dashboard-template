import { ReactNode } from "react";

export default function MainContent({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="pt-20 p-4 ml-[280px] h-[calc(100vh-72px)] w-[calc(100%-280px)] ">{children}</div>;
}
