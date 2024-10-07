import React, { useState, useEffect, useCallback } from "react";
import banner1 from '../assets/banners/banner1.jpg';
import banner2 from '../assets/banners/banner2.jpg';
import banner3 from '../assets/banners/banner3.jpg';
import banner4 from '../assets/banners/banner4.jpg';
import banner5 from '../assets/banners/ban2.jpg'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [banner1, banner2, banner3, banner4, banner5];

  // Function to go to the next image with desktopImages.length in the dependency array
  const nextImage = useCallback(() => {
    setCurrentImage((prevImage) =>
      prevImage < desktopImages.length - 1 ? prevImage + 1 : 0
    );
  }, [desktopImages.length]);

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage > 0 ? prevImage - 1 : desktopImages.length - 1
    );
  };

  // Auto-play functionality with useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="mt-1 mx-auto rounded">
      <div className="h-86 w-full relative overflow-hidden">
        {/* Navigation buttons */}
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button onClick={prevImage} className="bg-white p-1 shadow-md rounded-full">
              <FaAngleLeft />
            </button>
            <button onClick={nextImage} className="bg-white p-1 shadow-md rounded-full">
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Image slider */}
        <div className="flex w-full rounded h-full  transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {desktopImages.map((imageURL, index) => (
            <div className="w-full h-full flex-shrink-0 smheight" key={index}>
              <img src={imageURL} alt={`banner-${index}`} className="smimage h-full w-full object-scale-down" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
