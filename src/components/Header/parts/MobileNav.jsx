import {
  Face3Outlined,
  FaceOutlined,
  GridViewOutlined,
  HomeOutlined,
  Person2Outlined,
} from "@mui/icons-material";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const items = [
  {
    label: "Home",
    icon: <HomeOutlined sx={{ fontSize: 30 }} />,
    url: "/",
  },
  {
    label: "Men",
    icon: <FaceOutlined sx={{ fontSize: 30 }} />,
    url: "/products/1",
  },
  {
    label: "Women",
    icon: <Face3Outlined sx={{ fontSize: 30 }} />,
    url: "/products/2",
  },
  {
    label: "Orders",
    icon: <GridViewOutlined sx={{ fontSize: 30 }} />,
    url: "/orders",
  },
];

export default function MobileNav() {
  const { isLogin } = useAuth();
  return (
    <div className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 h-20 w-[95%] shadow-xl mb-2 bg-white rounded-xl border flex items-center justify-between px-10 text-gray-700 gap-5">
      {items.map((item) => {
        return (
          <NavLink
            key={item.url}
            to={
              item.url === "/account"
                ? !isLogin
                  ? "/signin"
                  : item.url
                : item.url
            }
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center text-xs",
                isActive ? "text-blue-500" : ""
              )
            }
          >
            <>{item.icon}</>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
