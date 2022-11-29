const { User, Thought, Reaction } = require('../models');

module.exports = {

    //Get all Thoughts
    getAllThoughts(req, res){
        Thought.find()
        .select('-__v')
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
                    return
                }else{
                    username = thought.username
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
                res.status(500)
            })
    },

    //create reaction and store by thoughtId
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $push: { reactions: req.body}},
            { new: true, runValidators: true}
        )
        .then((thought) => {
            if(!thought){
                res.status(404).json({message: 'no thought with that id found'})
            }else{
                res.status(200).json(thought)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: {reactions: {reactionId: req.body.reactionId}}},
            {new: true}
        )
        .then((thought) => {
            if(!thought){
                res.status(404).json({message: 'no thought with this ID found'})
            }else{
                res.status(200).json(thought)
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}