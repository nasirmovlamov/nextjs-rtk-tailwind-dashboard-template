"use client";

import {
  ArrowLeftEndOnRectangleIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  ListBulletIcon,
  PlusCircleIcon,
  RadioIcon,
  RectangleGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid"; // Example using Heroicons
import Image from "next/image";
import Link from "next/link";
import mnLogo from "../../assets/images/mnlogo.png";
import Dropdown from "./Dropdown";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { AuthSlice } from "@/app/redux/slices/AuthSlice";
import { authApi } from "@/app/redux/apis/AuthApi";

export default function Sidebar() {
  const appData = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [logout] = authApi.useLogoutMutation();
  const toggleLogout = async () => {
    await logout();
    dispatch(AuthSlice.actions.setUnAuth());
  };

  return (
    <div
      className={` mt-2 font-medium ml-4 w-[260px] rounded-lg h-[calc(100vh-15px)] border-r border-lightgray p-3 box-border flex flex-col justify-between fixed text-white bg-[#2b353dcd] shadow-lg border-none transition-all duration-500 ${
        appData.sidebar.isVisible ? `-translate-x-[290px]` : "translate-x-0"
      }`}
    >
      <Link href="/">
        <div className="flex justify-between p-5 gap-5 h-24 mb-5">
          <div className="flex gap-5 items-center" id="sidebar-title">
            <Image src={mnLogo.src} alt="Logo" width={`50`} height="4" />
            <span className="text-xs font-bold text-white">
              AZƏRBAYCAN RESPUBLİKASI MÜDAFİƏ NAZİRLİYİ
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col h-[80vh]">
        <div className="box-border pt-10 text-xs">
          <Dropdown
            title="İstifadəçilər"
            icon={<UsersIcon className="h-6 w-6" />}
            items={[
              {
                label: "siyahısı",
                route: "/users",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "əlavə et",
                route: "/users/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />

          <Dropdown
            title="Korpuslar"
            icon={<BuildingLibraryIcon className="h-6 w-6" />}
            items={[
              {
                label: "siyahısı",
                route: "/corps",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "əlavə et",
                route: "/corps/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />

          <Dropdown
            title="Hərbi hissələr"
            icon={<BuildingOffice2Icon className="h-6 w-6" />}
            items={[
              {
                label: "siyahısı",
                route: "/brigades",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "əlavə et",
                route: "/brigades/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />

          <Dropdown
            title="Qruplar"
            icon={<RectangleGroupIcon className="h-6 w-6" />}
            items={[
              {
                label: "siyahısı",
                route: "/groups",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "əlavə et",
                route: "/groups/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />

          <Dropdown
            title="Vəsaitlər"
            icon={<RadioIcon className="h-6 w-6" />}
            items={[
              {
                label: "siyahısı",
                route: "/supplies",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "əlavə et",
                route: "/supplies/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />
        </div>

        <div className="w-full h-[0.5px] bg-[#d3d3d330] mt-auto"></div>

        <div className="flex flex-col mt-2 mb-4">
          <button
            className="text-white w-full text-left flex gap-5 items-center px-2 py-2 rounded-md hover:bg-[#97979720]"
            onClick={toggleLogout}
          >
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
            <span>Tərk et</span>
          </button>
        </div>
      </div>

      <span className="text-[11px] text-center">
        Copyright © Proqram təminatı şöbəsi 2025
      </span>
    </div>
  );
}
