const mysql = require('mysql2');

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
});