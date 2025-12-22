import express from "express";
import Stripe from "stripe";

const router = express.Router();

// Stripe initialized on SERVER
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { cart } = req.body;

    // ✅ SAFETY CHECK
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // ✅ CALCULATE TOTAL (price × quantity × 100)
    const amount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity * 100,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
