const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const logPath = path.join(__dirname, 'log.txt');
const postsPath = path.join(__dirname, 'post.txt');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile(logPath, log, () => {});
  next();
});

// Рендер шаблона
function renderTemplate(templateName, replacements, res) {
  const filePath = path.join(__dirname, 'views', templateName);
  fs.readFile(filePath, 'utf-8', (err, html) => {
    if (err) return res.status(500).send('Ошибка шаблона');
   
    for (const key in replacements) {
     html = html.replace(key, replacements[key])
    }
    res.send(html);
  });
}

// Главная
app.get('/', (req, res) => {
  fs.readFile(postsPath, 'utf-8', (err, data) => {
    const posts = data
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [id, title] = line.split('::');
        return `<li><a href="/post/${id}">${title}</a>
        - <a href="/edit/${id}">✏️</a>
        - <a href="/delete/${id}" onclick="return confirm('Удалить?')">🗑️</a>
        </li>`;
      })
      .join('\n');
    renderTemplate('index.html', { '{{posts}}': posts }, res);
  });
});

// Пост по ID
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  fs.readFile(postsPath, 'utf-8', (err, data) => {
    const line = data
      .split('\n')
      .filter(Boolean)
      .find(line => line.startsWith(postId + '::'));

    if (!line) return res.status(404).send('Пост не найден');

    const [, title, content] = line.split('::');
    renderTemplate('post.html', {
      '{{title}}': title,
      '{{content}}': content,
    }, res);
  });
});

// Добавление
app.get('/new', (req, res) => {
  renderTemplate('form.html', {}, res);
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  const line = `${id}::${title}::${content}\n`;
  fs.appendFile(postsPath, line, () => {
    res.redirect('/');
  });
});

// Редактирование
app.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  fs.readFile(postsPath, 'utf-8', (err, data) => {
    const lines = data.split('\n').filter(Boolean);
    const line = lines.find(l => l.startsWith(postId + '::'));
    if (!line) return res.status(404).send('Пост не найден');

    const [, title, content] = line.split('::');
    const formHtml = `
      <h1>Редактировать пост</h1>
      <form method="POST" action="/edit/${postId}">
        <input name="title" value="${title}" required><br><br>
        <textarea name="content" required>${content}</textarea><br><br>
        <button>Сохранить</button>
      </form>
      <a href="/">На главную</a>
    `;
    res.send(formHtml);
  });
});

app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  fs.readFile(postsPath, 'utf-8', (err, data) => {
    let lines = data.split('\n').filter(Boolean);
    lines = lines.map(line => {
      return line.startsWith(postId + '::') ? `${postId}::${title}::${content}` : line;
    });
    fs.writeFile(postsPath, lines.join('\n') + '\n', () => {
      res.redirect('/');
    });
  });
});

// Удаление
app.get('/delete/:id', (req, res) => {
  const postId = req.params.id;

  fs.readFile(postsPath, 'utf-8', (err, data) => {
    let lines = data.split('\n').filter(Boolean);
    lines = lines.filter(line => !line.startsWith(postId + '::'));

    fs.writeFile(postsPath, lines.join('\n') + '\n', () => {
      res.redirect('/');
    });
  });
});

// Остановка сервера
app.get('/shutdown', (req, res) => {
  fs.appendFile(logPath, `[${new Date().toISOString()}] Сервер остановлен\n`, () => {
    res.send('Сервер остановлен');
    server.close(() => process.exit(0));
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

// Запуск
const server = app.listen(PORT, () => {
  console.log(`Сервер работает: http://localhost:${PORT}`);
});
