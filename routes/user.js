require("dotenv").config();
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { isLoggedIn, isNotLoggedIn } = require("../middleware/index.js");
const { User, Post } = require("../models/index.js");

// 로그인한 유저 정보 가져오기 - by 1-blue
router.get("/me", isLoggedIn, async (req, res, next) => {
  if (!req.user) return res.status(200).json({ message: "로그인하지 않았습니다.", user: null });

  try {
    const fullUser = await User.findOne({
      attributes: ["_id", "name", "provider"],
      where: { _id: req.user._id },
      include: [{ model: Post, attributes: ["_id"] }],
    });

    return res.status(200).json({ message: "로그인한 유저의 정보를 가져오는데 성공했습니다.", user: fullUser });
  } catch (error) {
    console.error("GET /user/me error >> ", error);
    return next(error);
  }
});

// 회원가입 - by 1-blue
router.post("/", isNotLoggedIn, async (req, res, next) => {
  const { id, password, name, phone, birthday } = req.body;

  try {
    const exUser = await User.findByPk(id);

    if (exUser) return res.status(409).json({ message: "이미 가입된 아이디입니다.\n다른 아이디로 다시 시도해주세요" });

    const hashedPassword = await bcrypt.hash(password, 6);

    await User.create({
      id,
      password: hashedPassword,
      name,
      phone,
      birthday,
    });

    return res.status(200).json({ message: `${name}님 회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.` });
  } catch (error) {
    console.error("POST /user error >> ", error);
    return next(error);
  }
});

// 로그인한 유저 회원탈퇴 - by 1-blue
router.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    await User.destroy({ where: { _id: req.user._id } });

    req.logout();
    req.session.destroy();
    res
      .status(200)
      .clearCookie("session-cookie")
      .json({ message: "회원탈퇴에 성공하셨습니다.\n강제로 로그아웃되며 회원가입페이지로 이동합니다." });
  } catch (error) {
    console.error("DELETE /user error >> ", error);
    return next(error);
  }
});

module.exports = router;
