import React from "react";
import Button from "../../../components/Button";

export default function Story() {
  return (
    <section>
      <div className="h-[300px] lg:h-[500px] overflow-hidden relative mt-10 lg:mt-32">
        <div className="absolute w-full h-full bg-black/60 flex flex-col justify-center items-center text-white">
          <h2 className="text-2xl font-bold">Ethical manufacturing</h2>
          <p className="lg:w-[550px] text-center leading-relaxed mt-3 text-sm lg:text-lg">
            Choose responsible shopping - we prioritize sustainability and
            ethical manufacturing to help preserve the planet. Our long-term
            thinking means that our products are not only good for you but for
            future generations too.
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
