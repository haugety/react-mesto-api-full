const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    default: 'https://lh3.googleusercontent.com/proxy/QPY02mmgN2Rt13e0ruAuo_JCcc47iMrEMnn6w9aTvTbrPB_zKFHGjmmcgfXvfqRhK9HRV-Z_OPDNuP-Squ11uIMPUJADR0t2MbvluVV2H7L4kWo6dImwDLr5iPQN7HvGAaCCmy5ELQlTIrXWuXKVVdafomY1wOkYvosI_NmSnjfyP3YlNpQWL5ulmZ7sop7heYZxZwybYMA9KwjgfDBtHg6CkIOMuYySMV3QH5MApA22WWnMMc6f5Zk',
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Ссылка имеет неправильный формат',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
