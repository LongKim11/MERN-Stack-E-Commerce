const express = require("express");
const router = express.Router();
const userSignUpController = require("../controllers/userSignUp");
const userSignInController = require("../controllers/userSignIn");
const userDetailsController = require("../controllers/userDetails");
const userSignOutController = require("../controllers/userSignOut");
const authToken = require("../middlewares/authToken");
const allUsersController = require("../controllers/allUsers");
const updateUserController = require("../controllers/updateUser");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/signout", userSignOutController);

router.get("/all-users", authToken, allUsersController);
router.post("/update-user", authToken, updateUserController);

module.exports = router;
