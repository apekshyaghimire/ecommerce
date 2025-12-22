import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

// Stripe public key

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

// ---------------- CHECKOUT FORM ----------------
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();





const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  try {
    setLoading(true);

    // 1️⃣ Create payment intent
    const { data } = await axios.post(
      "/api/v1/payment/create-payment-intent",
      { cart }
    );

    // 2️⃣ Confirm card payment
    const result = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: auth?.user?.name,
          },
        },
      }
    );

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    // 3️⃣ Save order
    await axios.post("/api/v1/auth/orders", {
      products: cart,
      payment: {
        success: true,
        paymentIntentId: result.paymentIntent.id,
      },
      buyer: auth.user._id,
    });

    toast.success("Payment Successful & Order Placed!");

    localStorage.removeItem("cart");
    navigate("/dashboard/user/orders");

  } catch (error) {
    console.log("Stripe error:", error);
    toast.error("Payment failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="btn btn-primary w-100 mt-3"
        disabled={loading || !stripe}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// ---------------- PAGE ----------------
const Checkout = () => {
  return (
    <Layout>
      <div className="container mt-4">
        <h2>Checkout</h2>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Layout>
  );
};

export default Checkout;
