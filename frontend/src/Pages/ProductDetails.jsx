import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import summryApi from '../common';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import displayCurrency from '../helper/displayCurrency';
// import VirticalCartProduct from '../Components/VirticalCartProduct';
import CategoryWiseProduct from '../Components/CategoryWiseProduct';
import addToCart from '../helper/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });

  const [zoomImage, setZoomImage] = useState({ x: 0, y: 0 });
  const [zoomIn,setZoomIn]=useState(false)
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate()
  const params = useParams();
  const productImageList = new Array(4).fill(null);

  const fetchProductDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(summryApi.productDetails.url, {
        method: summryApi.productDetails.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          productId: params.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch product details');

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0] || '');
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = (e) => {
    setZoomIn(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomImage({ x, y });
  };
  const handleZoomIn = ()=>{
    setZoomIn(false)
  }

  const handleAddToCart = async (e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    alert('Product added to cart successfully!')

  }

  const handleByProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              alt="ProductImage"
              onMouseMove={handleZoomImage} onMouseLeave={handleZoomIn} // Change to onMouseMove for continuous tracking
            />
            {/* Product Zoom */}
            {
              zoomIn && (
                <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0 zoom-window">
              <div
                className="w-full h-full min-h-[400px] min-w-[400px] zoom-image mix-blend-multiply"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: "200%", // Adjust zoom intensity
                  backgroundPosition: `${zoomImage.x}% ${zoomImage.y}%`,
                }}
              ></div>
            </div>
              )
            }
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col h-full">
                {productImageList.map((_, index) => (
                  <div key={index} className="h-20 w-20 bg-slate-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((imgUrl, index) => (
                  <div className="h-16 w-16 bg-slate-200 rounded p-1" key={index}>
                    <img
                      src={imgUrl}
                      alt="ProductImage"
                      className="w-full h-full cursor-pointer object-scale-down mix-blend-multiply"
                      onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                      onClick={() => handleMouseEnterProduct(imgUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col gap-1 animate-pulse">
            <p className="bg-slate-200 px-2 rounded-full inline-block w-full h-8"></p>
            <p className="bg-slate-200 h-8 w-full"></p>
            <p className="bg-slate-200 h-4 w-full"></p>
          </div>
        ) : error ? (
          <div className="text-red-600">
            Error: {error}
            <button className="mt-2 text-blue-600 underline" onClick={fetchProductDetails}>
              Retry
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-blue-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-blue-600">{displayCurrency(data?.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayCurrency(data?.price)}</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all" onClick={(e)=>handleByProduct(e,data._id)}>
                Buy
              </button>
              <Link
                to="/addtocart"
                className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-white font-medium bg-blue-600 hover:bg-white hover:text-blue-600 transition-all"
                onClick={(e)=>handleAddToCart(e,data._id)}>
                Add to Cart
              </Link>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description: </p>
              <p className="text-slate-500">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      <CategoryWiseProduct category={data.category} heading={"Recommended Product"} />
    </div>
  );
};

export default ProductDetails;
