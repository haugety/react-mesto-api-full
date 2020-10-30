const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Ссылка имеет неправильный формат',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  name: {
    type: String,
    default: 'Kianu Rivz',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'You are breathtaking!',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://memepedia.ru/wp-content/uploads/2019/06/malenkiy-kianu-rivz-4.jpg',
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Ссылка имеет неправильный формат',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
