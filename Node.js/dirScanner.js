// Задача: Написать модуль dirScanner.js, который выводит список всех файлов в указанной папке (включая подпапки).
const fs = require('fs');
const path = require('path');

function scanDir(dirPath, indent = '') {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${item}`);
      scanDir(fullPath, indent + '  '); // Рекурсия для подпапок
    } else {
      console.log(`${indent}📄 ${item}`);
    }
  });
}

module.exports = scanDir;
