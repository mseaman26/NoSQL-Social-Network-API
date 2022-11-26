const router = require('express').Router();

const {
    createThought,
    deleteThought
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').post(createThought).delete(deleteThought)

module.exports = router;