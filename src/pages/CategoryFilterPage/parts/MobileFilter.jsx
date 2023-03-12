import { CheckCircle, Close, FilterAlt } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

export default function MobileFilter({ setSubcategory, subcategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useFetch("/api/sub-categories");

  function closeModal() {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  }

  function openModal() {
    setIsOpen(true);
    document.body.classList.add("overflow-hidden");
  }

  return (
    <>
      <div className="lg:hidden h-10 text-right">
        <span
          onClick={openModal}
          className="cursor-pointer hover:opacity-50 transition-all duration-300 font-medium text-sm tracking-tight"
        >
          Filter
          <FilterAlt />
        </span>
      </div>
      <div
        onClick={closeModal}
        className={clsx(
          "bg-black/50 h-screen w-full inset-0 fixed z-[998]",
          isOpen ? "" : "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "fixed h-screen overflow-auto bg-white right-0 top-0 z-[999] w-72",
          isOpen ? "" : "hidden"
        )}
      >
        <div className="p-5 flex items-center justify-between border">
          <h1 className="text-xl font-medium tracking-tight">Filter</h1>
          <Close
            className="text-gray-400 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="p-5 space-y-3">
          <ul>
            {data?.data?.map(({ attributes: item, id }, index) => (
              <li>
                <button
                  className={clsx(
                    index !== 0 && "mt-3",
                    item.title === subcategory
                      ? "text-gray-800"
                      : "text-gray-500"
                  )}
                  onClick={() => {
                    setSubcategory(item.title);
                    closeModal();
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
