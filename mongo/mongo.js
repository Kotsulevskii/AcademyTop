const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'bookstore'; // Название базы данных

async function main() {
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db(dbName);
/*
  // 1.
  async function listDatabases() {
  const adminDb = client.db().admin();
  const databases = await adminDb.listDatabases();
  console.log("Databases:", databases.databases.map(db => db.name));
}
  // Вызов внутри main()
  await listDatabases();

// 2.
async function addBooks() {
  const books = db.collection('books');
  
  const book1 = {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    isPublished: true
  };
  const book2 = {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    isPublished: true
  };
  const book3 = {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    isPublished: true
  };
  // Вставка одной книги
  await books.insertOne(book1);

  // Вставка нескольких книг
  await books.insertMany([book2, book3]);
  console.log("Books added!");
}
// Вызов
await addBooks();

// 3.
  async function findBooks() {
  const books = db.collection('books');

  // 1. Все книги после 2000 года (пустой массив, так как таких нет)
  const modernBooks = await books.find({ year: { $gt: 2000 } }).toArray();
  console.log("Books after 2000:", modernBooks);

  // 2. Первая книга George Orwell
  const orwellBook = await books.findOne({ author: "George Orwell" });
  console.log("George Orwell's book:", orwellBook);

  // 3. Только названия и авторы (без _id)
  const titlesAndAuthors = await books.find(
    {},
    { projection: { title: 1, author: 1, _id: 0 } }
  ).toArray();
  console.log("Titles and authors:", titlesAndAuthors);
}
// Вызов
await findBooks();

// 4.
async function updateBooks() {
  const books = db.collection('books');

  // 1. Обновить год "1984" на 1949 (уже стоит, но для примера)
  await books.updateOne(
    { title: "1984" },
    { $set: { year: 1949 } }
  );

  // 2. Для книг до 1990 → isPublished: false
  await books.updateMany(
    { year: { $lt: 1990 } },
    { $set: { isPublished: false } }
  );

  // 3. Добавить жанр для "Brave New World"
  await books.updateOne(
    { title: "Brave New World" },
    { $push: { genres: "dystopia" } }
  );
  console.log("Books updated!");
}
// Вызов
await updateBooks();

// 5.
async function deleteBooks() {
  const books = db.collection('books');

  // 1. Удалить "The Great Gatsby" (если он есть)
  await books.deleteOne({ title: "The Great Gatsby" });

  // 2. Удалить все неопубликованные книги
  await books.deleteMany({ isPublished: false });

  console.log("Books deleted!");
}
// Вызов
await deleteBooks();
*/
  await client.close();
}

main().catch(console.error);