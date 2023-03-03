import React, { useState } from "react";
import { ArrowRightAlt, KeyboardBackspace } from "@mui/icons-material";

export default function Slider() {
  const [index, setIndex] = useState(0);

  const image = ["/carousel-1.jpg", "/carousel-2.jpg", "/carousel-3.jpg"];

  const nextSlide = () => {
    setIndex((prev) => prev < 2 && prev + 1);
  };

  const prevSlide = () => {
    setIndex((prev) => prev > 0 && prev - 1);
  };

  return (
    <>
      <div className="mx-auto relative w-screen h-[200px] lg:h-[400px] overflow-hidden">
        <button
          onClick={nextSlide}
          disabled={index === 2}
          className="absolute top-1/2 right-10 -translate-y-1/2 h-12 bg-gray-50 shadow-xl aspect-square rounded-full z-20 disabled:opacity-0 transition-all duration-300 opacity-100"
        >
          <ArrowRightAlt fontSize="medium" />
        </button>
        <button
          onClick={prevSlide}
          disabled={index === 0}
          className="absolute top-1/2 left-10 -translate-y-1/2 h-12 bg-gray-50 shadow-xl aspect-square rounded-full z-20 disabled:opacity-0 transition-all duration-300 opacity-100"
        >
          <KeyboardBackspace fontSize="medium" />
        </button>
        <div
          className={`flex transition-all duration-700`}
          style={{
            width: `${image.length * 100}vw`,
            transform: `translateX(-${index * 100}vw)`,
          }}
        >
          {image.map((value) => (
            <img
              src={value}
              key={value}
              alt={"carousel"}
              className="bg-gray-300 h-[400px] w-screen object-cover object-top"
            />
          ))}
        </div>
      </div>
      <div className="mx-auto flex justify-center mt-3 gap-3">
        <div
          className={[
            "h-3 aspect-square rounded-full transition-all duration-700",
            index === 0 ? "bg-gray-600" : "border border-gray-400",
          ].join(" ")}
        ></div>
        <div
          className={[
            "h-3 aspect-square rounded-full transition-all duration-700",
            index === 1 ? "bg-gray-600" : "border border-gray-400",
          ].join(" ")}
        ></div>
        <div
          className={[
            "h-3 aspect-square rounded-full transition-all duration-700",
            index === 2 ? "bg-gray-600" : "border border-gray-400",
          ].join(" ")}
        ></div>
      </div>
    </>
  );
}
