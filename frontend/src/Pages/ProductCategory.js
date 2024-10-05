import React from 'react'
import { useParams } from 'react-router-dom'
// import CategoryList from '../Components/CategoryList'
const ProductCategory = () => {
  const params = useParams()
  // console.log("Category",params.categoryName);
  
  return (
    <div>
      {
        params.categoryName
      }
    </div>
  )
}

export default ProductCategory
