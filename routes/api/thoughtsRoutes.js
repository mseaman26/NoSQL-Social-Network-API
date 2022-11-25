const router = require('express').Router();

const {
    createThought,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').post(createThought)

module.exports = router;