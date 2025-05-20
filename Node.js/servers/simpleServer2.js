//Отдача HTML-файла

const http = require('http');
const fs = require('fs'); // Модуль для чтения файлов

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Ошибка сервера');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' }); // Указываем HTML
            res.end(data); // Отправляем содержимое index.html
        });
    } else {
        res.writeHead(404);
        res.end('Страница не найдена');
    }
});

server.listen(3000, () => console.log('Сервер на http://localhost:3000'));
