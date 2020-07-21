const { seedingFunction } = require("../models/seeding");
const Note = require("../models/note");
const User = require("../models/user");
const errorHandler = require("../../config/errorHandler");
const responseStatus = require("../../config/responseStatuses");

module.exports = {
  getAllNotes: async (args, req) => {

    if (!req.decodedToken) {
      errorHandler(responseStatus.forbiddenAccess);
    }
    // seedingFunction()
    try {
      const notes = await Note.find();
      return notes.map((note) => {
        return { ...note._doc };
      });
    } catch (err) {
      errorHandler(err);
    }
  },

  getNote: async ({ noteId }, req) => {
    if (!req.decodedToken) {
      errorHandler(responseStatus.forbiddenAccess);
    }
    try {
      const note = await Note.findOne({ _id: noteId });
      return { ...note._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  addNote: async ({ content, userId }, req) => {
    const noteContent = new Note({
      title: content.title,
      textBody: content.textBody,
      createdBy: userId,
    });

    if (!req.decodedToken) {
      errorHandler(responseStatus.forbiddenAccess);
    }

    try {
      const newNote = await noteContent.save();
      const user = await User.findById(userId);
      if (!user) {
        errorHandler(responseStatus.notFound);
      }
      user.createdNotes.push(newNote);
      await user.save();

      return { ...newNote._doc };
    } catch (err) {
      errorHandler(err);
    }
  },
};
