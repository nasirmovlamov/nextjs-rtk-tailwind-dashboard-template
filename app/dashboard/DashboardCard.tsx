import React, { ReactNode } from 'react';

interface DashboardCardProps {
  id?: number;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function DashboardCard({ id, title, subtitle, icon }: DashboardCardProps) {
  return (
    <div className="flex p-4 box-content w-[195px] h-[68px] bg-[#131313b2] text-white shadow-xl rounded-xl  gap-5 items-center justify-between">
      <div key={id} className="flex flex-col">
        <p className=" text-sm ">{title} </p>
        <h3 className="text-lg font-semibold ">{subtitle}</h3>
      </div>
      <div className="text-white flex w-14 h-14 rounded-full bg-[#1f294f] items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
