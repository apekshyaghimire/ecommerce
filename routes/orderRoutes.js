import express from "express";
import Order from "../models/orderModel.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CREATE ORDER
router.post("/orders", requireSignIn, async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving order", error });
  }
});

// GET USER ORDERS
router.get("/orders", requireSignIn, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting orders", error });
  }
});

export default router;
