import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseproduct";
import displayINRCurrency from "../helper/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";

const VirticalCartProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScroll, setCanScroll] = useState(false); // New state to handle scroll visibility
  const scrollElement = useRef();
  const {fetchUserAddToCart } = useContext(Context);
  const handlAddTocart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }
  const loadingList = new Array(4).fill(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const categoryProducts = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProducts?.data || []);
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (scrollElement.current && data.length > 0) {
      const scrollableWidth = scrollElement.current.scrollWidth;
      const visibleWidth = scrollElement.current.clientWidth;
      setCanScroll(scrollableWidth > visibleWidth); // Check if scrolling is needed
    }
  }, [data]);

  const scrollRight = () => {
    scrollElement.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollElement.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none"
        ref={scrollElement}
      >
      {canScroll && (
        <>
          <button
            onClick={scrollLeft}
            className="bg-white p-1 shadow-md rounded-full absolute left-0 text-lg hidden md:block"
            aria-label="Scroll Left"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white p-1 shadow-md rounded-full absolute right-0 text-lg hidden md:block"
            aria-label="Scroll Right"
          >
            <FaAngleRight />
          </button>
        </>
      )}
        {loading ? (
          loadingList.map((product, index) => {
            return(
              <div
              className="w-full min-w-[220px]  md:min-w-[220px] max-w-[220px] md:max-w-[220px] bg-white rounded-sm shadow"
              key={index}
            >
              <div className="bg-slate-200 p-4 animate-pulse h-48 min-w-[220px] md:min-w-[145px] flex items-center justify-center">
              
              </div>

              <div className="px-4 py-2 grid">
                <h2 className="text-base md:text-lg font-medium text-ellipsis line-clamp-1 text-black p-1 w-full bg-slate-200 mb-1 animate-pulse">
                  
                </h2>
                <p className="capitalize text-slate-500 bg-slate-200 animate-pulse rounded-full w-full p-1"></p>
                <div className="flex justify-between my-1 gap-2">
                  <p className="text-sm bg-slate-200 p-1 w-full rounded-full animate-pulse">
                  
                  </p>
                  <p className="text-sm text-red-600 rounded-full  bg-slate-200 p-1 w-full animate-pulse">
                    
                  </p>
                </div>
                <button className=" w-full rounded-full p-1 text-white bg-slate-200 animate-pulse">
                  
                </button>
              </div>
            </div>
            )
          })
        ):(
          data.map((product, index) => {
            return(
              <Link to={"/product/"+product?._id}
              className="w-full min-w-[220px]  md:min-w-[220px] max-w-[220px] md:max-w-[220px] bg-white rounded-sm shadow"
              key={index}
            >
              <div className="bg-slate-200 p-4 h-48 min-w-[220px] md:min-w-[145px] flex items-center justify-center">
                <img
                  src={product.productImage[0]}
                  alt={`${product.productName}`}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
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
                  <p className="text-sm text-red-600 line-through font-semibold text-ellipsis line-clamp-1 ">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button className="bg-blue-600 w-full rounded-full p-1 text-white hover:bg-blue-700 transition-all" onClick={(e)=>handlAddTocart(e,product?._id)}>
                  Add to Cart
                </button>
              </div>
            </Link>
            )
          })
        )}
      </div>
    </div>
  );
};

export default VirticalCartProduct;
