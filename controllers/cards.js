const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => Card.find({})
  .then((data) => {
    if (!data) {
      throw new NotFoundError('Запрашиваемые данные отсутствуют');
    }
    res.status(200).send(data.reverse());
  })
  .catch(next);

const createCard = (req, res, next) => Card.create({
  owner: req.user._id,
  name: req.body.name,
  link: req.body.link,
})
  .then((card) => res.status(200).send(card))
  .catch(next);

const removeCard = (req, res, next) => Card.findById(req.params._id)
  .orFail(new NotFoundError('Данной карточки нет в базе'))
  .then((card) => {
    if (req.user._id.toString() === card.owner.toString()) {
      card.remove();
      res.status(200).send(card);
    } else {
      throw new ForbiddenError('Доступ запрещен');
    }
  })
  .catch(next);

const putLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Данной карточки нет в базе'))
  .then((card) => res.status(200).send(card))
  .catch(next);

const removeLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Данной карточки нет в базе'))
  .then((card) => res.status(200).send(card))
  .catch(next);

module.exports = {
  getCards,
  createCard,
  removeCard,
  putLike,
  removeLike,
};
