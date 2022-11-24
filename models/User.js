const { Schema, model } = require('mongoose');

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
            validator: validateEmail(this.email),
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

})

userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length
    })

const User = model('user', userSchema);

module.exports = User;