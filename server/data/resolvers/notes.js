const { seedingFunction } = require("../models/seeding");
const Note = require("../models/note");
const User = require("../models/user");
const errorHandler = require("../../config/errorHandler");
const responseStatus = require("../../config/responseStatuses");

module.exports = {
  getAllNotes: async ({userId}) => {
    // seedingFunction()
    try {
      const notes = await Note.find({createdBy: userId}).sort({ updatedAt: 'desc'});
      return notes.map((note) => {
        return { ...note._doc };
      });
    } catch (err) {
      errorHandler(err);
    }
  },

  getNote: async ({noteId}) => {

    try {
      const note = await Note.findOne({ _id: noteId });
      if(!note){
        errorHandler(responseStatus.noteNotFound);
      }
      return {...note._doc}
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
    try {
      const newNote = await noteContent.save();
      const user = await User.findById(userId);
      if (!user) {
        errorHandler(responseStatus.userNotFound);
      }
      user.createdNotes.push(newNote);
      await user.save();

      return { ...newNote._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  editNote: async ({content, noteId}) => {
    try {
      const note = await Note.findOne({ _id: noteId });
      if(!note){
        errorHandler(responseStatus.noteNotFound);
      } else {
        if(content.title){
          note.title = content.title
        }
        if(content.textBody){
          note.textBody = content.textBody
        }
        await note.save()
        return { ...note._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },

  deleteNote: async ({noteId, userId}) => {
    try {
      const note = await Note.findOne({ _id: noteId });
      const user = await User.findById(userId);

      if(!note){
        errorHandler(responseStatus.noteNotFound);
      } else if(!user) {
        errorHandler(responseStatus.userNotFound);
      } else {
        note.remove()
        await user.save()
        return {...user._doc}
      }
    } catch (err) {
      errorHandler(err);
    }
  }

};
