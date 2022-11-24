const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //TODO: figure out time formatting on query
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
})

thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;