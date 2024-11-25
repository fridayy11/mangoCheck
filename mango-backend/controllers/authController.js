const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

// Register
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(name, email, hashedPassword);

        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        res.status(500).json({ message: 'Error saat registrasi', error: error.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email tidak ditemukan' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password salah' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login berhasil', token });
    } catch (error) {
        res.status(500).json({ message: 'Error saat login', error: error.message });
    }
};

module.exports = { register, login };
