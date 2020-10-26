const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { notFound } = require('../helpers/status-handlers');

router.get(
  '/users/:_id/:char',
  (req, res) => {
    notFound(res);
  },
);

router.get(
  '/users/:_id',
  getUserById,
);

router.get(
  '/users',
  getUsers,
);

router.patch(
  '/users/me/avatar',
  updateAvatar,
);

router.patch(
  '/users/me',
  updateUser,
);

module.exports = {
  userRouter: router,
};
