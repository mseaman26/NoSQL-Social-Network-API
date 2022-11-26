const { User, Thought } = require('../models');

module.exports = {

    //Get all Thoughts
    getAllThoughts(req, res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    //create new thought TODO: still not adding to array
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) =>  {
                return User.findOneAndUpdate(
                
                {username: req.body.username},
                { $push: {
                    thoughts:
                    thought._id
                },
                }
                // { runValidators: true, new: true }
                
                )
                res.json(thought)
            }) 
            .catch((err) => {
                console.log
                res.status(500).json(err)}) 
        },
    
        //delete thought
    deleteThought (req, res){
        let username
        Thought.findByIdAndDelete({_id: req.body._id})
            .then((thought) => {
                
                if(!thought){
                    //TODO: uncomment this code when thought array and thought data match
                    // res.status(404).json({ message: 'cannot find thought'})
                }else{
                    //TODO:
                    username = thought.username
                    console.log(username)
                }
            })
            .then(() => {
                User.findOne({username: username})
                    .then((user) => {
                        console.log(user)
                        if(!user){
                            console.log('could not find user')
                        }else{
                            return user.update(
                                { $pull: {thoughts: req.body._id}}
                            )
                        }
                    })
            })
            .then(() => res.json({ message: 'thought has been deleted'}))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}