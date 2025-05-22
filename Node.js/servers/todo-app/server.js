const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { log } = require('./logger');

const PORT = 3000;

const tasksFile = path.join(__dirname, './data', 'tasks.json');

function readTasks() {
    if (!fs.existsSync(tasksFile)) return [];
    try {
        const data = fs.readFileSync(tasksFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2), 'utf-8');
}

function loadTemplate(fileName, callback) {
    const filePath = path.join(__dirname, 'views', fileName);
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => callback(data));
    stream.on('error', () => callback('Ошибка загрузки шаблона'));
}

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (method === 'GET' && url.pathname === '/') {
        const keyword = url.searchParams.get('search') || '';
        const allTasks = readTasks();
        const filtered = keyword
            ? allTasks.filter(t => t.text.toLowerCase().includes(keyword.toLowerCase()))
            : allTasks;

        loadTemplate('layout.html', layout => {
            loadTemplate('index.html', index => {
                const listHtml = filtered.map(t =>
                    `<li>${t.text} 
                        <a href="/edit?id=${t.id}">✏️</a> 
                        <a href="/delete?id=${t.id}">❌</a>
                    </li>`).join('\n');

                const searchForm = `
                    <form method="GET" action="/">
                        <input type="text" name="search" value="${keyword}" placeholder="Поиск..." />
                        <button>🔍</button>
                    </form>
                `;

                const content = searchForm + index.replace('{{tasks}}', listHtml);
                const finalHtml = layout.replace('{{content}}', content);

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(finalHtml);
            });
        });
    }

    else if (method === 'POST' && url.pathname === '/add') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const parsed = querystring.parse(body);
            const tasks = readTasks();
            const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
            tasks.push({ id, text: parsed.task });
            writeTasks(tasks);
            log('Добавлена задача:', parsed.task);
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    }

    else if (method === 'GET' && url.pathname === '/delete') {
        const id = parseInt(url.searchParams.get('id'));
        const tasks = readTasks();
        const task = tasks.find(t => t.id === id);
        writeTasks(tasks.filter(t => t.id !== id));
        log('Удалена задача:', task ? task.text : `ID ${id}`);
        res.writeHead(302, { Location: '/' });
        res.end();
    }

    else if (method === 'GET' && url.pathname === '/edit') {
        const id = parseInt(url.searchParams.get('id'));
        const tasks = readTasks();
        const task = tasks.find(t => t.id === id);
        if (!task) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Задача не найдена');
        }

        loadTemplate('layout.html', layout => {
            loadTemplate('edit.html', edit => {
                const form = edit.replace('{{id}}', task.id).replace('{{text}}', task.text);
                const finalHtml = layout.replace('{{content}}', form);

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(finalHtml);
            });
        });
    }

    else if (method === 'POST' && url.pathname === '/edit') {
        const id = parseInt(url.searchParams.get('id'));
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const parsed = querystring.parse(body);
            const tasks = readTasks();
            const index = tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                const oldText = tasks[index].text;
                tasks[index].text = parsed.task;
                writeTasks(tasks);
                log('Изменена задача:', `${oldText} → ${parsed.task}`);
            }
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    }

    else if (method === 'GET' && url.pathname === '/stop') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Сервер остановлен');
        log('Сервер остановлен администратором');
        server.close(() => console.log('Сервер выключен.'));
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Страница не найдена');
    }
});

// инициализация
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
if (!fs.existsSync(tasksFile)) writeTasks([]);

server.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});