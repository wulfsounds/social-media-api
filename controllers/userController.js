const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
	// Get all users
	getUsers(req, res) {
		User.find()
			.then(async (users) => {
				const userObj = {
					users,
				};
				return res.json(userObj);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Get a single user
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.then(async (user) =>
				!user
					? res.status(404).json({ message: "No user with that ID" })
					: res.json({
							user,
							grade: await grade(req.params.userId),
					  })
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},
	// Delete a user and remove them from the thought
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: "No such user exists" })
					: Thought.findOneAndUpdate(
							{ users: req.params.userId },
							{ $pull: { users: req.params.userId } },
							{ new: true }
					  )
			)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message: "User deleted, but no thoughts found",
					  })
					: res.json({ message: "User successfully deleted" })
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Add Friend
	addFriend({ params }, res) {
		try {
			const user = User.findOneAndUpdate(
				{ _id: params.id },
				{ $pull: { friend: body.id } },
				{ new: true })
				.populate({ path: "friends", select: "-__v" })
				.select("-__v");
			if (!user) {
				res.status(500).json({ message: "User does not exist." });
				return;
			}

			res.json(user);
		} catch (err) {
			res.json(err);
		}
	},

  // Delete Friend
  removeFriend({ params }, res) {
    try {
      const user = User.findOneAndUpdate(
				{ _id: params.id },
				{ $pull: { friend: params.friendId } },
				{ new: true })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v");
      if (!user) {
				res.status(500).json({ message: "User does not exist." });
				return;
			}
			res.json(user);
		} catch (err) {
			res.json(err);
    }
  }
}
