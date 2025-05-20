// Сохрани имя пользователя из формы в файл

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 
            'Content-Type': 'text/html; charset=utf-8'  // Добавляем кодировку
        });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">  <!-- Дублируем в HTML -->
          </head>
          <body>
              <form method="POST" action="/save">
                <input type="text" name="name" placeholder="Ваше имя" />
                <button type="submit">Сохранить</button>
              </form>
          </body>
          </html>
        `);
    }

    if (req.method === 'POST' && req.url === '/save') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const parsed = querystring.parse(body);
            fs.appendFile('users.txt', parsed.name + '\n', 'utf8', err => {  // Явно указываем кодировку
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>Ошибка при сохранении</h1>');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`<h1>${parsed.name} сохранён!</h1>`);
            });
        });
    }
});

server.listen(3000, () => console.log('Сервер на http://localhost:3000'));
