const { Schema } = require('mongoose');

const reactionSchema = new Schema ({
    reactionID: {
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
        //TODO: figure out time formatting on query
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
)

module.exports = reactionSchema