const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

//  MIDDLEWARES

const { authCheck } = require("../middlewares/authMiddleware");

// Create or update User
const {
  createorupdateuser,
  currentUser,
  getUsers,
  getUserById,
  addFriend,
  updateUser,
} = require("../controllers/authController");

// Get all Users
router.get("/", getUsers);
// Get single Users by user id
router.get("/:uid", getUserById);
// Create a single user
router.post("/", authCheck, createorupdateuser);
router.patch("/:uid", [check("name").not().isEmpty()], updateUser);
// Get the currently signedin user via token
router.post("/current-user", authCheck, currentUser);
router.post("/add-friend/:fid", authCheck, addFriend);
module.exports = router;
