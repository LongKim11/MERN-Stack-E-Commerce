const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 8,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      data: user,
      token: token,
      success: true,
      error: false,
      message: "User signed in successfully",
    });
  } catch (err) {
    res.json({ message: err.message || err, error: true, success: false });
  }
}

module.exports = userSignInController;
