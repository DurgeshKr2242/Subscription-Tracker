const express = require("express");

const router = express.Router();

//  MIDDLEWARES

const { authCheck } = require("../middlewares/authMiddleware");

// Create or update User
const {
  createorupdateuser,
  currentUser,
} = require("../controllers/authController");

router.post("/", authCheck, createorupdateuser);
router.post("/current-user", authCheck, currentUser);
module.exports = router;
