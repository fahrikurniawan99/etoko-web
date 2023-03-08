import { WarningAmberOutlined } from "@mui/icons-material";
import React from "react";

export default function DialogModal({
  title,
  desc,
  cancelText,
  actionText,
  cancelClick,
  actionClick,
  disabled,
  isLoading,
}) {
  return (
    <div
      className="z-[999] w-full h-screen bg-black/60 absolute top-0 left-0 hidden"
      id="dialog-modal"
    >
      <div className="bg-white max-w-lg m-auto w-full rounded px-2 lg:px-7 py-6 flex  lg:flex-row flex-col shadow-lg">
        <div className="h-12 w-12 rounded-full flex justify-center items-center bg-red-200 mx-auto">
          <WarningAmberOutlined
            className="text-red-600 "
            sx={{ fontWeight: 100 }}
          />
        </div>
        <div className="w-full lg:ml-5 text-center">
          <h1 className="text-gray-800 font-semibold tracking-tight lg:text-xl mt-3 lg:mt-0">
            {title}
          </h1>
          <p className="tracking-tight text-gray-500 leading-relaxed mt-2 text-sm lg:text-sm">
            {desc}
          </p>
          <div className="flex justify-center lg:justify-end gap-2">
            <button
              disabled={disabled || isLoading}
              onClick={cancelClick}
              className="px-5 disabled:opacity-30 min-w-[100px] w-fit py-2 bg-white text-gray-700 font-medium text-sm rounded mt-6 border border-gray-300"
            >
              {cancelText}
            </button>
            <button
              disabled={disabled || isLoading}
              onClick={actionClick}
              className="px-5 disabled:opacity-30 min-w-[130px] w-fit py-2 bg-red-600 text-white font-medium text-sm rounded mt-6"
            >
              {isLoading === false ? actionText : "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
