const router = require('express').Router();

const {
    createThought,
    deleteThought,
    getAllThoughts,
    getThoughtById
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').post(createThought).delete(deleteThought).get(getAllThoughts)

router.route('/:thoughtId').get(getThoughtById)

module.exports = router;