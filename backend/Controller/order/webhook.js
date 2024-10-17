import stripe from "../../config/stripe.js";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const webhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Use raw body for signature verification
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent);
      break;
    // Add more event handling cases as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Respond with a 200 status to acknowledge receipt of the event
  res.status(200).send();
};

export default webhooks;
