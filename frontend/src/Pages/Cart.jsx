import React, { useContext, useEffect, useState } from "react";
import summryApi from "../common";
import Context from "../context";
import displayCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";
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
          "Content-Type": "application/json",
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

  const increaseQty = async (id, qty) => {
      const response = await fetch(summryApi.updateAddToCartProduct.url, {
      method: summryApi.updateAddToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id:id,
        quantity: qty + 1,
      }),
    });
    const resposeData = await response.json();
    if (resposeData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(summryApi.updateAddToCartProduct.url, {
        method: summryApi.updateAddToCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id:id,
          quantity: qty - 1,
        }),
      });
      const resposeData = await response.json();
      if (resposeData.success) {
        fetchData();
      }
    }
  };

  const deleteProduct = async(id)=>{
    const response = await fetch(summryApi.deleteAddToCartProduct.url, {
      method: summryApi.deleteAddToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const resposeData = await response.json();
    if (resposeData.success) {
      fetchData();
      context.fetchUserAddToCart()
    }
  }
  const totalQty = data.reduce((prevValue,currValue)=> prevValue + currValue.quantity,0)
  const totalPrice = data.reduce((prevValue,currValue)=>prevValue + (currValue.quantity * currValue.productId.sellingPrice),0)

  return (
    <div className="container mx-auto mt-3">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View Product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el) => {
                return (
                  <div
                    className="w-full bg-slate-200 h-32 my-4 border border-slate-300 animate-pulse rounded"
                    key={el + "Add To Cart Loading"}
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    className="w-full bg-white h-32 my-4 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                    key={product?._id + "Add To Cart Loading"}
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt=""
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                    {/* Delete Product */}
                    <div className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 cursor-pointer hover:text-white" onClick={()=>deleteProduct(product?._id)}>
                      <MdDelete/>
                    </div>
                      <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                      <p className="capitalize text-blue-600 font-medium text-lg">
                        {displayCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="capitalize text-slate-600 font-semibold text-lg">
                        {displayCurrency(product?.productId?.sellingPrice * product?.quantity)}
                      </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white" onClick={()=>decreaseQty(product?._id,product?.quantity)}>
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* Total Product */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 bordrt border-slate-300 animate-pulse rounded">
              Toatal
            </div>
          ) : (
            <div className="h-36 my-4 bg-white">
              <h2 className="text-white bg-blue-600 px-4 py-1">Summary</h2>
              <div>
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div>
                <p>Total Price</p>
                <p>{totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
