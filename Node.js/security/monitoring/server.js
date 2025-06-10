const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Логгер: записывает все запросы в консоль
app.use(morgan('combined'));

// Файл для хранения подозрительных запросов
const LOG_FILE = path.join(__dirname, 'suspicious_requests.log');

// Простой детектор уязвимостей
function isSuspicious(req) {
  const suspiciousPatterns = [
    /DROP\s+TABLE/i,
    /<script.*?>.*?<\/script>/i,
    /alert\(/i,
    /\.\.\//i,
    /etc\/passwd/i
  ];

  const valueToCheck = req.url + JSON.stringify(req.query) + JSON.stringify(req.body);
  return suspiciousPatterns.some(pattern => pattern.test(valueToCheck));
}

// Middleware для проверки подозрительных запросов
app.use((req, res, next) => {
  if (isSuspicious(req)) {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}\nHeaders: ${JSON.stringify(req.headers)}\nBody: ${JSON.stringify(req.body)}\n\n`;
    
    // Записываем в файл
    fs.appendFile(LOG_FILE, logEntry, err => {
      if (err) console.error('Ошибка записи лога:', err);
    });

    console.warn('⚠️ Подозрительный запрос заблокирован:\n', logEntry);
    return res.status(403).send('Запрещённый запрос.');
  }

  next();
});

// Пример маршрута
app.get('/search', (req, res) => {
  res.json({ query: req.query.q });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔍 Сервер запущен с мониторингом на http://localhost:${PORT}`);
});


//curl "http://localhost:3000/search?q=<script>alert(1)</script>"

//curl "http://localhost:3000/search?q=admin' OR '1'='1"