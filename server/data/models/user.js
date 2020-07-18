const { Schema, model } = require("mongoose");
const autopopulate = require('mongoose-autopopulate')

userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdNotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
      autopopulate:true
    },
  ],
});
userSchema.plugin(autopopulate);


module.exports = model("User", userSchema);
