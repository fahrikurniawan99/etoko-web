import React from "react";
import Button from "../../../components/Button";

export default function Story() {
  return (
    <section>
      <div className="h-[300px] lg:h-[500px] overflow-hidden relative mt-10 lg:mt-32">
        <div className="absolute w-full h-full bg-black/60 flex flex-col justify-center items-center text-white">
          <h2 className="text-2xl font-bold">Long-term thinking</h2>
          <p className="lg:w-[550px] text-center leading-relaxed mt-3 text-sm lg:text-lg">
            We're commited to responsible, sustainable, and etical
            manufacturing. Out small-scale approach allows us to focus on
            quality and reduceour impact We're doing our best to delay the
            inevitable heat-death of the universe.
          </p>
          <Button
            className={"bg-indigo-50 text-black mt-5"}
            text={"Read out story"}
          />
        </div>
        <img
          src="/background-story.jpg"
          alt="story"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
