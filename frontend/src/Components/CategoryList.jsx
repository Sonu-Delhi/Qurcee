import React, { useEffect, useState } from 'react';
import summryApi from '../common';
import { MdOutlineNotes } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(4).fill(null);

  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(summryApi.productCategory.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  // Handle category change and navigate to the selected category's page
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      navigate(`/product-category?category=${selectedCategory}`);
    }
  };

  return (
    <div className=" ">
      <div>

        {/* Loading state */}
        {loading ? (
          categoryLoading.map((el, index) => (
            <div className="animate-pulse overflow-hidden" key={"categoryLoading" + index}>
              <p>Loading...</p>
            </div>
          ))
        ) : (
          <div className="w-fit">
            {/* Dropdown */}
            <select
              id="category"
              onChange={handleCategoryChange}  // Call the handleCategoryChange function on change
              className="block w-full p-2 text-white categorylist  bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">--Select a Category--</option>
              {categoryProduct.map((product, index) => (
                <option key={index} value={product?.category}>
                  {product?.category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
