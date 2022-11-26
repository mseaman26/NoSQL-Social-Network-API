const router = require('express').Router();

const {
    createThought,
    deleteThought,
    getAllThoughts,
    getThoughtById,
    updateThoughtById
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').post(createThought).delete(deleteThought).get(getAllThoughts)

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById)

module.exports = router;