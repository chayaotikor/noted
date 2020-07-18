const {Schema, model} = require('mongoose');
const autopopulate = require('mongoose-autopopulate')

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    textBody: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:  'User',
        autopopulate:true
    }
}, {timestamps: true})

noteSchema.plugin(autopopulate);

module.exports = model('Note', noteSchema)
