const EventEmitter = require('events');

// Создаём класс Logger, расширяющий возможности EventEmitter
class Logger extends EventEmitter {
    // Метод log получает сообщение
    log(message) {
        console.log(`[LOG] ${message}`);

        // Эмитируем (вызываем) событие "logged"
        // Можно передать любые данные: объект, строку, дату и т.д.
        this.emit('logged', {
            message,
            timestamp: new Date()
        });
    }
}

// Экспортируем экземпляр класса Logger
module.exports = new Logger();
