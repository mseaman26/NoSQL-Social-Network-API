const { User, Thought } = require('../models');

module.exports = {

    //create new thought
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
        } 
    
}