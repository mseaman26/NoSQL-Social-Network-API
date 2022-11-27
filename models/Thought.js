const { Schema, model, Types } = require('mongoose');
// const reactionSchema = require('./Reaction')
const { format_time, format_date } = require('../utils/dateTime')

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (val) => format_date(val)
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
)

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
        get: (val) => format_date(val)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
    
},
{
    toJSON:{
        virtuals: true,
        getters: true,
    }

})

thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length
    })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;