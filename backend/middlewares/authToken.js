const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorized", error: true, success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Unauthorized", error: true, success: false });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message || err, error: true, success: false });
  }
}

module.exports = authToken;
