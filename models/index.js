require("dotenv").config();
const Sequelize = require("sequelize");
const config = require("../config")[process.env.NODE_ENV];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 테이블 불러오기
const User = require("./user");
const Post = require("./post");

// db에 테이블 등록
db.User = User(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);

// associate
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
