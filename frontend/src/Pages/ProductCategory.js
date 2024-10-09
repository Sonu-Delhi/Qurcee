import React, { useEffect, useState } from 'react'
import productCategory from '../helper/productCategory'
import { useParams } from 'react-router-dom'
import VirticalCard from '../Components/VirticalCard'
import summryApi from '../common'

const ProductCategory = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectCategory, setSelectCategory] = useState({})
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [error, setError] = useState(null)

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
      console.error("Error fetching data:", error)
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

  // Sort handler
  const handleSortChange = (e) => {
    setSortBy(e.target.id)
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
  }, [selectCategory])

  // Fetch data when filter list changes
  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

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
                <input type='radio' name='sortBy' id='lowtohigh' className='cursor-pointer' onChange={handleSortChange} />
                <label htmlFor='lowtohigh' className='cursor-pointer'>Price (Low to High)</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' id='hightolow' className='cursor-pointer' onChange={handleSortChange} />
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
        <div>
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
  )
}

export default ProductCategory
