import clsx from "clsx";
import React from "react";

export default function Skeleton() {
  return (
    <div>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
        key={index}
          className={clsx(
            "flex py-4 items-center animate-pulse",
            index !== 0 && "border-t"
          )}
        >
          <p className="bg-gray-300 w-[100px] h-8 rounded mx-3"></p>
          <span className="w-[100px] h-8 rounded bg-gray-300 ml-3"></span>
          <p className="bg-gray-300 w-[100px] h-8 rounded ml-auto mr-3"></p>
          <div className="bg-gray-300 w-[100px] h-8 rounded"></div>
        </div>
      ))}
    </div>
  );
}
