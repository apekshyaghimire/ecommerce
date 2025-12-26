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

    // ✅ CALCULATE TOTAL (price × quantity × 100) with safe parsing + detailed debug
    const parsePrice = (p) => {
      if (p == null) return 0;
      if (typeof p === "number") return p;
      if (typeof p === "string") {
        // remove any currency symbols/commas and keep digits and dot
        const cleaned = p.replace(/[^0-9.\-]/g, "");
        const parsed = parseFloat(cleaned);
        return Number.isFinite(parsed) ? parsed : 0;
      }
      return 0;
    };

    const perItem = cart.map((item, idx) => {
      const rawPrice = item.price;
      const price = parsePrice(rawPrice);
      const quantity = item.quantity == null ? 1 : Number(item.quantity) || 0;
      const lineTotal = price * quantity * 100;
      return { idx, id: item._id, rawPrice, price, quantity, lineTotal };
    });

    const amount = perItem.reduce((s, it) => s + it.lineTotal, 0);
    const amountInt = Math.round(amount);

    if (amountInt < 1) {
      console.error("Payment create error: computed amount too small", {
        receivedCart: cart,
        perItem,
        computedAmount: amount,
        computedAmountInt: amountInt,
      });
      return res
        .status(400)
        .json({ error: "Total amount must be at least $0.01 (in cents: 1)", amount: amountInt, perItem });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInt,
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

// Helpful response for browser GETs to the same path
router.get("/create-payment-intent", (req, res) => {
  res.status(405).json({
    error: "Method Not Allowed. Use POST /api/v1/payment/create-payment-intent with JSON body { cart: [...] }",
  });
});

export default router;
