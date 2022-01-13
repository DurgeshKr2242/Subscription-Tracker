const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postsControllers");

router.get("/", getPosts);

// router.get("/:pid", getPostById);

router.get("/user/:uid", getPostsByUserId);
router.get("/:pid", getPostById);

router.post("/:uid", [check("service").not().isEmpty()], createPost);
router.patch("/:pid", [check("service").not().isEmpty()], updatePost);
router.delete("/:pid", deletePost);

module.exports = router;
