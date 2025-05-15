const fs = require('fs');
const { Transform } = require('stream');

// Создаём трансформирующий поток
// Он получает данные, делает буквы заглавными и передаёт дальше
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        // chunk — это часть файла (например, 64 КБ)
        const transformed = chunk.toString().toUpperCase();

        // Передаём преобразованные данные дальше по цепочке
        this.push(transformed);

        // Сообщаем, что обработка закончена
        callback();
    }
});



// Чтение из log.txt
const input = fs.createReadStream('log.txt', 'utf8');

// Запись в log-uppercase.txt
const output = fs.createWriteStream('log-uppercase.txt');


module.exports = upperCaseTransform, input,output
// Соединяем потоки: input → трансформация → output
input.pipe(upperCaseTransform).pipe(output);
