require("dotenv").config();
const router = require("express").Router();
const { isLoggedIn } = require("../middleware/index.js");
const { User, Post } = require("../models/index.js");

// 게시글 생성하기 - by 1-blue
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    // 내용 채우기
  } catch (error) {
    console.error("POST /post error >> ", error);
    return next(error);
  }
});

module.exports = router;
