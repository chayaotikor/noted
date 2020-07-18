const { seedingFunction } = require("../models/seeding");
const Note = require("../models/note");
const User = require("../models/user");

module.exports = {
  getAllNotes: async () => {
    // seedingFunction()
    try {
      const notes = await Note.find();
      return notes.map((note) => {
        return { ...note._doc, };
      });
    } catch (err) {
      throw err;
    }
  },

  getNote: async ({noteId}) => {
    try {
      const note = await Note.findOne({_id: noteId});
      return { ...note._doc };
    } catch (err) {
      throw err;
    }
  },

  addNote: async ({content, userId}) => {
    const noteContent = new Note({
      title: content.title,
      textBody: content.textBody,
      createdBy: userId
    });

    try {
      const newNote = await noteContent.save();
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found.");
      }
      user.createdNotes.push(newNote);
      await user.save()

      return { ...newNote._doc };
    } catch (err) {
      throw err;
    }
  },

};
