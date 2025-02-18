'use client';

export default function StyledContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-[#131313b2] w-full rounded-lg p-4 text-white">{children}</div>
  );
}
