const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
// 🔐 CORS: разрешаем только с доверенного домена
const corsOptions = {
  origin: 'https://trusted-frontend.com',  // имитация фронтенда
  credentials: true
};
app.use(cors(corsOptions));
// 🛡️ Helmet: автоматически настраивает безопасные заголовки
app.use(helmet());
// 🌐 Пример маршрута
app.get('/api/data', (req, res) => {
  res.json({ message: 'Данные успешно получены!' });
});

// 🏠 Главная страница для тестирования iframe
app.get('/', (req, res) => {
  res.send(`
    <h1>🛡️ Демонстрация защиты заголовков</h1>
    <p>Эта страница защищена от:</p>
    <ul>
      <li>CORS (только с trusted-frontend.com)</li>
      <li>HSTS (только HTTPS)</li>
      <li>Clickjacking (iframe заблокирован)</li>
    </ul>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔒 Сервер запущен с защитой заголовков на http://localhost:${PORT}`);
});