const fs = require('fs').promises;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function logMessage(message) {
  await delay(500);
  await fs.appendFile('log.txt', message + '\n');
  console.log('Записано:', message);
}

async function runLogger() {
  await logMessage("Первое сообщение");
  await logMessage("Второе сообщение");
  await logMessage("Третье сообщение");
}

module.exports = runLogger