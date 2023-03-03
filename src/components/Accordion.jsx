import React, { useEffect, useState } from "react";
import { ExpandMore } from "@mui/icons-material";

export default function Accordion({
  index,
  title,
  children,
  toggleAccordion,
  active,
}) {
  return (
    <div className={["py-4 px-2 lg:px-0", index > 1 ? "border-t" : ""].join(" ")}>
      <h1
        onClick={() => toggleAccordion(index === active ? 0 : index)}
        className="flex justify-between items-center cursor-pointer text-gray-900 font-semibold"
      >
        {title} <ExpandMore className="text-gray-500" />
      </h1>
      <div className={[active === index ? "block" : "hidden"].join(" ")}>
        {children}
      </div>
    </div>
  );
}
