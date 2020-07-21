const bcrypt = require("bcryptjs");
const { generateToken } = require("../../middleware/tokenMiddleware");
const User = require("../models/user");
const responseStatus = require("../../config/responseStatuses");
const errorHandler = require("../../config/errorHandler");


module.exports = {
  register: async (user) => {
    try {
      const previousUser = await User.findOne({
        email: user.credentials.email,
      });
      if (previousUser) {
        errorHandler(responseStatus.conflict);
      }

      const hashed = await bcrypt.hash(user.credentials.password, 14);
      const userCreds = new User({
        email: user.credentials.email,
        password: hashed,
      });

      const newUser = await userCreds.save();
      const token = generateToken({ ...newUser });

      return { ...newUser._doc, token, tokenExpiration: 1 };
    } catch (err) {
      errorHandler(err);
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        errorHandler(responseStatus.badCredentials);
      }
      const correctCreds = await bcrypt.compareSync(password, user.password);

      if (!correctCreds) {
        errorHandler(responseStatus.badCredentials);
      }
      const token = generateToken({ ...user });

      return { ...user._doc, token, tokenExpiration: 1 };
    } catch (err) {
      errorHandler(err);
    }
  },
};
