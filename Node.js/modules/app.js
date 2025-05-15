// Импорты модулей
const scanDir = require('./dirScanner')
const analyzePath = require('./analyzePath')
const systemInfo = require('./systemInfo')
const timeServer = require('./timeServer')
const hashPassword = require('./hashExemple')

// Примеры использования
scanDir('./')
console.log(analyzePath('./dirScanner.js'));
console.log(hashPassword('qwerty123'))

// 
const logger = require('./logger');

// Подписываемся на событие "logged"
// Когда log() будет вызван, этот обработчик отработает
logger.on('logged', (data) => {
    console.log(`[EVENT] Сообщение было залогировано: "${data.message}" в ${data.timestamp}`);
});

// Вызов логгера
logger.log('Привет из логгера!');