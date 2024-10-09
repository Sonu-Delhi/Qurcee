import React, { useEffect, useState } from 'react'
import summryApi from '../common'
import { Link } from 'react-router-dom'
import { MdOutlineNotes } from "react-icons/md";
const CategoryList = () => {
  const [categoryProduct, setCategoryProduct]=useState([])
  const [loading, setLoading]=useState(false)
  const categoryLoading = new Array(4).fill(null)
  const fetchCategoryProduct = async()=>{
    setLoading(true)
    const response = await fetch(summryApi.productCategory.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
  }
  useEffect(()=>{
    fetchCategoryProduct()
  },[])
  return (
    <div className='container-fluid px-12 py-3 mt-3 bg-slate-300 text-black'>
      <div className='flex items-center gap-4 overflow-scroll scrollbar-none '>
      <div className='flex items-center cursor-pointer gap-1 border-b border-transparent hover:border-white transition duration-300'>
      <MdOutlineNotes className='font-bold text-lg' />
      <h3 className='font-bold'>All</h3>
      </div>
      {
        loading?(
          
            categoryLoading.map((el, index)=>{
              return(
                <div className='animate-pulse overflow-hidden' key={"categoryLoadind"+index}>
                </div>
              )
            })
        ):
        (
          categoryProduct.map((product,index)=>{
          return(
            <Link to={"/product-category?category="+product?.category} className='cursor-pointer border-b border-transparent hover:border-white transition duration-300 font-medium' key={product.category}>
              {/* <div className=' p-4 bg-slate-200 rounded-full md:w-32 w-40 h-40 md:h-32 overflow-hidden flex items-center justify-center '>
                <img src={product?.productImage[0]} alt={product.category} className='h-full object-scale-down mix-blend-multiply' />
              </div> */}
              <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
            </Link>
          )
        })
        )
      }
      </div>
    </div>
  )
}

export default CategoryList
