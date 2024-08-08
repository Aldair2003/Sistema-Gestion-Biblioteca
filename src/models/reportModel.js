const pool = require('../config/db');

class Report {
  static async generateUsageReport() {
    const query = `
      SELECT
        b.title,
        COUNT(l.id) AS loan_count
      FROM books b
      LEFT JOIN loans l ON b.id = l.book_id
      GROUP BY b.title
      ORDER BY loan_count DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = Report;
