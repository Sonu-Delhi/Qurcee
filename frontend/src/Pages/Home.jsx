import React from 'react'
import './Home.css'
// import { asset } from '../assets/banners/assets'
// import { Link } from 'react-router-dom'
import CategoryList from '../Components/CategoryList'
import BannerProduct from '../Components/BannerProduct'
// import Client from '../Components/Client'
import HorizontalCartProduct from '../Components/HorizontalCartProduct'
import VirticalCartProduct from '../Components/VirticalCartProduct'
// import { MdOutlineNotes } from "react-icons/md";
import AlphaBanner from '../Components/AlphaBanner'
const Home = () => {
  return (
    <>
    <div className=''>
        {/* <CategoryList/> */}
        <BannerProduct/>
        <HorizontalCartProduct category={"alpha"} heading={"Latest Collection"} />
        <HorizontalCartProduct category={"bita"} heading={"Latest Bita Collection"}/>
        <AlphaBanner/>
        <VirticalCartProduct category={"gama"} heading={"Latest Gama Collection"} />
        <VirticalCartProduct category={"iyota"} heading={"Latest Iyota Collection"} /> 
    </div>
        
    </>
  )
}

export default Home
