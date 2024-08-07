const pool = require('../config/db');

class Book {
  static async create(title, author, description) {
    const query = 'INSERT INTO books (title, author, description) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, author, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM books';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, title, author, description, available) {
    const query = 'UPDATE books SET title = $1, author = $2, description = $3, available = $4 WHERE id = $5 RETURNING *';
    const values = [title, author, description, available, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM books WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Book;