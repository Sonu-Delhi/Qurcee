import React, { useEffect, useState } from 'react'
import summryApi from '../common'
const Alpha = () => {
  const [categoryProduct, setCategoryProduct]=useState([])
  const [loading, setLoading]=useState(false)
  const fetchCategoryProduct = async()=>{
    setLoading(true)
    const response = await fetch(summryApi.getProducts.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
  }
  useEffect(()=>{
    fetchCategoryProduct()
  },[])
  return (
    <div className="flex w-full items-center justify-center gap-3 flex-wrap p-4">
    {
      categoryProduct.map((product,index)=>{
        return(
          <div className="bg-white  mb-6 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300" style={{width:"23%", height:"70vh"}}>
        <img
          className="w-full h-68 object-cover imageHover transition-all"
          src={product?.productImage[0]}
          alt={product?.productName}
          
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{product?.productName}</h2>
          <p className="text-gray-600 text-sm">{product?.brandName}</p>
          <div className="mt-2">
            <span className="text-gray-500 line-through mr-2">Rs{product?.price}</span>
            <span className="text-green-600 font-bold">Rs{product?.sellingPrice}</span>
          </div>
        </div>
      </div>
        )
      })
    }
      
    </div>
  )
}

export default Alpha
