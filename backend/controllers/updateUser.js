const userModel = require("../models/userModel");

async function updateUserController(req, res) {
  try {
    const { id, email, name, role } = req.body;

    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    const sessionUserID = req.user._id;
    const sessionUserDetails = await userModel.findById(sessionUserID);

    if (sessionUserDetails.role !== "ADMIN") {
      return res.status(400).json({
        message: "You are not authorized to perform this action",
        success: false,
        error: true,
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, payload);

    res.json({
      message: "User updated",
      data: updatedUser,
      success: true,
      error: false,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || err, success: false, error: true });
  }
}

module.exports = updateUserController;
