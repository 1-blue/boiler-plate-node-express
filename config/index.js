require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
    freezeTableName: true,
  },
  test: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
    freezeTableName: true,
  },
  production: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
    freezeTableName: true,
  },
};
