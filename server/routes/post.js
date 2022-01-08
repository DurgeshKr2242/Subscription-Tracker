const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostById,
} = require("../controllers/postsControllers");

router.get("/", getPosts);

// router.get("/:pid", getPostById);

router.get("/user/:uid", getPostsByUserId);
router.get("/:pid", getPostById);

router.post("/", [check("service").not().isEmpty()], createPost);

module.exports = router;
