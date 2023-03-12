import React from "react";
import Button from "../../../components/Button";

const gridItems = [
  {
    img: "/photo-grid-1.jpg",
    alt: "/photo-grid-1.jpg",
    className: "row-span-2 col-start-2",
  },
  {
    img: "/photo-grid-2.jpg",
    alt: "/photo-grid-2.jpg",
    className: "row-span-2 row-start-2",
  },
  {
    img: "/photo-grid-3.jpg",
    alt: "/photo-grid-3.jpg",
    className: "row-start-3 row-span-2",
  },
  {
    img: "/photo-grid-4.jpg",
    alt: "/photo-grid-4.jpg",
    className: "row-start-2 row-span-2",
  },
  {
    img: "/photo-grid-1.jpg",
    alt: "/photo-grid-1.jpg",
    className: "row-start-4 row-span-2",
  },
  {
    img: "/photo-grid-4.jpg",
    alt: "/photo-grid-4.jpg",
    className: "row-start-5 row-span-2",
  },
  {
    img: "/photo-grid-2.jpg",
    alt: "/photo-grid-2.jpg",
    className: "row-start-4 row-span-2",
  },
];

const imgClassName = "w-full h-full object-cover rounded shadow";

export default function HeroSection() {
  return (
    <section>
      <div className="lg:flex container mx-auto lg:h-[700px] px-2 lg:px-0 mt-8 lg:mt-0">
        <div className="lg:w-[450px] flex flex-col justify-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold ">
            Get Ready to be Spoiled for Choice
          </h1>
          <p className="text-gray-500 leading-relaxed tracking-tight lg:text-lg mt-3">
            Browse Our Extensive Collection of Products and Enjoy Unbeatable
            Prices!
          </p>
          <Button text={"Shop"} className={"mt-5"} />
        </div>
        <div className="overflow-hidden h-[800px] lg:w-[500px] w-full lg:-mt-[120px] mt-10  lg:ml-auto">
          <div className="grid grid-cols-3 grid-rows-6 gap-10 lg:w-full w-[500px] h-full">
            {gridItems.map((item, index) => (
              <div className={item.className} key={index}>
                <img src={item.img} alt={item.alt} className={imgClassName} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
