import clsx from "clsx";
import React from "react";

export default function Button({ children, text, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        "min-w-[100px] w-fit bg-indigo-600 py-2 rounded text-white font-medium px-4",
        className && className
      )}
    >
      {text || children}
    </button>
  );
}
