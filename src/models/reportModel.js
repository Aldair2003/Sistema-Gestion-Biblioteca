const pool = require('../config/db');

class Report {
  static async getAllReports() {
    const query = 'SELECT id, name, period FROM reports';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getReportById(id) {
    const query = 'SELECT * FROM reports WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = Report;