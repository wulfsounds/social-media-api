const { Thought, User } = require('../models');

module.exports = {
  // Get all reactions
  async getThoughts(req, res) {
    await Thought.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  async getSingleThought(req, res) {
    await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThought(req, res) {
    await Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  async deleteThought(req, res) {
    await Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'Thought and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  async updateThought(req, res) {
    await Thought.findOneAndUpdate(
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
    async createReaction({ params, body }, res) {
      await Thought
        .findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { runvalidators: true, new: true })
        .populate({ path: 'reaction', slect: '-__v' })
        .select('-__v')
        .then((reaction) => res.json(reaction))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  
    // Delete a reaction
    async deleteReaction(req, res) {
      await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((reaction) =>
          !reaction
            ? res.status(404).json({ message: 'No reaction with that ID' })
            : User.deleteMany({ _id: { $in: reaction.user } })
        )
        .then(() => res.json({ message: 'Reaction and user deleted!' }))
        .catch((err) => res.status(500).json(err));
    }
};