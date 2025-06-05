const request = require('supertest');
const app = require('../src/app');
const { expect } = require('chai');

// Хук beforeEach для сброса состояния перед каждым тестом
beforeEach(() => {
  app.products = [
    { id: 1, name: 'Apple', price: 100 },
    { id: 2, name: 'Orange', price: 80 },
  ];
});

describe('Unit tests', function() {
  describe('#POST /products', function() {
    it('should reject invalid product format', function(done) {
      const invalidProduct = { id: '', name: 'invalid' }; // отсутствует цена

      request(app)
        .post('/products')
        .send(invalidProduct)
        .expect(400)
        .then(res => {
          expect(res.body.error).to.equal('Invalid product format.');
          done();
        })
        .catch(err => done(err));
    });

    it('should allow adding duplicate IDs (non-standard behavior)', function(done) {
      const duplicateProduct = { id: 1, name: 'Duplicate Apple', price: 100 };

      request(app)
        .post('/products')
        .send(duplicateProduct)
        .expect(201) // ожидание успешного создания, несмотря на дублирование
        .then(res => {
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.equal('Product added successfully.');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('#DELETE /products/:id', function() {
    it('should respond with 404 when deleting nonexistent product', function(done) {
      request(app)
        .delete('/products/999')
        .expect(404)
        .then(res => {
          expect(res.body.error).to.equal('Product not found.');
          done();
        })
        .catch(err => done(err));
    });
  });
});