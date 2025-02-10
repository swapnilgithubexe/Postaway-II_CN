
import userModel from "../model/userSchema.js"

//Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new userModel({ name: name, email: email, password: password });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      name: newUser.name,
      email: newUser.email
    })
  } catch (error) {

  }
}

//login 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: `User with ID: ${email} not found`
      })
    }
    const isPasswordMatched = await existingUser.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Password did not match, please re-enter your correct password"
      })
    }

    const token = existingUser.generateToken();

    res.status(200).json({
      message: "Login successful",
      token
    })
  } catch (error) {
    console.log(error);

  }
}