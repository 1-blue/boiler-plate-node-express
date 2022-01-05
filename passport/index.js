const passport = require("passport");
const passportLocalConfig = require("./local");

const { User } = require("../models");

const passportConfig = () => {
  passport.serializeUser(({ user }, done) => {
    done(null, { _id: user._id });
  });

  passport.deserializeUser(async ({ _id }, done) => {
    try {
      const user = await User.findOne({ where: { _id } });
      done(null, user);
    } catch (error) {
      console.error("deserializeUser error >> ", error);
      done(error);
    }
  });

  passportLocalConfig();
};

module.exports = passportConfig;
