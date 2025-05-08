// Задача: Создать утилиту для анализа путей к файлам.
const path = require('path');

function analyzePath(filePath) {
  return {
    dirname: path.dirname(filePath),
    basename: path.basename(filePath),
    extname: path.extname(filePath),
    isAbsolute: path.isAbsolute(filePath)
  };
}

module.exports = analyzePath;