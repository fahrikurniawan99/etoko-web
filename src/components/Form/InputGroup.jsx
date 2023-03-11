import clsx from "clsx";
import { useField } from "formik";
import React from "react";
import InputText from "./InputText";

export default function InputGroup({ label, optional, className, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={clsx("tracking-tight relative", className && className)}>
      <label
        htmlFor={props.name}
        className="text-gray-600 text-sm font-medium mt-3 inline-block"
      >
        {label}
      </label>
      {optional && (
        <span className="absolute right-0 text-gray-400 text-xs font-medium mt-1">
          optional
        </span>
      )}
      <InputText
        className={clsx("mt-1 w-full")}
        id={props.name}
        {...props}
        {...field}
        meta={meta}
      />
    </div>
  );
}
