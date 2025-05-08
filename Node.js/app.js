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
