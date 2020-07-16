const {Schema, model} = require('mongoose');

userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdNotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

module.exports = model('User', userSchema)