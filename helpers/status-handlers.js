const internalServerError = (res) => {
  res
    .status(500)
    .send({ message: 'Internal Server Error' });
};

const httpOk = (res, data) => {
  res
    .status(200)
    .send(data);
};

const notFound = (res, error = 'Запрашиваемый ресурс не найден') => {
  res
    .status(404)
    .send({ message: error });
};

const badRequest = (res) => {
  res
    .status(400)
    .send({ message: 'Переданы некорректные данные' });
};

module.exports = {
  internalServerError,
  httpOk,
  notFound,
  badRequest,
};
