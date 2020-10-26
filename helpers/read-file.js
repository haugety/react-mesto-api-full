const fsPromises = require('fs').promises;

const getJsonFromFile = (path) => fsPromises.readFile(path, { encoding: 'utf8' })
  .then((data) => JSON.parse(data));

module.exports = {
  getJsonFromFile,
};
