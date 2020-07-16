const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    textBody: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:  'User'
    }
})

module.exports = model('Note', noteSchema)
