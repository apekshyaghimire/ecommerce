// import express from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cors from "cors";


// //configure env
// dotenv.config();

// //databse config
// connectDB();

// //rest object
// const app = express();



// //middelwares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));


//  //routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);

 
// //rest api
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to e-commerce app</h1>');
// });

// //PORTnodemon server.js

// const PORT = process.env.PORT || 8080;

// //run listen
// app.listen(PORT, () => { console.log(
//     `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
//       .white
//   );
// });



import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import Stripe from "stripe";   // ✅ ADD THIS

// configure env
dotenv.config();

// initialize stripe AFTER dotenv
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ ADD THIS

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// 🔹 STRIPE PAYMENT ROUTE
app.post("/api/v1/payment/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to e-commerce app</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
