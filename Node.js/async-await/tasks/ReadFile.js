const fs = require('fs').promises;
/*
async function readFileContent() {
  const content = await fs.readFile('data.txt', 'utf8');
  console.log("Содержимое файла:", content);
}
readFileContent();
*/

async function readFileContent() {
  try {
    const content = await fs.readFile('data.txt', 'utf8');
    console.log("Содержимое файла:", content);
  } catch (error) {
    console.error("Ошибка при чтении файла:", error.message);
  }
}
readFileContent();

module.exports = readFileContent;