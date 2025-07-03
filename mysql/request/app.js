/*const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Подключено к базе данных');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    category VARCHAR(50),
    stock INT,
    description TEXT,
    supplier_id INT
  )
`;

connection.query('DROP TABLE IF EXISTS products', (err) => {
  if (err) throw err;
  console.log('🗑️ Таблица `products` удалена');
});

connection.query(createTableQuery, (error) => {
  if (error) throw error;
  console.log('📦 Таблица `products` создана или уже существует');
});

const sampleProducts = [
  { name: 'iPhone 13', price: 79999.99, category: 'Электроника', stock: 10, description: 'Флагманский смартфон', supplier_id: 1 },
  { name: 'Samsung Galaxy S22', price: 69999.99, category: 'Электроника', stock: 15, description: 'Андроид флагман', supplier_id: 2 },
  { name: 'MacBook Pro', price: 149999.99, category: 'Электроника', stock: 5, description: 'Ноутбук Apple', supplier_id: 1 },
  { name: 'Книга "JS для новичков"', price: 899.99, category: 'Книги', stock: 20, description: 'Обучение JavaScript', supplier_id: 3 },
  { name: 'Блокнот', price: 199.99, category: 'Канцелярия', stock: 100, description: 'Для заметок', supplier_id: null },
  { name: 'Мышь беспроводная', price: 1499.99, category: 'Электроника', stock: 0, description: 'USB мышь', supplier_id: 2 },
  { name: 'Чехол для iPhone', price: 599.99, category: 'Аксессуары', stock: 50, description: 'Силиконовый', supplier_id: 3 }
];

sampleProducts.forEach(product => {
  connection.query('INSERT INTO products SET ?', product, (err) => {
    if (err) console.log(err);
  });
});

connection.query(
  'SELECT DISTINCT category FROM products',
  (err, results) => {
    if (err) throw err;
    console.log('🎯 Уникальные категории:', results);
  }
);

connection.query(
  "SELECT * FROM products WHERE category IN ('Электроника', 'Книги')",
  (err, results) => {
    if (err) throw err;
    console.log('📱📚 Электроника и книги:', results);
  }
);
connection.query(
  "SELECT * FROM products WHERE category NOT IN ('Электроника', 'Книги')",
  (err, results) => {
    if (err) throw err;
    console.log('🚫 Не электроника и не книги:', results);
  }
);
connection.query(
  'SELECT * FROM products WHERE price BETWEEN 500 AND 2000',
  (err, results) => {
    if (err) throw err;
    console.log('💰 Цена от 500 до 2000:', results);
  }
);
connection.query(
  "SELECT * FROM products WHERE name LIKE '%iPhone%'",
  (err, results) => {
    if (err) console.log(err);
    console.log('📱 iPhone:', results);
  }
);
connection.query(
  "SELECT * FROM products WHERE description REGEXP 'ноутбук|смартфон'",
  (err, results) => {
    if (err) console.log(err);
    console.log('🔍 Ноутбук или смартфон:', results);
  }
);
connection.query(
  'SELECT * FROM products WHERE supplier_id IS NULL',
  (err, results) => {
    if (err) console.log(err);
    console.log('⚠️ Нет поставщика:', results);
  }
);
connection.query(
  'SELECT * FROM products ORDER BY price DESC LIMIT 3',
  (err, results) => {
    if (err) console.log(err);
    console.log('🔥 Топ 3 самых дорогих товаров:', results);
  }
);
connection.query(
  'SELECT * FROM products WHERE category = "Электроника" AND price > 1000 ORDER BY price ASC LIMIT 2',
  (err, results) => {
    if (err) console.log(err);
    console.log('🛒 Результат комбинированного запроса:', results);
  }
);
connection.end((err) => {
  if (err) {
    console.error('❌ Ошибка при закрытии соединения:', err.message);
  } else {
    console.log('🔌 Соединение с базой данных успешно закрыто');
  }
});*/

const mysql = require('mysql2');

// Создание подключения к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'test'
});

// Подключение к базе данных
connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Успешно подключено к MySQL');
});

// Удаление таблицы, если она существует (для чистого старта)
connection.query('DROP TABLE IF EXISTS products', (err) => {
  if (err) throw err;
  console.log('🗑️ Таблица `products` удалена (если существовала)');
});

// Создание таблицы products
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category VARCHAR(50),
    description TEXT,
    supplier_id INT
  )
`;

connection.query(createTableQuery, (error, results) => {
  if (error) throw error;
  console.log('📦 Таблица `products` успешно создана');
});

// Массив товаров для добавления
const products = [
  { name: 'Наушники Bluetooth', price: 1999.99, stock: 50, category: 'Электроника', description: 'Беспроводные наушники с шумоподавлением', supplier_id: 1 },
  { name: 'Книга "JS для начинающих"', price: 799.00, stock: 20, category: 'Книги', description: 'Обучение JavaScript с нуля', supplier_id: 2 },
  { name: 'Смартфон X1', price: 14999.99, stock: 10, category: 'Электроника', description: 'Флагманский смартфон', supplier_id: 1 },
  { name: 'Чехол для телефона', price: 299.00, stock: 100, category: 'Аксессуары', description: 'Силиконовый чехол', supplier_id: 3 },
  { name: 'Блокнот', price: 199.50, stock: 15, category: 'Канцелярия', description: 'Для заметок', supplier_id: null },
  { name: 'Планшет Pro', price: 9999.99, stock: 5, category: 'Электроника', description: 'Профессиональный планшет', supplier_id: 1 },
  { name: 'iPhone 13', price: 79999.99, category: 'Электроника', stock: 10, description: 'Флагманский смартфон', supplier_id: 1 },
  { name: 'Samsung Galaxy S22', price: 69999.99, category: 'Электроника', stock: 15, description: 'Андроид флагман', supplier_id: 2 },
  { name: 'MacBook Pro', price: 149999.99, category: 'Электроника', stock: 5, description: 'Ноутбук Apple', supplier_id: 1 },
  { name: 'Мышь беспроводная', price: 1499.99, category: 'Электроника', stock: 0, description: 'USB мышь', supplier_id: 2 }
];

// Добавление товаров в таблицу
products.forEach(product => {
  connection.query(
    'INSERT INTO products SET ?',
    product,
    (error, results) => {
      if (error) throw error;
      console.log(`🆕 Товар "${product.name}" добавлен с ID: ${results.insertId}`);
    }
  );
});

// Примеры запросов к базе данных

// 1. Получить все товары
connection.query('SELECT * FROM products', (error, results) => {
  if (error) throw error;
  console.log('🛒 Все товары:', results);
});

// 2. Получить электронику дешевле 15000
connection.query(
  'SELECT * FROM products WHERE category = "Электроника" AND price < 15000',
  (error, results) => {
    if (error) throw error;
    console.log('📱 Электроника дешевле 15000:', results);
  }
);

// 3. Получить товары с малым запасом
connection.query(
  'SELECT * FROM products WHERE stock < 20',
  (error, results) => {
    if (error) throw error;
    console.log('⚠️ Мало на складе:', results);
  }
);

// 4. Обновить количество товара
const productId = 1;
const newStock = 25;

connection.query(
  'UPDATE products SET stock = ? WHERE id = ?',
  [newStock, productId],
  (error, results) => {
    if (error) throw error;
    console.log(`🔄 Остаток товара ID ${productId} обновлён на ${newStock}`);
  }
);

// 5. Удалить товары без остатка
connection.query(
  'DELETE FROM products WHERE stock = 0',
  (error, results) => {
    if (error) throw error;
    console.log(`🗑️ Удалено товаров без остатка: ${results.affectedRows}`);
  }
);

// 6. Получить уникальные категории
connection.query(
  'SELECT DISTINCT category FROM products',
  (err, results) => {
    if (err) throw err;
    console.log('🎯 Уникальные категории:', results);
  }
);

// 7. Получить электронику и книги
connection.query(
  "SELECT * FROM products WHERE category IN ('Электроника', 'Книги')",
  (err, results) => {
    if (err) throw err;
    console.log('📱📚 Электроника и книги:', results);
  }
);

// 8. Получить товары, которые не электроника и не книги
connection.query(
  "SELECT * FROM products WHERE category NOT IN ('Электроника', 'Книги')",
  (err, results) => {
    if (err) throw err;
    console.log('🚫 Не электроника и не книги:', results);
  }
);

// 9. Получить товары в ценовом диапазоне
connection.query(
  'SELECT * FROM products WHERE price BETWEEN 500 AND 2000',
  (err, results) => {
    if (err) throw err;
    console.log('💰 Цена от 500 до 2000:', results);
  }
);

// 10. Поиск по названию
connection.query(
  "SELECT * FROM products WHERE name LIKE '%iPhone%'",
  (err, results) => {
    if (err) throw err;
    console.log('📱 iPhone:', results);
  }
);

// 11. Поиск по описанию с регулярным выражением
connection.query(
  "SELECT * FROM products WHERE description REGEXP 'ноутбук|смартфон'",
  (err, results) => {
    if (err) throw err;
    console.log('🔍 Ноутбук или смартфон:', results);
  }
);

// 12. Товары без поставщика
connection.query(
  'SELECT * FROM products WHERE supplier_id IS NULL',
  (err, results) => {
    if (err) throw err;
    console.log('⚠️ Нет поставщика:', results);
  }
);

// 13. Топ 3 самых дорогих товаров
connection.query(
  'SELECT * FROM products ORDER BY price DESC LIMIT 3',
  (err, results) => {
    if (err) throw err;
    console.log('🔥 Топ 3 самых дорогих товаров:', results);
  }
);

// 14. Комбинированный запрос
connection.query(
  'SELECT * FROM products WHERE category = "Электроника" AND price > 1000 ORDER BY price ASC LIMIT 2',
  (err, results) => {
    if (err) throw err;
    console.log('🛒 Результат комбинированного запроса:', results);
  }
);

// Закрытие соединения с базой данных
connection.end((err) => {
  if (err) {
    console.error('❌ Ошибка при закрытии соединения:', err.message);
  } else {
    console.log('🔌 Соединение с базой данных успешно закрыто');
  }
});5