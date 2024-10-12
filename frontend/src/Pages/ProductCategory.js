import React, { useEffect, useState } from 'react'
import productCategory from '../helper/productCategory'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import VirticalCard from '../Components/VirticalCard'
import summryApi from '../common'

const ProductCategory = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState(null)
  const [error, setError] = useState(null)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray =urlSearch.getAll("category")
  const urlCategoryListObject = {}
  urlCategoryListInArray.forEach(el=>{
    urlCategoryListObject[el]=true
  })
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  
  const [sortby,setSortby]=useState("")

  // Fetch data function with error handling
  const fetchData = async () => {
    setLoading(true)
    setError(null) // Reset error state before fetching

    try {
      const response = await fetch(summryApi.filterProduct.url, {
        method: summryApi.filterProduct.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const dataResponse = await response.json()
      setData(dataResponse.data || [])
    } catch (error) {
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Handle category selection
  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }))
  }

  // Apply sorting logic on the data
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'lowtohigh') {
      return a.price - b.price
    } else if (sortBy === 'hightolow') {
      return b.price - a.price
    }
    return 0
  })

  // Update filter list whenever selected categories change
  useEffect(() => {
    const arrayofCategory = Object.keys(selectCategory).filter((categoryKeyName) => selectCategory[categoryKeyName])
    setFilterCategoryList(arrayofCategory)

    // url change formate when change on the checkbox
    const urlformate = arrayofCategory.map((el,index)=>{
      if((arrayofCategory.length-1) === index){
        return `category=${el}`
      }
      
      return `category=${el}&&`
    })
    navigate("/product-category?")
    // product-category?category=alpha&&category=bita
  }, [selectCategory])

  // Fetch data when filter list changes
  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  const handleOnChangeSortBy = (e)=>{
    const {value}=e.target
    setSortby(value)
    if(value === "asc"){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value === "dsc"){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=>{

  },[sortby])
  

  return (
    <div className='container p-4 mx-auto'>
      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Left Side (Filter by category and sort options) */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort By</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"asc"} id='lowtohigh' className='cursor-pointer' checked={sortby==="asc"} onChange={handleOnChangeSortBy} />
                <label htmlFor='lowtohigh'  className='cursor-pointer'>Price (Low to High)</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortby==="dsc"} id='hightolow' className='cursor-pointer' onChange={handleOnChangeSortBy} value={"dsc"} />
                <label htmlFor='hightolow' className='cursor-pointer'>Price (High to Low)</label>
              </div>
            </form>
          </div>

          {/* Filter By Category */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='checkbox'
                    checked={selectCategory[categoryName.value] || false}
                    name={categoryName.value}
                    id={categoryName.value}
                    className='cursor-pointer'
                    onChange={handleSelectCategory}
                    value={categoryName.value}
                  />
                  <label htmlFor={categoryName.value} className='cursor-pointer'>{categoryName.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side (Product display) */}
        <div className='px-4'>
        <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {sortedData.length}</p>
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <VirticalCard data={sortedData} loading={loading} />
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategory
