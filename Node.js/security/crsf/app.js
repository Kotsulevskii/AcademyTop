const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Включаем защиту CSRF
const csrfProtection = csrf({ cookie: true });
// Главная страница — показываем форму с CSRF-токеном
app.get('/profile', csrfProtection, (req, res) => {
  res.send(`
    <h2>Профиль пользователя</h2>
    <form action="/update-email" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <label>Новый email:
        <input type="email" name="email">
      </label>
      <button type="submit">Сохранить</button>
    </form>
  `);
});

// Обновление email с проверкой CSRF
app.post('/update-email', csrfProtection, (req, res) => {
  const { email } = req.body;
  // Здесь логика сохранения email
  res.send(`<p>Email успешно изменён на: ${email}</p>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔒 Сервер запущен с CSRF-защитой на http://localhost:${PORT}`);
});