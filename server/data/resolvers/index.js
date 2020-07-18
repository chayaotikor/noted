const bcrypt = require("bcryptjs");
const { generateToken } = require("../../middleware/tokenMiddleware");
const {seedingFunction} = require('./seeding')
const Note = require("../models/note");
const User = require("../models/user");

module.exports = {
  notes: async () => {
    // seedingFunction()

    try {
      const notes = await Note.find();
      return notes.map((note) => {
        return { ...note._doc };
      });
    } catch (err) {
      throw err;
    }
  },
  addNote: async (note) => {
    const noteContent = new Note({
      title: note.content.title,
      textBody: note.content.textBody,
      createdBy: "5f10ceaef64f4a5500f29b43",
    });

    try {
      const newNote = await noteContent.save();
      const user = await User.findById("5f10ceaef64f4a5500f29b43");
      if (!user) {
        throw new Error("User not found.");
      }

      user.createdNotes.push(newNote._doc);
      return {...newNote._doc};
    } catch (err) {
      throw err;
    }
  },
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
      const token = generateToken({ ...newUser._doc });

      return { ...newUser._doc, password: null, token };
    } catch (err) {
      throw err;
    }
  },
};
