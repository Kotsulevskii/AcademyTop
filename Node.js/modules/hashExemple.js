// Задача: Создать хеш SHA-256 от строки.
const crypto = require('crypto');

function hashPassword(password, salt = 'secret-salt') {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

module.exports = hashPassword
