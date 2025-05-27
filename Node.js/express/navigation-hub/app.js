const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const logFile = path.join(__dirname, 'log.txt');
const tasksFile = path.join(__dirname, 'tasks.txt');

// Логгер в файл
app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile(logFile, log, err => {
    if (err) console.error('Ошибка логгирования:', err);
  });
  next();
});

// Статика
app.use(express.static(path.join(__dirname, 'public')));

// Переадресация: /start → /home
app.get('/start', (req, res) => {
  res.redirect('/home');
});

// Главная страница
app.get('/home', (req, res) => {
  res.send(`
    <html>
      <head><meta charset="UTF-8"><link rel="stylesheet" href="/style.css"></head>
      <body>
        <h1>Навигационный Хаб</h1>
        <a href="/about">О нас</a>
        <a href="/contact">Контакты</a>
        <a href="/help">Помощь / задачи</a>
      </body>
    </html>
  `);
});

// О нас
app.get('/about', (req, res) => {
  res.send('<h2>Мы команда, которая изучает Express.js!</h2><a href="/home">Назад</a>');
});

// Контакты
app.get('/contact', (req, res) => {
  res.send('<h2>Свяжитесь с нами по email: dev@example.com</h2><a href="/home">Назад</a>');
});

// Help/задачи — читаем из файла
app.get('/help', (req, res) => {
  fs.readFile(tasksFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Ошибка чтения задач');
    const list = data
      .split('\n')
      .filter(Boolean)
      .map(task => `<li>${task}</li>`)
      .join('');
    res.send(`
      <h2>Список задач:</h2>
      <ul>${list}</ul>
      <a href="/home">Назад</a>
    `);
  });
});

// Остановка сервера
app.get('/shutdown', (req, res) => {
  const msg = `[${new Date().toISOString()}] Сервер остановлен\n`;
  fs.appendFile(logFile, msg, () => {
    res.send('Сервер будет остановлен...');
    server.close(() => {
      console.log('Сервер остановлен');
      process.exit(0);
    });
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

// Старт
const server = app.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000/start');
});
