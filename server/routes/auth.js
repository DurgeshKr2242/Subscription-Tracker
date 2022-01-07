const express = require("express");

const router = express.Router();

// * MIDDLEWARES

const { authCheck } = require("../middlewares/authMiddleware");

// * CONTROLLERS

const { createorupdateuser } = require("../controllers/authControllers");

router.post("/create-or-update-user", authCheck, createorupdateuser);

module.exports = router;
