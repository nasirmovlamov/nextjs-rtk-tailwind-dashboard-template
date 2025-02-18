import { ReactNode } from 'react';

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className="pt-24 p-4 ml-[285px] h-[calc(100vh-72px)] w-[calc(100%-290px)]">{children}</div>
  );
}
