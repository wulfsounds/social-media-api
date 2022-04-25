const { Thought, User } = require('../models');

module.exports = {
  // Get all reactions
  getThoughts(req, res) {
    Thought.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'Thought and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Create a reaction
    createReaction(req, res) {
      Reaction.create(req.body)
        .then((reaction) => res.json(reaction))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  
    // Delete a reaction
    deleteReaction(req, res) {
      Reaction.findOneAndDelete({ _id: req.params.thoughtId })
        .then((reaction) =>
          !reaction
            ? res.status(404).json({ message: 'No reaction with that ID' })
            : User.deleteMany({ _id: { $in: reaction.user } })
        )
        .then(() => res.json({ message: 'Reaction and user deleted!' }))
        .catch((err) => res.status(500).json(err));
    }
};