'use client';

import {
  ArrowLeftEndOnRectangleIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  DocumentIcon,
  DocumentMinusIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  ListBulletIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  RadioIcon,
  ReceiptPercentIcon,
  RectangleGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useState } from 'react';

import { AuthSlice } from '@/app/redux/slices/AuthSlice';
import Dropdown from './Dropdown';
import Image from 'next/image';
import Link from 'next/link';
import { authApi } from '@/app/redux/apis/AuthApi';
import exampleLogo from '../../assets/images/logo.png';

// Example using Heroicons

export default function Sidebar() {
  const [isMounted, setIsMounted] = useState(false);

  const appData = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [logout] = authApi.useLogoutMutation();
  const toggleLogout = async () => {
    await logout();
    dispatch(AuthSlice.actions.setUnAuth());
  };

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 200); // Delay to ensure smooth transition
  }, []);

  return (
    <div
      className={`text-white mt-2 font-medium ml-4 w-[260px] rounded-lg h-[calc(100vh-15px)] pb-5
      border-r border-lightgray p-3 box-border flex flex-col justify-between fixed 
      bg-[#131313b2] shadow-lg border-none transition-transform duration-[700ms] ease-out 
      ${!isMounted ? '-translate-x-[20px]' : 'translate-x-[0px]'}
      ${appData.sidebar.isVisible ? '-translate-x-[290px]' : 'translate-x-0'}`}
    >
      <Link href="/">
        <div className="flex justify-between p-5 gap-5 h-24 mb-5">
          <div className="flex gap-5 items-center" id="sidebar-title">
            <Image src={exampleLogo.src} alt="Logo" width={`50`} height="4" />
            <span className="text-xs font-bold ">Example</span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col h-[80vh]">
        <div className="box-border pt-10 text-xs  overflow-y-auto">
          <Dropdown
            title="İstifadəçilər"
            icon={<UsersIcon className="h-6 w-6" />}
            items={[
              {
                label: 'siyahısı',
                route: '/users',
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: 'əlavə et',
                route: '/users/create',
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />


        </div>

        <div className="w-full h-[0.5px] bg-[#d3d3d330] mt-auto"></div>

        <div className="flex flex-col mt-2 mb-4">
          <button
            className="w-full text-left flex gap-5 items-center px-2 py-2 rounded-md hover:bg-[#97979720]"
            onClick={toggleLogout}
          >
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
            <span>Tərk et</span>
          </button>
        </div>
      </div>

      <span className="text-[11px] text-center">Copyright © Example 2025</span>
    </div>
  );
}
