// Задача: Создать сервер, который возвращает текущее время.
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<h1>Текущее время: ${new Date().toLocaleTimeString()}</h1>`);
});

server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});