const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// REGISTER USER
// =======================
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
}

// =======================
// LOGIN USER
// =======================
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
}

// =======================
// GET CURRENT LOGGED-IN USER
// =======================
async function getMe(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Server error fetching user" });
  }
}

// EXPORT CONTROLLERS
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
