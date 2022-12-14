const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

//function that uses regex to check for valid email format.  Will be used in userSchema as a validator
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: validateEmail,
            message: 'this is not a valid email'
        }
        
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
},
{
    toJSON: {
        virtuals: true,
    }
})

userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length
    })

const User = model('User', userSchema);

module.exports = User;