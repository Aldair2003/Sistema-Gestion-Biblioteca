const pool = require('../config/db');

class Loan {
  static async getAllLoans() {
    const query = 'SELECT * FROM loans';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getLoanById(id) {
    const query = 'SELECT * FROM loans WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async createLoan(bookId, userId, dueDate) {
    const query = 'INSERT INTO loans (book_id, user_id, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [bookId, userId, dueDate, 'pending'];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async updateLoan(id, status) {
    const query = 'UPDATE loans SET status = $2 WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id, status]);
    return rows[0];
  }

  static async returnBook(id) {
    const query = 'UPDATE loans SET status = $2 WHERE id = $1';
    await pool.query(query, [id, 'returned']);
  }

  static async getOverdueLoanNotifications() {
    const query = `
      SELECT
        loans.id,
        books.title AS bookTitle,
        loans.due_date
      FROM loans
      JOIN books ON loans.book_id = books.id
      WHERE loans.status = 'pending' AND loans.due_date < NOW()
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = Loan;
