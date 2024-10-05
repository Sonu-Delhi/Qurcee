import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helper/displayCurrency';

const AdminProductCart = ({ 
  data,
  fetchData }) => {
    const [editProduct, setEditProduct] = useState(false);

    // Check if the productImage array exists and has at least one image
    const productImage = data?.productImage?.length > 0 ? data.productImage[0] : '/fallback-image.jpg';

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40 '>
            <div className='w-32 h-32 flex justify-center items-center'>
            <img className='w-full mx-auto object-fill h-full'
              src={productImage} 
              alt={data?.productName || 'Product image'}
            />
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>

            <div>
            <p className='font-semibold'>
            {
              displayINRCurrency(data.sellingPrice)
            }
            </p>
            <div 
              className='w-fit ml-auto p-2 bg-green-200 cursor-pointer hover:bg-green-600 rounded-full hover:text-white' 
              onClick={() => setEditProduct(true)}
              aria-label="Edit product"  // Adding aria-label for better accessibility
            >
                <MdModeEditOutline />
            </div>
            </div>
            
            </div>
            {editProduct && (
                <AdminEditProduct 
                  productData={data} 
                  onClose={() => setEditProduct(false)} 
                  fetchDatas={fetchData} />
            )}
        </div>
    );
}

export default AdminProductCart;
