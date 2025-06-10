const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// === Глобальный рейт-лимит для всех /api/* маршрутов ===
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
  message: {
    status: 'error',
    message: 'Слишком много запросов, попробуйте позже'
  },
  statusCode: 429
});
app.use('/api/', apiLimiter);

// === Отдельный рейт-лимит для /api/login ===
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 5,
  message: {
    status: 'error',
    message: 'Слишком много попыток входа. Попробуйте позже.'
  },
  statusCode: 429
});

// === Маршруты API ===
// POST /api/register
app.get('/api/register', (req, res) => {
  res.status(201).json({ status: 'success', message: 'Пользователь зарегистрирован' });
});

// POST /api/login — с индивидуальным рейт-лимитом
app.get('/api/login', loginLimiter, (req, res) => {
  // Здесь может быть ваша логика аутентификации
  res.json({ status: 'success', message: 'Вход выполнен успешно' });
});

// GET /api/data
app.get('/api/data', (req, res) => {
  res.json({ data: 'Пример данных из API' });
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Маршрут не найден' });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});