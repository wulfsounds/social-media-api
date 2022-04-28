const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thought => GET all thoughts.
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:ThoughtId => GET / UPDATE / DELETE thought by ID.
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/:userId => CREATE thought under User ID
router.route('/:userId').post(createThought);

// /api/thought/:thoughtId/reaction => CREATE reaction.
router.route('/:thoughtId/reaction').post(createReaction);

// /api/thought/:thoughtId/reaction/:reactionId' => DELETE reaction
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
