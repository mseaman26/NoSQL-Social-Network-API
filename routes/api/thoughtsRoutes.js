const router = require('express').Router();

const {
    createThought,
    deleteThought,
    getAllThoughts
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').post(createThought).delete(deleteThought).get(getAllThoughts)

module.exports = router;