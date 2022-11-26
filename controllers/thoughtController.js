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

    //get thought by id
    getThoughtById(req, res) {
        Thought.findById(req.params.thoughtId)
        .then((thought) => {
            if(!thought){
                res.status(404).json('sorry that thought cannot be found')
            }else{
                res.status(200).json(thought)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
     //update thought by id
     updateThoughtById(req, res){
        Thought.findByIdAndUpdate(req.params.thoughtId,
            { $set: req.body},
            { runValidators: true, new: true }
        )
        .then((thought) => {
            if(!thought){
                res.status(404).json('sorry that thought cannot be found')
            }else{
                res.status(200).json(thought)
            }
        })
    },

    //create new thought 
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
                
            })
            .then(() => res.json({message: 'thought has been created and added'})) 
            .catch((err) => {
                console.log
                res.status(500).json(err)}) 
        },
    
   
        //delete thought by id
    deleteThought (req, res){
        let username
        Thought.findByIdAndDelete({_id: req.body._id})
            .then((thought) => {
                
                if(!thought){
                    res.status(404).json({ message: 'cannot find thought'})
                }else{

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