const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// تسجيل مستخدم جديد
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const foundEmail = await userModel.findOne({ email });
    if (foundEmail)
      return res.status(409).json({ message: "Account already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// تسجيل الدخول
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundEmail = await userModel.findOne({ email });
    if (!foundEmail)
      return res.status(404).json({ message: "Account not found" });

    const isMatch = await bcrypt.compare(password, foundEmail.password);
    if (!isMatch)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      {
        id: foundEmail._id,
        name: foundEmail.name,
        email: foundEmail.email,
        role: foundEmail.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };