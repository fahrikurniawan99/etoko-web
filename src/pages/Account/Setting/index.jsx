import React, { useState } from "react";
import Address from "./Address";
import Profile from "./Profile";

export default function Setting() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div className="border-b relative">
        <div
          className="h-[3px] w-44 absolute -bottom-[2px] bg-gray-500 transition-all duration-500 rounded-full"
          style={{ transform: `translateX(${176 * tab}px)` }}
        ></div>
        <button
          onClick={() => setTab(0)}
          className={[
            "font-semibold w-44 py-2 text-center border-b-[3px] border-transparent",
            tab === 0 ? "text-gray-800" : "text-gray-500",
          ].join(" ")}
        >
          Biodata Diri
        </button>
        <button
          onClick={() => setTab(1)}
          className={[
            "font-semibold w-44 py-2 text-center border-b-[3px] border-transparent",
            tab === 1 ? "text-gray-800" : "text-gray-500",
          ].join(" ")}
        >
          Daftar Alamat
        </button>
      </div>
      <div className="py-5">{tab === 0 ? <Profile /> : <Address />}</div>
    </div>
  );
}
