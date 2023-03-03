import React from "react";

export default function CustomError({ title, description }) {
  return (
    <div
      className="w-full text-center text-gray-500 font-medium flex flex-col justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p>{description}</p>
    </div>
  );
}
