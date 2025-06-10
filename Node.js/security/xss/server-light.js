const express = require('express');
const { body, matchedData } = require('express-validator');

const app = express();

app.get('/search', [
  // Экранируем HTML-символы
  body('q').escape()
], (req, res) => {
  const query = matchedData(req).q;

  // Теперь вредоносный скрипт будет безопасно отображён
  res.send(`<h2>Вы искали: ${query}</h2>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔒 Сервер запущен с защитой от XSS на http://localhost:${PORT}`);
});

//npm install express-validator