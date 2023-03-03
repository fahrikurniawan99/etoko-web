import React from "react";
import { Outlet } from "react-router-dom";
import SVG from "/mobile-application.svg";

export default function AuthLayout() {
  return (
    <div className="mx-auto container flex lg:px-0 px-5">
      <div
        className="hidden lg:flex"
        style={{ height: "calc(100vh - 64px)", flex: 2 }}
      >
        <img alt="pattern" src={SVG} className="w-3/4 m-auto" />
      </div>
      <div
        className="flex justify-center items-center"
        style={{ flex: 3, height: "calc(100vh - 64px)" }}
      >
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
