const http = require('http');

http.createServer((req, res) => {
  console.log('Получен запрос');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK\n');
}).listen(3000, () => {
  console.log('🛡️ Сервер ожидает атаки на http://localhost:3000');
});