const router = require('express').Router();

const {
    createThought,
    deleteThought,
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    createReaction
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').post(createThought).delete(deleteThought).get(getAllThoughts)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById)

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtId/reactions').post(createReaction)
module.exports = router;