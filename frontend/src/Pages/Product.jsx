import React, { useState,useEffect } from 'react';
import UploadProduct from '../Components/Uploadproduct';
import summryApi from '../common'
import AdminproductCart from '../Components/AdminproductCart';


const Product = () => {
  const [openUploadProduct, setOpenUploadproduct]=useState(false)
    const [allProduct, setAllProduct]=useState([])

    const fetchAllProduct = async()=>{
        const response = await fetch(summryApi.allProducts.url)
        const dataresponse = await response.json()
        setAllProduct(dataresponse?.data || [])
    }
    useEffect(()=>{
        fetchAllProduct()
    },[])
  return (
    <div className=''>
      <div className='bg-slate-200 py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All products</h2>
        <button className='border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>setOpenUploadproduct(true)}>
          Upload Product
        </button>
      </div>

      {/* all Product */}
    <div className='flex items-center flex-wrap gap-5 py-1 h-[calc(100vh-190px)] overflow-scroll'>
        {
            allProduct.map((product,index)=>{
                return(
                  <AdminproductCart data = {product} key={index+"allproduct"} fetchData={fetchAllProduct}/>
                    
                )
            })
        }
    </div>
      {/* Upload product component */}
      {
        openUploadProduct &&(

      <UploadProduct onClose={()=>setOpenUploadproduct(false)} fetchDatas={fetchAllProduct}/>
        )
      }
    </div>
  );
};

export default Product;
