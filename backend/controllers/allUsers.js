const userModel = require("../models/userModel");

async function allUsersController(req, res) {
  try {
    const allUsers = await userModel.find();
    res.json({
      message: "All users",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = allUsersController;
