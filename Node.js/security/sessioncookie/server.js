const express = require('express');
const session = require('express-session');
const helmet = require('helmet');

const app = express();

// Настройка сессий
app.use(session({
  secret: 'super-secret-key', // ключ шифрования
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,        // запретить JavaScript-доступ
    secure: true,          // только через HTTPS
    sameSite: 'strict',    // предотвратить CSRF
    maxAge: 1000 * 60 * 15 // 15 минут
  }
}));

//secure: false,         // ПОКА СТАВИМ FALSE ДЛЯ ТЕСТИРОВАНИЯ ЛОКАЛЬНО
//sameSite: 'lax',       // Можно использовать 'lax' вместо 'strict'

// Добавляем защиту через Helmet
app.use(helmet());

// Пример маршрута: логин
app.get('/login', (req, res) => {
  req.session.user = { id: 1, username: 'demo' };
  res.send('Вы вошли в систему');
});

// Пример маршрута: проверка сессии
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).send('Не авторизован');
  }
});

// Выход из системы
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Ошибка выхода');
    res.send('Вы вышли');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔐 Сервер запущен с защитой сессий на http://localhost:${PORT}`);
});


//document.cookie