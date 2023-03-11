import { ArrowRightAlt } from "@mui/icons-material";
import React from "react";

const gridItems = [
  {
    img: "/photo-grid-1.jpg",
    alt: "/photo-grid-1.jpg",
    className: "rounded overflow-hidden col-span-1 row-span-2 col-start-2",
  },
  {
    img: "/photo-grid-2.jpg",
    alt: "/photo-grid-2.jpg",
    className: "rounded overflow-hidden col-span-1 row-span-2 row-start-2",
  },
  {
    img: "/photo-grid-3.jpg",
    alt: "/photo-grid-3.jpg",
    className: "rounded overflow-hidden col-span-1 row-span-2 row-start-3",
  },
  {
    img: "/photo-grid-4.jpg",
    alt: "/photo-grid-4.jpg",
    className: "rounded overflow-hidden col-span-1 row-span-2 row-start-4",
  },
  {
    img: "/photo-grid-1.jpg",
    alt: "/photo-grid-1.jpg",
    className: "rrounded overflow-hidden col-span-1 row-span-2 row-start-5",
  },
];

export default function FinalStock() {
  return (
    <section>
      <div className="container mx-auto mt-56">
        <div className="bg-slate-800 lg:h-[500px] w-full flex flex-col lg:flex-row">
          <div className="pl-10 lg:pt-52 pt-16 lg:pb-0 pb-10 text-white order-2 lg:order-none">
            <h1 className="text-5xl font-bold">
              Final Stock. <br /> Up to 50% off.
            </h1>
            <span className="font-semibold mt-5 flex text-lg items-center gap-2">
              Shop the sale <ArrowRightAlt />
            </span>
          </div>
          <div className="lg:w-[480px]  w-full overflow-x-hidden h-[600px] ml-auto -mt-[100px] overflow-hidden order-1 lg:order-none">
            <div className="grid grid-cols-2 grid-rows-6 gap-5 h-[700px] w-[480px] ">
              {gridItems.map((item, index) => (
                <div className={item.className} key={index}>
                  <img
                    alt={item.alt}
                    src={item.img}
                    className={"w-full h-full object-cover"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
