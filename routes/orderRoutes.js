import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import Order from "../models/orderModel.js";

const router = express.Router();

// CREATE ORDER
router.post("/orders", requireSignIn, async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating order",
      error,
    });
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
    res.status(500).send({
      success: false,
      message: "Error getting orders",
      error,
    });
  }
});

export default router;
