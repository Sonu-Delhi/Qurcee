import paymentModel from "../../models/deliveryInformation.js";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PeIJ2KpxteXK8ukXpbi7AlmjSNacwnbmnQ1kqqQ5HXlbghlxmLc6KaE11itsOEWeswW09VbQS2VtGkVl8kieN3n00fmbRjpun');

const paymentGatwayControllers = async (req, res) => {
  try {
    const { amount, deliveryInformation } = req.body;

    // Step 1: Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in smallest currency unit (e.g., 100 for ₹1.00)
      currency: 'inr', // Replace with your preferred currency
    });

    // Step 2: Save Delivery Information (if applicable)
    const savedInfo = await paymentModel.create(deliveryInformation);

    // Step 3: Send Client Secret for frontend to confirm payment
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      message: 'Payment intent created successfully, delivery information saved.',
      deliveryId: savedInfo._id,  // Return the ID of the saved information
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default paymentGatwayControllers;
