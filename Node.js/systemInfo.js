// Задача: Вывести ключевую информацию о системе.
const os = require('os');

console.log(`
Платформа: ${os.platform()}
Архитектура: ${os.arch()}
Память: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
Свободно: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB
Процессоры: ${os.cpus().length}
Домашняя папка: ${os.homedir()}
`);