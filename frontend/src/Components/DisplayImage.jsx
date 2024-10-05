import React from 'react';
import { IoMdClose } from "react-icons/io";
const DisplayImage = ({
    imageUrl, // Corrected prop name
    onClose
}) => {
  return (
    <div className='fixed bottom-0 left-0 top-0 right-0 flex items-center justify-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
        <div
            onClick={onClose}
            className="w-fit ml-auto text-2xl hover:text-orange-600 cursor-pointer"
          >
            <IoMdClose />
          </div>
        <div className='flex justify-center p-4 max-h-[80vh] max-w-[80vh]'>
      <img src={imageUrl} className='w-full h-full' alt='Display' /> {/* Added alt attribute */}
      {/* <button onClick={onClose} className='absolute top-0 right-0 p-2'>Close</button> Added close button */}
    </div>

        </div>
    </div>
  );
}

export default DisplayImage;
