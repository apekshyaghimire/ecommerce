import express from "express"; 
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { categoryControlller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";

// 👇 ADD THIS LINE right after imports
console.log("✅ categoryRoutes.js loaded successfully");

const router = express.Router();


router.get("/test", (req, res) => {
  res.send("✅ Category routes are connected and working!");
});

//routes
//create category
router.post(
  "/create-category", requireSignIn, isAdmin, createCategoryController
  
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController,
);

// //getALl category
 router.get("/get-category", categoryControlller);

// //single category
router.get("/single-category/:slug", singleCategoryController);

// //delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller,
);

export default router;