async function userSignOutController(req, res) {
  try {
    res.clearCookie("token");
    res.json({
      message: "User signed out successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({ message: err.message || err, error: true, success: false });
  }
}

module.exports = userSignOutController;
