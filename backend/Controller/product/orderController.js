// import OrderModel from "../../models/orderModel.js";
// import userModel from "../../models/userModels.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// // Placing user Order for frontend
// const placeOrder = async(req,res)=>{
//   const frontend_url = "http://localhost:5173"
//   try{
//     const newOrder = new OrderModel({
//       userId: req.user.userId,
//       items: req.body.items,
//       amount:req.body.amount,
//       address:req.body.address
//     })
//     const order = await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//     const line_items = req.body.items.map((item)=>({
//       price_data:{
//         currency:"inr",
//         product_data:{
//           name:item.name
//         },
//         unit_amount: item.price * 100*80
//       },
//       quantity: item.quantity
//     }))
//     line_items.push({
//       price_data:{
//         currency:"inr",
//         product_data:{
//           name:"Delivery Charges"
//         },
//         unit_amount: 2*100*80
//       },
//       quantity:1
//     })
//     const session = await stripe.checkout.sessions.create({
//       line_items:line_items,
//       mode:"payment",
//       success_url:`${frontend_url}/verify?success=true&orderId=${order._id}`,
//       cancel_url:`${frontend_url}/verify?success=false&orderId=${order._id}`
//     })
//     res.json({
//       data:order,
//       session_url: session.url,
//       success:true,
//       error:false
//     })

//   }
//   catch(err){
//     console.error(err);
//     res.status(500).json({
//       success:false, 
//       message:"Failed to place order"
//     })
//   }
// }
// export default placeOrder


import userModel from "../../models/userModels.js";
import stripe from "../../config/stripe.js";
// import userModel from "../../models/userModels.js";
import OrderModel from "../../models/orderModel.js"
const placeOrder = async (req, res) => {
  try {

    const newOrder = await OrderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })
    await newOrder.save();
    const user = await userModel.findOne({ _id: req.userId });
    const { cartItems } = req.body;
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1QACTLKpxteXK8ukxDcnu6TF",
        },
      ],
      customer_email: user.email,
      line_items: cartItems.map((item) => {
        const productImage = item.productId.productImage && typeof item.productId.productImage === 'string'
          ? item.productId.productImage
          : null;  // Fallback to null if no valid image

        const lineItem = {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice ,
          },
          adjustable_quantity: {
            enabled: true,
            
          },
          quantity: item.quantity,
        };

        // Include product image only if valid
        if (productImage) {
          lineItem.price_data.product_data.images = [productImage];
        }

        return lineItem;
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    // Return the full session data in the response
    res.status(303).json({
      message: "Payment session created successfully",
      success: true,
      sessionData: session,  // Returning the entire session object for more data
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default placeOrder;
