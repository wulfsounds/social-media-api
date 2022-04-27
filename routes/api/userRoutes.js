const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user => CREATE user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId => GET single user / UPDATE user / DELETE user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends => ADD Friend
// router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/friends/:friendId => DELETE friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
