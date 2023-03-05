import {
  Close,
  GridViewOutlined,
  HomeOutlined,
  LogoutOutlined,
  Menu,
  SettingsOutlined,
  UpdateOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto container dashboard-container overflow-hidden lg:flex py-3">
      <div
        className={[
          "left h-full flex-col bg-gray-200 justify-between relative rounded-xl",
          isOpen ? "flex" : "hidden lg:flex",
        ].join(" ")}
      >
        <div className="absolute right-2 top-2 lg:hidden">
          <Close fontSize="large" onClick={() => setIsOpen(false)} />
        </div>
        <div className="flex p-5 items-center gap-3">
          <img
            src="/dummy-avatar.jpg"
            alt="dummy-avatar"
            className="w-3/12 object-cover aspect-square rounded-full"
          />
          <div className="w-9/12 tracking-tight text-gray-900">
            <h1 className="font-semibold text-lg">Fahri kurniawan</h1>
            <p className="truncate w-full text-gray-500">
              fahrikurniawan@gmail.com
            </p>
          </div>
        </div>
        <div className="my-auto px-5">
          <Link
            to={"/"}
            className="text-gray-900 font-medium gap-3 flex w-full py-5 text-left px-3 rounded-md transition-all duration-300"
          >
            <HomeOutlined /> Beranda
          </Link>
          <NavLink
            to={"/account/overview"}
            className={({ isActive }) =>
              [
                "text-gray-900 font-medium gap-3 flex w-full py-5 text-left px-3 rounded-md transition-all duration-300",
                isActive ? "bg-white" : "",
              ].join(" ")
            }
          >
            <GridViewOutlined /> Ringkasan
          </NavLink>
          <NavLink
            to={"/account/order"}
            className={({ isActive }) =>
              [
                "text-gray-900 font-medium gap-3 flex w-full py-5 text-left px-3 rounded-md transition-all duration-300",
                isActive ? "bg-white" : "",
              ].join(" ")
            }
          >
            <UpdateOutlined /> Pesanan saya
          </NavLink>
          <NavLink
            to={"/account/setting"}
            className={({ isActive }) =>
              [
                "text-gray-900 font-medium gap-3 flex w-full py-5 text-left px-3 rounded-md transition-all duration-300",
                isActive ? "bg-white" : "",
              ].join(" ")
            }
          >
            <SettingsOutlined /> Pengaturan
          </NavLink>
        </div>
        <button className="mt-auto py-2 m-5 text-center bg-red-600 w-32 rounded-lg text-white text-sm ">
          <LogoutOutlined /> Logout
        </button>
      </div>
      <div className="right h-full overflow-y-scroll lg:pl-10 px-0">
        <div className="flex items-center justify-between h-12 lg:hidden px-2 lg:px-0 ">
          <Link
            to={"/"}
            className="italic font-bold text-gray-800 text-2xl"
            style={{ letterSpacing: -1.4 }}
          >
            E-Toko
          </Link>
          <Menu fontSize="large" onClick={() => setIsOpen(true)} />
        </div>
        <div className="px-2 lg:px-0">
          <div className="h-14 border-y gap-1 items-center hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-900 font-medium"
            >
              Menu
            </button>
            <span className="text-gray-500">&gt;</span>
            <p className="text-gray-500">Dashboard</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
