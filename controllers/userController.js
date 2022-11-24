const { User, Thought } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res){
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((user) => {
            if(!user){
                res.status(404).json({ message: 'user not found'})
            }else {
                res.json(user)
            }
        })
    },

    //create single user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    // delete single user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) => {
                if(!user){
                    res.status(404).json({ message: 'cannot fine user'})
                }else{
                    Thought.deleteMany({ _id: {
                        $in:user.thoughts
                    }})
                }
            })
            .then(() => res.json({ message: 'user and all associated thoughts have been deleted!'}))
            .catch(() => res.status(500).json(err))
    }
}