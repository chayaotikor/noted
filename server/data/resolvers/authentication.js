const bcrypt = require("bcryptjs");
const { generateToken } = require("../../middleware/tokenMiddleware");
const User = require("../models/user");

module.exports = {
  register: async (user) => {
    try {
      const previousUser = await User.findOne({
        email: user.credentials.email,
      });
      if (previousUser) {
        throw new Error("User already exists.");
      }

      const hashed = await bcrypt.hash(user.credentials.password, 14);
      const userCreds = new User({
        email: user.credentials.email,
        password: hashed,
      });

      const newUser = await userCreds.save();
      const token = generateToken({ ...newUser });

      return { ...newUser._doc, token };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const correctCreds = await bcrypt.compareSync(password, user.password);

      if (!correctCreds) {
        throw new Error("Invalid Credentials.");
      }
      const token = generateToken({ ...user});

      return { ...user._doc, token };
    } catch (err) {
      throw err;
    }
  },
};
