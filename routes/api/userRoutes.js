const router = require('express').Router();

const { 
    getUsers, 
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

// /api/users
router.route('/').get(getUsers).post(createUser)

// /apu//users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser)
    .delete(deleteUser)
module.exports = router;