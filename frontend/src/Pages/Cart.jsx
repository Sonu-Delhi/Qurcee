import React, { useContext, useEffect, useState } from 'react';
import summryApi from '../common';
import Context from '../context';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(summryApi.addToCartProductView.url, {
        method: summryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data", data);

  return (
    <div className='container mx-auto mt-3'>
      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <p className='bg-white py-5'>No Data</p>
          )
        }
      </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
          {/* View Product */}
          <div className='w-full max-w-3xl'>
            {
              loading ?(
                loadingCart.map(el=>{
                  return(
                    <div className='w-full bg-slate-200 h-32 my-4 border border-slate-300 animate-pulse rounded' key={el+"Add To Cart Loading"}></div>
                  )
                })
              ):(
                data.map((product,index)=>{
                  return(
                    <div className='w-full bg-white h-32 my-4 border border-slate-300 rounded grid grid-cols-[128px,1fr]' key={product?._id+"Add To Cart Loading"}>
                      <div className='w-32 h-full bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt='' />
                      </div>
                      <div className='p-4'>
                        <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                        <p className='font-semibold text-slate-500'>{product?.quantity}</p>
                        <p className='font-semibold text-slate-500'>{product?.quantity*product?.productId?.price}</p>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
          {/* Total Product */}
          <div className='lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='h-36 my-4 bg-slate-200 bordrt border-slate-300 animate-pulse rounded'>
            Toatal
          </div>
            ):(
              <div className='h-36 bg-slate-200'>
            Toatal
          </div>
            )
          }
          </div>
        </div>
      
    </div>
  );
};

export default Cart;
