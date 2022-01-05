import multer from "multer";

const router = require("express").Router();
const { isLoggedIn } = require("../middleware/index.js");

const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, path.join(__dirname, "public", "images"));
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);

    const filename = basename + "__" + new Date().getTime() + ext;

    done(null, filename);
  },
});
const limits = { fileSize: 20 * 1024 * 1024 };

const upload = multer({ storage, limits });

router.post("/", isLoggedIn, upload.array("images"), (req, res) => {
  const filenames = req.files.map(file => file.filename);

  res.status(201).json({ message: "이미지 생성에 성공하셨습니다.", images: filenames });
});

module.exports = router;
