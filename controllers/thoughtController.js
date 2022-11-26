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
                console.log(thought._id)
                User.findOneAndUpdate(
                
                {username: req.body.username},
                { $addToSet: {
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
        Thought.findByIdAndDelete({_id: req.body._id})
            .then((thought) => {
                if(!thought){
                    res.status(404).json({ message: 'cannot find thought'})
                }else{
                    //TODO:
                }
            })
            .then(() => res.json({ message: 'thought has been deleted'}))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}