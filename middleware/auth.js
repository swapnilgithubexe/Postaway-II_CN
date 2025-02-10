import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userSchema.js";

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, No token provided."
      })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userModel.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    console.log("Error in the Auth file", error);
    return res.status(401).json({
      message: "Unauthorized: Invalid token"
    })

  }
}