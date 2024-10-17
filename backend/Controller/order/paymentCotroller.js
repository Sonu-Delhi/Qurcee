import userModel from "../../models/userModels.js";
import stripe from "../../config/stripe.js";

const paymentController = async (req, res) => {
  try {
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
            unit_amount: item.productId.sellingPrice *100 ,
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

export default paymentController;
