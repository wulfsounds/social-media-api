const { User, Thought } = require("../models");

module.exports = {
	// Get all users
	async getUsers(req, res) {
		await User.find()
			.select("-__v")
			.then(async (users) => {
				const userObj = { users };
				return res.json(userObj);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},

	// Get a single user
	async getSingleUser(req, res) {
		await User.findOne({ _id: req.params.userId })
			.populate({ path: "thoughts" })
			.populate({ path: "friends" })
			.select("-__v")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that ID" })
					: res.json({ user })
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},

	// create a new user
	async createUser({ body }, res) {
		await User.create(body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},

	// Update a user
	async updateUser(req, res) {
		await User.updateOne(
			{ _id: req.params.userId }, 
			{ $set: req.body }, 
			{runValidators: true, new: true})
			.then((user) => res.json({ user }))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},

	// Delete a user and remove them from the thought
	async deleteUser({ params }, res) {
		await User.findOneAndRemove({ _id: params.id })
		await Promise.all(user.thought.map((thought) => 
			Thought.findOneAndDelete({ _id: thought })))
				.then((user) =>
					!user
						? res.status(404).json({ message: "No such user exists" })
						: Thought.findOneAndUpdate(
								{ users: req.params.userId },
								{ $pull: { users: req.params.userId } },
								{ new: true }))
				.then((thought) =>
					!thought
						? res.status(404).json({
								message: "User deleted, but no thoughts found",
						})
						: res.json({ message: "User successfully deleted" }))
				.catch((err) => {
					console.log(err);
					res.status(500).json(err);
			}
		);
	},

	// Add Friend
	addFriend(req, res) {
		User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends:  req.params.friendId } },
				{ runValidators: true, new: true })
				.then((user) => res.json(user))
				.catch((err) => {
					console.log(err);
					return res.status(500).json(err);
				});
		},

	// Delete Friend
	removeFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ runValidators: true, new: true })
			// .populate({ path: "friends", select: "-__v" })
			// .select("-__v")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No such user exists" })
					: res.json({ user })
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			}
		);
	}
};
