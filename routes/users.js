const router = require('express').Router();
const { validateUpdateUser, validateUpdateAvatar } = require('../middlewares/requestValidation');

const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.get(
  '/users/:_id/:char',
  (req, res, next) => {
    next(new NotFoundError('Запрашиваемые данные отсутствуют'));
  },
);

router.get(
  '/users/me',
  getUser,
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
  validateUpdateAvatar,
  updateAvatar,
);

router.patch(
  '/users/me',
  validateUpdateUser,
  updateUser,
);

module.exports = {
  userRouter: router,
};
