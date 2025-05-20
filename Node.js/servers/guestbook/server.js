const http = require('http');const fs = require('fs');const path = require('path');const querystring = require('querystring');

// Путь к файлу с сообщениями
const messagesFile = path.join(__dirname, 'data', 'messages.txt');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Отдаём HTML-форму
        const formPath = path.join(__dirname, 'views', 'form.html');
        fs.readFile(formPath, 'utf-8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }

    else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const parsed = querystring.parse(body);
            const line = `${new Date().toLocaleString()} | ${parsed.name}: ${parsed.message}\n`;

            // Добавляем сообщение в файл
            fs.appendFile(messagesFile, line, 'utf-8', err => {
                if (err) {
                    res.writeHead(500);
                    res.end('Ошибка при сохранении');
                    return;
                }

                res.writeHead(302, { Location: '/messages' }); // редирект
                res.end();
            });
        });
    }

    else if (req.method === 'GET' && req.url === '/messages') {
        // Читаем шаблон и файл с сообщениями
        const messagesPath = path.join(__dirname, 'views', 'messages.html');
        const contentPath = messagesFile;

        fs.readFile(messagesPath, 'utf-8', (err, htmlTemplate) => {
            fs.readFile(contentPath, 'utf-8', (err2, messageData) => {
                const items = messageData
                    .split('\n')
                    .filter(Boolean)
                    .map(msg => `<li>${msg}</li>`)
                    .join('\n');

                const finalHtml = htmlTemplate.replace('{{messages}}', items);

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(finalHtml);
            });
        });
    }

    else if (req.method === 'GET' && req.url === '/stop') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Сервер остановлен');
        server.close(() => {
            console.log('Сервер остановлен вручную');
        });
    }

    else {
        res.writeHead(404);
        res.end('Страница не найдена');
    }
});

// Убедимся, что папка data существует
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
