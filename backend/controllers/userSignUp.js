const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      throw new Error("Name is required");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Password hashing failed");
    }

    const payload = {
      ...req.body,
      password: hashPassword,
    };

    const newUser = new userModel(payload);
    const savedUser = newUser.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    res.json({ message: err, error: true, success: false });
  }
}

module.exports = userSignUpController;
