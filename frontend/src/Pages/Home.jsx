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
        <CategoryList/>
        <BannerProduct/>
        <HorizontalCartProduct category={"alpha"} heading={"Latest Collection"} />
        <HorizontalCartProduct category={"bita"} heading={"Latest Bita Collection"}/>
        {/* <HorizontalCartProduct category={"gama"} heading={"Latest Gama Collection"}/>
        <HorizontalCartProduct category={"iyota"} heading={"Latest Iyota Collection"}/> */}
        {/* Virtical Product */}
        {/* <VirticalCartProduct category={"alpha"} heading={"Latest Collection"} />
        <VirticalCartProduct category={"bita"} heading={"Latest Bita Collection"} /> */}
        <AlphaBanner/>
        <VirticalCartProduct category={"gama"} heading={"Latest Gama Collection"} />
        <VirticalCartProduct category={"iyota"} heading={"Latest Iyota Collection"} />
        {/* <Client/> */}
    </div>
        {/* <div className='banner-wrapper w-full h-[85vh]'>
    <div className='banner-content'>
        <Link to={"/alpha_chair"} className='banners div1'>
            <img src={asset.banner1} alt='banner1' />
            <h>Alpha</h>
        </Link>

        
        <div className='banners div2'>
            <img src={asset.banner2} alt='banner1' />
        </div>
        <div className='banners div3'>
            <img src={asset.banner3} alt='banner1' />
        </div>
        <div className='banners div4'>
            <img src={asset.banner5} alt='banner1' />
        </div>
        
    </div>
      
    </div> */}
    </>
  )
}

export default Home
