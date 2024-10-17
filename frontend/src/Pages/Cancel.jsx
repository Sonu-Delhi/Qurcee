import React from 'react'
import CancelImage from '../assets/cancel.png'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='container bg-white mx-auto mt-10 rounded w-full max-w-md p-4 flex items-center flex-col justify-center'>
    <img src={CancelImage}  width={170} height={170}/>
    <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
    <Link to={"/cart"} className='p-2 mt-5 px-3 rounded font-semibold text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white '>Go to Cart</Link>
  </div>
  )
}

export default Cancel
