import clsx from "clsx";
import { useField } from "formik";
import React from "react";

export default function TextInput({
  className,
  label,
  isTextArea,
  icon,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div className={clsx(className && className)}>
      {label && (
        <label
          htmlFor={props.name}
          className="text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2">
        {isTextArea ? (
          <textarea
            className={clsx(
              "bg-white outline-none border px-4 rounded py-2 w-full",
              meta.touched && meta.error && "border-red-500"
            )}
            {...field}
            {...props}
          />
        ) : (
          <input
            className={clsx(
              "bg-white outline-none border px-4 rounded py-2 w-full disabled:text-gray-700 disabled:cursor-not-allowed",
              meta.touched && meta.error && "border-red-500"
            )}
            {...field}
            {...props}
          />
        )}
        {icon && icon}
      </div>
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-600 tracking-tight">
          {meta.error}
        </span>
      ) : null}
    </div>
  );
}
