require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");

const db = require("./models");
const passportConfig = require("./passport");

const dist = path.join(__dirname, "..", "frontend", "dist");
const app = express();
app.set("PORT", process.env.NODE_ENV === "production" ? 80 : 3000);

try {
  fs.accessSync(path.join(__dirname, "public"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public"));
}

try {
  fs.accessSync(path.join(__dirname, "public", "images"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public", "images"));
}

// sequelize connect
db.sequelize
  .sync({ force: true, alter: false })
  .then(() => console.log("DB 연결 성공!"))
  .catch(error => console.error("DB 연결 실패 >> ", error));

// passport connect
passportConfig();

// middleware
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", express.static(dist));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    name: "session-cookie",
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new FileStore(),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// 실행 환경에 따른 미들웨어 등록
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: [process.env.CLIENT_URL],
    }),
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:8080",
    }),
  );
}

// router 등록
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use("/image", require("./routes/image"));

// 실행 환경에 따라 다르게 처리
if (process.env.NODE_ENV === "production") {
  // webpack-dev-server의 historyFallback 대체
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: dist });
  });
} else {
  // 404 에러처리 미들웨어
  app.use((req, res, next) => {
    console.log("404 에러처리 미들웨어");
    res.status(404).send("404");
  });
}

// 에러처리 미들웨어
app.use((error, req, res, next) => {
  console.error("에러처리 미들웨어 >>", error);
  res.status(500).json({ error: "Error" });
});

app.listen(app.get("PORT"), console.log(`${app.get("PORT")}번 대기중`));
