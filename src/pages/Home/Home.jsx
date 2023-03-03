import React from "react";
import Categories from "./Categories";
import Featured from "./Featured";
import Slider from "./Slider";

export default function Home() {


  return (
    <div className="w-full overflow-hidden">
      <Slider />
      <div className="container mx-auto mt-16 px-2 lg:0" id="categories">
        <h2
          className="text-3xl text-gray-800 font-bold"
          style={{ letterSpacing: -1.4 }}
        >
          Categories
        </h2>
        <Categories />
      </div>
      <div className="container mx-auto mt-16 px-2 lg:px-0">
        <h2
          className="text-3xl text-gray-800 font-bold"
          style={{ letterSpacing: -1.4 }}
        >
          Featured Products
        </h2>
        <Featured />
      </div>
    </div>
  );
}
