import React, { useContext, useEffect, useState } from 'react'
import summryApi from '../common'
import Context from '../context'
import addToCart from '../helper/addToCart'
import { Link } from 'react-router-dom'
import scrollTop from '../helper/scrollTop'
import displayINRCurrency from '../helper/displayCurrency'
import banner1 from '../assets/banners/banner2.jpg'

const Alpha = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchCategoryProduct = async () => {
    setLoading(true)
    const response = await fetch(summryApi.getProducts.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
    
    // Fetch unique categories from the products
    const uniqueCategories = [...new Set(dataResponse.data.map(product => product.category))]
    setCategories(uniqueCategories)
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const filteredProducts = selectedCategory === 'All'
    ? categoryProduct
    : categoryProduct.filter(product => product.category === selectedCategory)

  return (
    <div>

      {/* Banner Image */}
      <div className="mb-6 w-full flex justify-center">
        <img
          src={banner1}
          alt="Banner"
          className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover" // Object-scale-down with full width
        />
      </div>

      <div className="container mx-auto px-4 my-6">
        {/* Category Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            className="border border-gray-300 rounded px-4 py-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center my-6">
            <p>Loading products...</p>
          </div>
        )}

        {/* No Products Message */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center my-6">
            <p>No products found in this category.</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="flex items-center justify-between gap-10 flex-wrap">
            {filteredProducts.map((product, index) => (
              <Link
                to={`/product/${product?._id}`}
                className="w-full min-w-[260px] md:min-w-[260px] max-w-[260px] bg-white rounded-sm shadow"
                key={index}
                onClick={scrollTop}
              >
                <div className="bg-slate-200 p-4 h-48 min-w-[220px] flex items-center justify-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 rounded transition-all mix-blend-multiply"
                  />
                </div>

                <div className="px-4 py-2 grid">
                  <h2 className="text-base md:text-lg font-medium text-ellipsis line-clamp-1 text-black">
                    {product.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.category}</p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500 font-semibold">
                      {displayINRCurrency(product.sellingPrice)}
                    </p>
                    <p className="text-sm text-red-600 line-through font-semibold text-ellipsis line-clamp-1">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    className="bg-blue-600 w-full rounded-full p-1 text-white hover:bg-blue-700 transition-all"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Alpha
