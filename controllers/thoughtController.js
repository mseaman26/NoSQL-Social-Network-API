const { User, Thought } = require('../models');

module.exports = {

    //create new thought
    createThought(req, res) {
        Thought.create(req.body)
        
            .then((thought) => res.json(thought))
            .then((thought) => User.findOneAndUpdate(
                
                {username: req.body.username},
                { $addToSet: {thoughts: req.body._id}}
            )) 
            .catch((err) => res.status(500).json(err))   
    }
}