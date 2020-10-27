const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) {
        return helpers.error('Невалидная ссылка');
      }
      return value;
    }),
  }),
});

const validateRemoveCard = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) {
        return helpers.error('Невалидная ссылка');
      }
      return value;
    }),
  }),
});

const validateLikeOnCard = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCreateCard,
  validateRemoveCard,
  validateLikeOnCard,
};
