import express from "express";
import { registerController , loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController } from "../controller/authController.js";
import {  isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//import Orders from './../client/src/pages/user/Orders';



//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);


//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);


//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//Orders
router.get("/orders", requireSignIn, getOrdersController);

//All Orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Admin: get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);


// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
