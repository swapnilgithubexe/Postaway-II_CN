import userModel from "../model/userSchema.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // if not, create a new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: password,
      gender: gender
    });

    // save user
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender
    });
  } catch (error) {
    console.log("Error in signup function");
    res.status(500).json({ message: error.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: `User with ID: ${email} not found`,
      });
    }

    // check if password is correct
    const isPasswordMatched = await existingUser.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Password did not match, please re-enter your correct password",
      });
    }

    // generate token if login is successful
    const token = existingUser.generateToken();

    // store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // valid for 1 day
    });

    // send response after successful login
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Error in login function");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    // remove the token cookie from browser
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    return res.status(200).json({
      message: "User has been logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout function");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get single user details
export const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // find user by their id
    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return res.status(400).json({
        message: `User not found`,
      });
    }

    // send user data
    res.status(200).json({
      message: "User found!",
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    console.log("Error in the getUserDetails controller function");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get all users - only for admin
export const getAllDetails = async (req, res) => {
  try {
    const { _id } = req.user; // user info comes from middleware after token verification

    // find logged-in user
    const existingUser = await userModel.findById(_id);

    // check if user exists
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // only admin can access this route
    if (existingUser.role !== "admin") {
      return res.status(404).json({
        message: "Access forbidden",
      });
    }

    // fetch all users from DB
    const users = await userModel.find();

    res.status(200).json({
      message: "Users found",
      users: users,
    });
  } catch (error) {
    console.log("Error in the getAllDetails controller function");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// update user details
export const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { updatedData } = req.body;

    // update user data using id
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true } // this returns the updated document
    );


    // if user doesn't exist
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // send updated info back
    res.status(200).json({
      message: "User updated",
      name: updatedUser.name,
      email: updatedUser.email
    });
  } catch (error) {
    console.log("Error in the update profile controller function");
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
