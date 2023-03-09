import clsx from "clsx";
import { useField } from "formik";
import React from "react";

export default function TextInput({ className, label, isTextArea, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={clsx(className && className)}>
      <label htmlFor={props.name} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          className={clsx(
            "bg-white outline-none border px-4 rounded py-2 mt-2 w-full",
            meta.touched && meta.error && "border-red-500"
          )}
          {...field}
          {...props}
        />
      ) : (
        <input
          className={clsx(
            "bg-white outline-none border px-4 rounded py-2 mt-2 w-full",
            meta.touched && meta.error && "border-red-500"
          )}
          {...field}
          {...props}
        />
      )}
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-600 tracking-tight">
          {meta.error}
        </span>
      ) : null}
    </div>
  );
}
