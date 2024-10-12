import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import displayINRCurrency from '../helper/displayCurrency'
import Context from '../context';
import summryApi from '../common';

const PlaceOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const fetchData = async () => {
    // setLoading(true);
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
    }// } finally {
    //   setLoading(false);
    // }
  };
  const handleLoading = async()=>{
    await fetchData()
  }
  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
  }, []);

  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and limit input to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };
  const totalQty = data.reduce((prevValue,currValue)=> prevValue + currValue.quantity,0)
  const totalPrice = data.reduce((prevsValue,currentValue)=>prevsValue + (currentValue.quantity * currentValue.productId.sellingPrice),0)
  return (
    <form className='place-order container mx-auto px-4 '>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-field'>
            <input type='text' placeholder='First name' />
            <input type='text' placeholder='Last name' />
        </div>
        <input type='email' placeholder='Email Address' />
        <input type='text' placeholder='Street'  />

        <div className='multi-field'>
            <input type='text' placeholder='City' />
            <select>
              <option value="">Select State</option>
              <option value="delhi">Delhi</option>
              <option value="hrayana">Harayan</option>
              <option value="punjab">Punjab</option>
              <option value="Up">Uattar Pradesh</option>
            </select>
        </div>

        <div className='multi-field'>
            <input type='text' placeholder='Pin Code' />
            <input type='text' value="India" readOnly="" placeholder='Country' />
        </div>
        <input type='number' value={phone} placeholder='Phone' onChange={handlePhoneChange} />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
            <h2 className='title'>Total Amount</h2>
            <div className='cart-total-details'>
                <p>SubTotal</p>
                <p>{displayINRCurrency(totalPrice)}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
                <p>Deliver fee</p>
                <p>{displayINRCurrency(140)}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
                <p>Total Amount</p>
                <p>{displayINRCurrency(totalPrice+140)}</p>
            </div>
            <hr/>
        <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
