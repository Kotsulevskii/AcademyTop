// Отправка формы методом POST

const http = require('http');
const fs = require('fs');
const querystring = require('querystring'); // Для разбора тела запроса

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => body += chunk); // Собираем тело запроса
        req.on('end', () => {
            const parsed = querystring.parse(body); // Парсим name=value
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Привет, ${parsed.name}!</h1>`);
        });
    }
});

server.listen(3000, () => console.log('Форма доступна на http://localhost:3000'));
