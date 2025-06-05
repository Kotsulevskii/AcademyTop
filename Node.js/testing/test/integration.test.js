const request = require('supertest');
const app = require('../src/app');
const { expect } = require('chai'); // добавляем подключение Chai

describe('Products API Integration Tests', () => {
  it('GET /products should return all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(Array.isArray(response.body.data)).to.be.true;
  });

  it('POST /products should add a new product', async () => {
    const newProduct = { id: 3, name: 'Banana', price: 50 };
    const response = await request(app)
      .post('/products')
      .send(newProduct);
    
    expect(response.statusCode).to.equal(201);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Product added successfully.');
    expect(response.body.data).to.deep.equal(newProduct);
  });

  it('DELETE /products/:id should delete an existing product', async () => {
    const response = await request(app).delete('/products/1');
    expect(response.statusCode).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('Product deleted successfully.');
  });

  it('DELETE /products/:id for non-existing product returns 404', async () => {
    const response = await request(app).delete('/products/999');
    expect(response.statusCode).to.equal(404);
    expect(response.body.error).to.equal('Product not found.');
  });
});