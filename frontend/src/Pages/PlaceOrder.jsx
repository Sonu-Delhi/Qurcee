import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import displayINRCurrency from '../helper/displayCurrency';
import Context from '../context';
import summryApi from '../common';
import axios from 'axios';

const PlaceOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const token = localStorage.getItem('token');
  const fetchData = async () => {
    setLoading(true); // Start loading
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
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalQty = data.reduce((prevValue, currValue) => prevValue + currValue.quantity, 0);
  const totalPrice = data.reduce(
    (prevsValue, currentValue) => prevsValue + currentValue.quantity * currentValue.productId.sellingPrice,
    0
  );

  const [delvData, setDelvData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India", // Set default value here
    phone: "",
  });

  const delvOnChangeHandler = (e) => {
    const { name, value } = e.target; // Corrected
    setDelvData((delvData) => ({ ...delvData, [name]: value }));
  };

  
  if (loading) {
    return <div className="loading">Loading...</div>; // Loading state
  }

  const placeOrder = async (e) => {
    e.preventDefault();
  
    // Construct the order items array
    let orderItems = data.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.sellingPrice,
      totalPrice: item.quantity * item.productId.sellingPrice,
      totalQuantity: item.quantity,
      productName: item.productId.productName,
      productImage: item.productId.productImage,
    }));
  
    // Construct order data
    let orderData = {
      userId: context.userId, // Assuming userId is available from context
      address: delvData, // Delivery data
      items: orderItems, // Order items
      amount: totalPrice + 140, // Total amount
    };
  
    // console.log("Order Data:", orderData); // Log the order data to debug
    const placeOrederResopnse = await axios.post("http://localhost:8080/api/place",orderData,{headers:{token}})
    if(placeOrederResopnse.data.success){
      const {session_url} = placeOrederResopnse.delvData;
      window.location.replace(session_url)
    }
    console.log("placeOrederResopnse",placeOrederResopnse);
    
  }
  


  

  return (
    <form className="place-order container mx-auto px-4" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            name="firstName"
            required
            onChange={delvOnChangeHandler}
            value={delvData.firstName}
            type="text"
            placeholder="First name"
          />
          <input
          required
            name="lastName"
            onChange={delvOnChangeHandler}
            value={delvData.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          name="email"
          required
          onChange={delvOnChangeHandler}
          value={delvData.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="street"
          required
          onChange={delvOnChangeHandler}
          value={delvData.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-field">
          <input
            name="city"
            required
            onChange={delvOnChangeHandler}
            value={delvData.city}
            type="text"
            placeholder="City"
          />
          <select name="state" required onChange={delvOnChangeHandler} value={delvData.state}>
            <option value="">Select State</option>
            <option value="delhi">Delhi</option>
            <option value="haryana">Haryana</option>
            <option value="punjab">Punjab</option>
            <option value="up">Uttar Pradesh</option>
          </select>
        </div>

        <div className="multi-field">
          <input
            name="pincode"
            required
            onChange={delvOnChangeHandler}
            value={delvData.pincode}
            type="text"
            placeholder="Pin Code"
          />
          <input
            name="country"
            onChange={delvOnChangeHandler}
            value={delvData.country}
            type="text"
            readOnly
            required
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          required
          onChange={delvOnChangeHandler}
          value={delvData.phone}
          type="number"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2 className="title">Total Amount</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>{displayINRCurrency(totalPrice)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>{displayINRCurrency(140)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total Amount</p>
            <p>{displayINRCurrency(totalPrice + 140)}</p>
          </div>
          <hr />
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
