const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  updateReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts => GET all thoughts.
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:ThoughtId => GET / UPDATE / DELETE thought by ID.
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:userId => CREATE thought under User ID
router.route('/:userId').post(createThought);

// /api/thoughts/:thoughtId/reactions => CREATE reaction.
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId' => UPDATE / DELETE reaction
router.route('/:thoughtId/reactions/:reactionId').put(updateReaction).delete(deleteReaction);

module.exports = router;
