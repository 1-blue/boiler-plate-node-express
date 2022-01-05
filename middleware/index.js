const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "로그인후에 접근이 가능합니다." });
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "로그아웃후에 접근이 가능합니다." });
  }
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn
}