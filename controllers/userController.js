const USER = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3 days" });
};

//Route for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user,
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Route for user Registration
const registerUser = async (req, res) => {
  // res.json({ msg: "Register API Working" });

  const { name, email, password } = req.body;
  try {
    //check if user already exists
    const exists = await USER.findOne({ email });
    if (exists) {
      return res
        .status(403)
        .json({ success: false, message: "User already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a strong password" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await USER.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route for admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res
        .status(201)
        .json({ success: true, token, message: "Login Successfull" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginUser, registerUser, adminLogin };
