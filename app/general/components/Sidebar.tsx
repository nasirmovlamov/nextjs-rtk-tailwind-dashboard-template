"use client";

import mnLogo from "../../assets/images/mnlogo.png";
import {
  ArrowLeftEndOnRectangleIcon,
  ListBulletIcon,
  PlusCircleIcon,
  UsersIcon, // Replace GroupIcon
} from "@heroicons/react/24/solid"; // Example using Heroicons
import Image from "next/image";
import Dropdown from "./Dropdown";
import Link from "next/link";

export default function Sidebar() {
  const logout = async () => {
    window.location.href = "/";
  };

  return (
    <div
      className={`w-[280px] h-screen border-r border-lightgray p-5 box-border flex flex-col justify-between fixed text-white bg-[#2b353d] border-none transition-all duration-500 ${
        false ? "-translate-x-[390px]" : "translate-x-0"
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
        <div className="box-border pt-10 text-lg">
          <Dropdown
            title="İstifadəçilər"
            icon={<UsersIcon className="h-6 w-6" />}
            items={[
              {
                label: "Siyahısı",
                route: "/users",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "Yarat",
                route: "/users/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />
          <Dropdown
            title="İstifadəçilər2"
            icon={<UsersIcon className="h-6 w-6" />}
            items={[
              {
                label: "Siyahısı2",
                route: "/users2",
                icon: <ListBulletIcon className="h-5 w-5" />, // If you have an icon
              },
              {
                label: "Yarat2",
                route: "/users2/create",
                icon: <PlusCircleIcon className="h-5 w-5" />, // If you have an icon
              },
            ]}
          />
        </div>

        <div className="w-full h-[0.5px] bg-[#d3d3d330] mt-auto"></div>

        <div className="flex flex-col mt-5">
          <button
            className="text-white w-full text-left flex gap-5 items-center px-4 py-2 rounded-md hover:bg-[#97979720]"
            onClick={logout}
          >
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
            <span>Tərk et</span>
          </button>
        </div>
      </div>

      <span className="text-xs text-center">
        Copyright © Proqram təminatı şöbəsi 2025
      </span>
    </div>
  );
}
