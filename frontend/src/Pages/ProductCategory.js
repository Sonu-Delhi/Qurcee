import React from 'react'
import productCategory from '../helper/productCategory'
// import { useParams } from 'react-router-dom'
// import CategoryList from '../Components/CategoryList'
const ProductCategory = () => {
  // const params = useParams()
  // console.log("Category",params.categoryName);
  
  return (
    <div className='container p-4 mx-auto'>
    {/* desktop version */}
    <div className='hidden lg:grid grid-cols-[200px,1fr]'>
      {/* left Side */}
      <div className='bg-white p-2 min-h-[calc(100vh-120px)]'>
      {/* Sort By */}
        <div>
          <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort By</h3>

          <form className='text-sm flex flex-col gap-2 py-2'>
            <div className='flex items-center gap-3'>
              <input type='radio' name='sortBy' id='lowtohigh' className='cursor-pointer' />
              <label htmlFor='lowtohigh' className='cursor-pointer'>Price (Low to High)</label>
            </div>
            <div className='flex items-center gap-3'>
              <input type='radio' name='sortBy' id='hightolow' className='cursor-pointer'/>
              <label htmlFor='hightolow' className='cursor-pointer'>Price (High to Low)</label>
            </div>
          </form>
        </div>

        {/* Filter By */}
        <div>
          <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>

          <form className='text-sm flex flex-col gap-2 py-2'>
            {
              productCategory.map((categoryName,index)=>{
                return(
                  <div className='flex items-center gap-3'>
                    <input type='checkbox' name={categoryName} id={categoryName.value} className='cursor-pointer' />
                    <label htmlFor={categoryName.value} className='cursor-pointer'>{categoryName.label}</label>
                  </div>
                )
              })
            }
          </form>
        </div>
      </div>
      
      {/* right Side (product) */}
      <div>
        right product
      </div>
    </div>
      
    </div>
  )
}

export default ProductCategory
