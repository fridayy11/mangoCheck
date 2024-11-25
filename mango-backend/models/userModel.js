const db = require('../config/db');

// Registrasi (add user)
const createUser = async (name, email, hashedPassword) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    return db.execute(sql, [name, email, hashedPassword]);
};

// Login (mencari user berdasarkan email)
const findUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail };
