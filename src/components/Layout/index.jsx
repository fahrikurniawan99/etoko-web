import React from "react";
import { Outlet } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import Footer from "../Footer";
import Header from "../Header";

export default function Layout() {
    useScrollTop();
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
