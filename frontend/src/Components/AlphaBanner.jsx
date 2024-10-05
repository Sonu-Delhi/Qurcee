import React from "react";
// import ban1 from '../assets/banners/ban1.jpg'
import ban2 from '../assets/banners/ban2.jpg'
const AlphaBanner = () => {
  return (
    <div className="container mx-auto px-4 mt-7 w-full h-[60vh] flex">
    {/* <h1>Latest Shop</h1> */}
      {/* First div with image */}
      <div className=" w-full h-full cursor-pointer">
        <img
          src={ban2} // Replace with your image URL
          alt="First Banner"
          className="object-sacle-down w-full h-full"
        />
      </div>
      {/* Second div with image */}
      {/* <div className="w-1/2 h-full bg-slate-200 p-4 cursor-pointer">
        <img
          src={ban1} // Replace with your image URL
          alt="First Banner"
          className="object-sacle-down w-full rounded h-full hover:scale-105 transition-all"
        />
      </div> */}
    </div>
  );
};

export default AlphaBanner;
