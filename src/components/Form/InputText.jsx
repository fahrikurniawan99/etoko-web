import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import clsx from "clsx";
import React, { useState } from "react";

export default function InputText({ className, meta, ...props }) {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="relative">
        <input
          {...props}
          className={clsx(
            "outline-none border rounded px-2 py-2 text-sm text-gray-700",
            className && className,
            meta.touched && meta.error ? "border-red-600" : ""
          )}
          type={
            props.type === "password"
              ? isShow
                ? "text"
                : "password"
              : props.type
          }
        />
        {props.type === "password" ? (
          <div
            onClick={() => setIsShow(!isShow)}
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-gray-500 bg-white"
          >
            {isShow ? (
              <VisibilityOutlined sx={{ fontSize: 20 }} />
            ) : (
              <VisibilityOffOutlined sx={{ fontSize: 20 }} />
            )}
          </div>
        ) : null}
      </div>
      {meta.touched && meta.error ? (
        <span className="text-red-600 text-xs ">{meta.error}</span>
      ) : null}
    </>
  );
}
