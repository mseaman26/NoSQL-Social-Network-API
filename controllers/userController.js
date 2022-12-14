const { User, Thought } = require('../models');

module.exports = {
    //get all users
    getUsers(req, res){
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v',
          })
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

    //update single user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) => {
                if(!user){
                    res.status(404).json({ message: 'no user with that id found!'})
                }else{
                    res.json(user)
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    // delete single user
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

    //add friend to user's friend list
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId,},
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) => {
                if(!user){
                    res.status(404).json({ message: 'user not found'})
                }else{
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    //remove friend from user's friend list
    removeFriend(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => {
                if(!user){
                    res.status(404).json({ message: 'could not delete: user not found'})
                }else{
                    return user.update(
                        { $pull: {friends: req.params.friendId}},
                        { runValidators: true, new: true}
                    )
                }
            })
            .then(() => res.json({ message: 'friend successfully removed from friends list'}))
            .catch((err) => res.status(500).json)
    }
}