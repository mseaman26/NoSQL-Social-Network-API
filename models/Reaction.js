const { Schema } = require('mongoose');
const { format_time, format_date } = require('../utils/dateTime')

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

module.exports = reactionSchema