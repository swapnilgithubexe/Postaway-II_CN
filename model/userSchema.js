import mongoose from "mongoose";


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
    min: [8, "Minimum 8 characters required for a password"]
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;