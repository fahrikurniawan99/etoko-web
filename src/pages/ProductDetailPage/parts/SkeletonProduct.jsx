import React from 'react'

export default function SkeletonProduct() {
  return (
    <div className="lg:flex gap-5 animate-pulse">
      <div className="bg-gray-300 w-full lg:w-6/12 aspect-square rounded"></div>
      <div className="w-full lg:w-[46%] ml-auto mt-5">
        <h1 className="bg-gray-300 w-[200px] h-11 rounded"></h1>
        <div className="mt-2 bg-gray-300 h-10 w-[150px]"></div>
        <p className="bg-gray-300 h-20 w-full rounded mt-5"></p>
        <div className="mt-5 space-y-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-9 w-full bg-gray-300 rounded"></div>
          ))}
        </div>
        <div className="h-14 bg-gray-300 w-full rounded mt-5"></div>
      </div>
    </div>
  );
}
