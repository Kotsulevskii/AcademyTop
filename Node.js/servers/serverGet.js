// Обработка GET-параметров (поиск)

const http = require('http');
const url = require('url'); // Модуль для разбора URL и query-строки

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/search') {
        const term = parsedUrl.query.q;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Вы искали: ${term}`);
    } else {
        res.writeHead(404);
        res.end('Не найдено');
    }
});

server.listen(3000, () => console.log('Поиск на http://localhost:3000/search?q=что-то'));
