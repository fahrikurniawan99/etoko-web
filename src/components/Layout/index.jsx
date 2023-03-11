import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="mb-28 lg:mb-0">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
