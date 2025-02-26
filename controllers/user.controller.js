
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
    console.log("Error in signup function");
    res.status(500).json({ message: "Internal Server Error" });


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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).json({
      message: "Login successful",
      token
    })
  } catch (error) {
    console.log("Error in log in function");
    res.status(500).json({ message: "Internal Server Error" });

  }
}

//logout 
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict", path: "/" })
    return res.status(200).json({
      message: "User has been logged out successfully"
    })
  } catch (error) {
    console.log("Error in logout function");
    res.status(500).json({
      message: "Internal Server Error"
    })

  }
}