import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Minimum 8 characters required for a password"]
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female", "Others"]
  },
  role: {
    type: String,
    default: "user",
    enum: ['user', 'admin'],
    trim: true,
    lowercase: true
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: "2h" })
}

const userModel = mongoose.model("User", userSchema);
export default userModel;