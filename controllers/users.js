const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  internalServerError,
  httpOk,
  notFound,
  badRequest,
} = require('../helpers/status-handlers');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getUsers = (req, res) => User.find({})
  .then((data) => {
    if (!data) {
      notFound(res, 'Запрашиваемые данные отсутствуют');
      return;
    }
    httpOk(res, data);
  })
  .catch(() => internalServerError(res));

const getUserById = (req, res) => User.findOne({ _id: req.params._id })
  .orFail(new Error('NotValidId'))
  .then((user) => httpOk(res, user))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'NotValidId') {
      notFound(res, 'Данного пользователя нет в базе');
    } else {
      internalServerError(res);
    }
  });

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then(() => httpOk(res, { message: 'Вы успешно зарегистрировались!' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        badRequest(res);
      } else {
        internalServerError(res);
      }
    });
};

const updateUser = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { name: req.body.name, about: req.body.about },
  { new: true, runValidators: true },
)
  .orFail(new Error('NotValidId'))
  .then((user) => httpOk(res, user))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'NotValidId') {
      notFound(res, 'Данного пользователя нет в базе');
    } else if (err.name === 'ValidationError') {
      badRequest(res);
    } else {
      internalServerError(res);
    }
  });

const updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true },
)
  .orFail(new Error('NotValidId'))
  .then((user) => httpOk(res, user))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'NotValidId') {
      notFound(res, 'Данного пользователя нет в базе');
    } else if (err.name === 'ValidationError') {
      badRequest(res);
    } else {
      internalServerError(res);
    }
  });

module.exports = {
  getUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  updateAvatar,
};
