const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Массив объектов для хранения списка товаров
let products = [  { id: 1, name: 'Apple', price: 100 },  { id: 2, name: 'Orange', price: 80 },];

// GET /products - получение всех товаров
app.get('/products', (_req, res) => {  res.status(200).send({ success: true, data: products });});

// POST /products - создание нового товара
app.post('/products', (req, res) => {
  const newProduct = req.body;
  if (!newProduct.id || !newProduct.name || typeof newProduct.price !== 'number') {
    return res.status(400).send({ error: 'Invalid product format.' });  }

  // Проверка уникальности ID товара
  const existingProduct = products.find(p => p.id === newProduct.id);
  if (existingProduct) {    
    return res.status(409).send({ error: 'Product with this ID already exists.' }); 
   }

  products.push(newProduct);
  res.status(201).send({ success: true, message: 'Product added successfully.', data: newProduct });
});

// DELETE /products/:id - удаление товара по идентификатору
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === productId);

  if (index === -1) {   
     return res.status(404).send({ error: 'Product not found.' }); 
    }

  products.splice(index, 1); // удаляем товар из массива
  res.status(200).send({ success: true, message: 'Product deleted successfully.' });
});
module.exports = app;