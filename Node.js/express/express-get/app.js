const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const logFile = path.join(__dirname, 'log.txt');
const tasksFile = path.join(__dirname, 'tasks.txt');

// Middleware: логгер в файл
app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile(logFile, log, err => {
    if (err) console.error('Ошибка записи лога:', err);
  });
  next();
});

// Middleware: защита приватной страницы
app.use((req, res, next) => {
  if (req.path === '/private') {
    return res.redirect('/login');
  }
  next();
});

// Раздача статики
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API задач (из текстового файла)
app.get('/api/tasks', (req, res) => {
  fs.readFile(tasksFile, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Ошибка чтения задач');
    } else {
      const lines = data
        .split('\n')
        .filter(Boolean)
        .map(line => line.trim());
      res.json(lines);
    }
  });
});

// Переадресация
app.get('/old', (req, res) => {
  res.redirect('/');
});

// Страница логина
app.get('/login', (req, res) => {
  res.send('<h2>Пожалуйста, войдите в систему</h2>');
});

// Остановка сервера
app.get('/shutdown', (req, res) => {
  const msg = `[${new Date().toISOString()}] Сервер остановлен по запросу\n`;
  fs.appendFile(logFile, msg, () => {
    res.send('Сервер будет остановлен...');
    server.close(() => {
      console.log('Сервер остановлен.');
      process.exit(0); // завершение процесса
    });
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

// Старт сервера
const server = app.listen(3000, () => {
  console.log('Сервер работает на http://localhost:3000');
});
