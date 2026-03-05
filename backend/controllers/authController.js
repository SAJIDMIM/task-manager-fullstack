// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "1d" }
  );
};

// ---------------------- SIGNUP ----------------------
export const signupUser = async (req, res) => {
  console.log("Request body:", req.body);

  const { identifier, password, confirmPassword } = req.body;

  if (!identifier || !password || !confirmPassword) {
    console.log("Validation error: Missing fields");
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    console.log("Validation error: Passwords do not match");
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    let email = null;
    let username = null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(identifier)) email = identifier;
    else username = identifier;

    console.log("Checking for existing user...");
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log("Validation error: User already exists");
      return res.status(400).json({ message: "Email or Username already exists!" });
    }

    console.log("Creating new user...");
    const user = new User({ email, username, password });
    await user.save(); // async pre-save hook hashes password

    console.log("Generating JWT token...");
    const token = generateToken(user);

    console.log("✅ User created successfully:", user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("SERVER ERROR FULL:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ---------------------- LOGIN ----------------------
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // identifier = email OR username

  if (!identifier || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Find user by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};