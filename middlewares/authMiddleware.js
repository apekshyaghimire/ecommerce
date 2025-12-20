import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";


//Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

//chat
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // handles 'Bearer <token>'
//     if (!token) return res.status(401).json({ success: false, message: "No token provided" });

//     const decode = JWT.verify(token, process.env.JWT_SECRET);
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ success: false, message: "Invalid token", error });
//   }
// };


export const requireSignIn = async (req, res, next) => {
  try {
    // ✅ Temporary log to inspect the token header
    console.log("🔍 Authorization Header:", req.headers.authorization);

    // Check if token exists
    if (!req.headers.authorization) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("❌ Auth Error:", error.message);
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
};


//admin acceess
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     if (user.role !== 1) {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middleware",
//     });
//   }
// };
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "UnAuthorized Access",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
