const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// 1. Настройка Handlebars
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: [
    path.join(__dirname, 'views/handlebars/partials')
  ]
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/handlebars'));

// Роут для Handlebars
app.get('/handlebars', (req, res) => {
  res.render('home', {
    posts: [
      { title: 'Post 1', content: 'Content 1' },
      { title: 'Post 2', content: 'Content 2' }
    ]
  });
});

// 2. Настройка EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));

// Роут для EJS
app.get('/ejs', (req, res) => {
  res.render('profile', {
    user: { name: 'Alice', isAdmin: true }
  });
});

// 3. Настройка Pug
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pug'));

// Роут для Pug
app.get('/pug', (req, res) => {
  res.render('shop', {
    products: [
      { name: 'Laptop', price: 1000 },
      { name: 'Phone', price: 500 }
    ]
  });
});

// Старт сервера
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Handlebars: http://localhost:3000/handlebars');
  console.log('EJS: http://localhost:3000/ejs');
  console.log('Pug: http://localhost:3000/pug');
});