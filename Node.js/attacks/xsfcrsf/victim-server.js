const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Главная страница
app.get('/', (req, res) => {
  res.send(`
    <h2>Профиль пользователя</h2>
    <form method="POST" action="/change-email">
      <label>Email:
        <input type="email" name="email" />
      </label>
      <button type="submit">Изменить</button>
    </form>
  `);
});

// Изменение email
app.post('/change-email', (req, res) => {
  const { email } = req.body;
  console.log(`Email изменён на: ${email}`);
  res.send(`<p>Email успешно изменён на: ${email}</p>`);
});

app.listen(3000, () => {
  console.log('🛡️ Сервер запущен на http://localhost:3000');
});