const mysql = require('mysql2/promise');

async function main() {
  let connection;
  try {
    // 1. Подключение к MySQL серверу (без указания базы данных)
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '0000'
    });

    console.log('✅ Успешно подключено к MySQL серверу');

    // 2. Создание базы данных (если не существует)
    await connection.query('CREATE DATABASE IF NOT EXISTS company_db');
    console.log('🛢️ База данных company_db создана или уже существует');

    // 3. Переключение на созданную базу данных
    await connection.changeUser({ database: 'company_db' });
    console.log('🔌 Переключено на базу данных company_db');

    // 4. Создание таблицы employees
    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        department VARCHAR(50) NOT NULL,
        position VARCHAR(50) NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        bonus DECIMAL(10,2) DEFAULT 0
      )
    `);
    console.log('📊 Таблица employees создана или уже существует');

    // 5. Заполнение таблицы тестовыми данными (если пустая)
    await seedDatabase(connection);

    // 6. Выполнение агрегатных запросов
    await executeAggregateQueries(connection);

  } catch (err) {
    console.error('❌ Ошибка:', err.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Соединение с MySQL закрыто');
    }
  }
}

// Функция для заполнения тестовыми данными
async function seedDatabase(connection) {
  const [rows] = await connection.query('SELECT COUNT(*) as count FROM employees');
  if (rows[0].count > 0) {
    console.log('📌 Таблица уже содержит данные, пропускаем заполнение');
    return;
  }

  const employees = [
    { first_name: 'Иван', last_name: 'Иванов', department: 'IT', position: 'Разработчик', salary: 120000, hire_date: '2020-05-15', bonus: 12000 },
    { first_name: 'Петр', last_name: 'Петров', department: 'IT', position: 'Тестировщик', salary: 90000, hire_date: '2019-11-20', bonus: 9000 },
    { first_name: 'Сергей', last_name: 'Сергеев', department: 'IT', position: 'DevOps', salary: 150000, hire_date: '2021-03-10', bonus: 15000 },
    { first_name: 'Анна', last_name: 'Смирнова', department: 'Marketing', position: 'Маркетолог', salary: 85000, hire_date: '2019-08-14', bonus: 4250 },
    { first_name: 'Мария', last_name: 'Кузнецова', department: 'Sales', position: 'Менеджер', salary: 95000, hire_date: '2020-01-10', bonus: 4750 }
  ];

  for (const emp of employees) {
    await connection.query('INSERT INTO employees SET ?', emp);
  }
  console.log(`🌱 Добавлено ${employees.length} тестовых сотрудников`);
}

// Функция с агрегатными запросами
async function executeAggregateQueries(connection) {
  console.log('\n=== РЕЗУЛЬТАТЫ АГРЕГАТНЫХ ФУНКЦИЙ ===');

  // 1. Количество сотрудников
  const [count] = await connection.query('SELECT COUNT(*) AS total FROM employees');
  console.log(`1. Общее количество сотрудников: ${count[0].total}`);

  // 2. Общая сумма зарплат
  const [sum] = await connection.query('SELECT SUM(salary) AS total FROM employees');
  console.log(`2. Общий фонд зарплат: ${parseFloat(sum[0].total).toLocaleString('ru-RU')} руб.`);

  // 3. Средняя зарплата
  const [avg] = await connection.query('SELECT AVG(salary) AS average FROM employees');
  console.log(`3. Средняя зарплата: ${parseFloat(avg[0].average).toFixed(2)} руб.`);

  // 4. Максимальная зарплата
  const [max] = await connection.query('SELECT MAX(salary) AS maximum FROM employees');
  console.log(`4. Максимальная зарплата: ${parseFloat(max[0].maximum).toLocaleString('ru-RU')} руб.`);

  // 5. Минимальная зарплата
  const [min] = await connection.query('SELECT MIN(salary) AS minimum FROM employees');
  console.log(`5. Минимальная зарплата: ${parseFloat(min[0].minimum).toLocaleString('ru-RU')} руб.`);

  // 6. Общая сумма бонусов
  const [bonus] = await connection.query('SELECT SUM(bonus) AS total FROM employees');
  console.log(`6. Общая сумма бонусов: ${parseFloat(bonus[0].total).toLocaleString('ru-RU')} руб.`);

  // 7. Средний стаж в днях
  const [exp] = await connection.query('SELECT AVG(DATEDIFF(CURDATE(), hire_date)) AS days FROM employees');
  const avgExpDays = parseFloat(exp[0].days);
  const avgExpYears = (avgExpDays / 365).toFixed(1);
  console.log(`7. Средний стаж работы: ${avgExpYears} лет (${Math.round(avgExpDays)} дней)`);
}

// Запуск главной функции
main();