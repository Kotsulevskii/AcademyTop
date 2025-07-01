const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Успешно подключено к MySQL');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category VARCHAR(50)
  )
`;

connection.query(createTableQuery, (error, results) => {
  if (error) throw error;
  console.log('📦 Таблица `products` успешно создана или уже существует');
});

const products = [
  { name: 'Наушники Bluetooth', price: 1999.99, stock: 50, category: 'Электроника' },
  { name: 'Книга "JS для начинающих"', price: 799.00, stock: 20, category: 'Книги' },
  { name: 'Смартфон X1', price: 14999.99, stock: 10, category: 'Электроника' },
  { name: 'Чехол для телефона', price: 299.00, stock: 100, category: 'Аксессуары' },
  { name: 'Блокнот', price: 199.50, stock: 15, category: 'Канцелярия' },
  { name: 'Планшет Pro', price: 9999.99, stock: 5, category: 'Электроника' }
];

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

connection.query('SELECT * FROM products', (error, results) => {
  if (error) throw error;
  console.log('🛒 Все товары:', results);
});

connection.query(
  'SELECT * FROM products WHERE category = "Электроника" AND price < 15000',
  (error, results) => {
    if (error) throw error;
    console.log('📱 Электроника дешевле 15000:', results);
  }
);

connection.query(
  'SELECT * FROM products WHERE stock < 20',
  (error, results) => {
    if (error) throw error;
    console.log('⚠️ Мало на складе:', results);
  }
);

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

connection.query(
  'DELETE FROM products WHERE stock = 0',
  (error, results) => {
    if (error) throw error;
    console.log(`🗑️ Удалено товаров без остатка: ${results.affectedRows}`);
  }
);

connection.end((err) => {
  if (err) throw err;
  console.log('🔌 Соединение с MySQL закрыто');
});