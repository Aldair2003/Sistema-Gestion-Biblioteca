const db = require('../config/db');

const User = {
  create: async (username, email, password) => {
    const query = `INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`;
    const values = [username, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};

module.exports = User;
