//Простой сервер, который отвечает текстом

const http = require('http'); // Импортируем модуль http

const server = http.createServer((req, res) => {
    // req — запрос от клиента
    // res — ответ от сервера

    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Устанавливаем код ответа и тип контента
    res.end('Hello!'); // Отправляем текст клиенту и закрываем соединение
});

server.listen(3000, () => {
    console.log('Сервер работает на http://localhost:3000');
});
