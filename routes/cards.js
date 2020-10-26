const router = require('express').Router();
const {
  getCards,
  createCard,
  removeCard,
  putLike,
  removeLike,
} = require('../controllers/cards');
const { notFound } = require('../helpers/status-handlers');

router.get(
  '/cards/:char',
  (req, res) => {
    notFound(res);
  },
);

router.delete(
  '/cards/:_id',
  removeCard,
);

router.get(
  '/cards',
  getCards,
);

router.post(
  '/cards',
  createCard,
);

router.put(
  '/cards/:_id/likes',
  putLike,
);

router.delete(
  '/cards/:_id/likes',
  removeLike,
);

module.exports = {
  cardRouter: router,
};
