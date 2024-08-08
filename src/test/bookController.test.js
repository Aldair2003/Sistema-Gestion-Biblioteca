const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('Book Controller', () => {
  let token;

  beforeAll(async () => {
    // Regístrate y loguéate para obtener un token válido
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword'
      });

    token = res.body.token;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM books');
    await pool.query('DELETE FROM users');
    await pool.end();
  });

  test('should create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.book).toHaveProperty('id');
  });

  test('should search for a book', async () => {
    await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Searchable Book',
        author: 'Searchable Author',
        description: 'Searchable Description'
      });

    const res = await request(app)
      .get('/api/books/search?q=Searchable')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  test('should reserve a book', async () => {
    const bookRes = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Reservable Book',
        author: 'Reservable Author',
        description: 'Reservable Description'
      });

    const bookId = bookRes.body.book.id;

    const res = await request(app)
      .post('/api/books/reserve')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId });

    expect(res.statusCode).toEqual(201);
    expect(res.body.reservation).toHaveProperty('id');
  });
});
