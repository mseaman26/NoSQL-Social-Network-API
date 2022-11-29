
# NoSQL-Social-Network-API

  ## Description
    This project is a back-end for a social media site.  It utilizes MongoDB/Mongoose to create a database and models. Various cotrollers and routes allow the data to be added, retrieved, uptated, and deleted.  This data includes schemas and models for Users, their thoughts (posts), and reactions to those thoughts (comments). All of the routes and their functionality are demonstrated in the video that is linked below. 

    https://youtu.be/OrUoTL_nuFo 

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Table of Contents
  * [Technologies Used](#technologies-used)
  * [Code Snippets](#code-snippets)<br />
  * [Usage](#usage)<br />
  * [Contributing to This Repository](#how-to-contribute-to-this-repository)<br />
  * [Questions](#questions)<br />

  ## Overview of the application
<img src="./public/assets/Overview.gif">

  ## Technologies Used
  - MongoDB
  - Mongoose
  - JavaScript
  - Express
  - Nodemon 
  - Insomnia

  ## Notable Methods Used
  - Creating schemas and models with Mongoose
  - Creating subdoccument schemas
  - Using Mongoose model methods, such as findOneAndUpate, create, and more
  - Using MongoDB methods such as $push, $addToSet, and more
  - Modularizing route functionality into controller files
  - Testing routes with insomnia

  ## Code Snippets
Here is an example of a MongoDB schema.  This particular schema, "userSchema", has a couple notable features.  First off, a function called validateEmail is declared and uses regex to check for a proper email format pattern within a string.  That function is used within the User schema as a validator, to ensure that the "emai" field of the schema is properly filled in by the user. This schema has a "friends" field, which references the corresponding model for "User."  This allows a User to have a list of friends that refer to other Users.  Finaly, we have a virtual function declared near the bottom that returns the total number of friends that a particular user has. 
```javascript
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
```
Here we have a controller that provides the functionality for deleting a user.  First, the user is found by the id provided in the query parameters and deleted.  After that, the user's associated thoughts are deleted.  This is done by using "Thought.deleteMany" to delete all of the thoughts that are in ($in) the user's "thoughts" field.
```javascript
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId},
            )
            .then((user) => {
                if(!user){
                    res.status(404).json({ message: 'cannot find user'})
                    return
                }
                return Thought.deleteMany({ _id: {
                    $in:user.thoughts
                }})
            })
            .then((user) => {
                console.log(user)
                res.json({ message: 'user and all associated thoughts have been deleted!'})})
            .catch((err) => res.status(500).json(err))
    },
```
  ## Usage

This is an open-source project.  Feel free to clone down the repository at: <br>
<a href = "https://github.com/mseaman26/NoSQL-Social-Network-API">https://github.com/mseaman26/NoSQL-Social-Network-API</a><br>
After doing so, navigate in your terminal to the root folder of the project and run "npm i." Activate the server by running "npm run watch" to get nodemon running.  Begin testing routes in Insomnia
  ## Questions
If you have any questions about this project, feel free to reach out me at:<br>
  <a href="MSeaman26@gmail.com">MSeaman26@gmail.com</a><br/>


    

